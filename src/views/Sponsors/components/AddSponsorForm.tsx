import Input from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik, useFormik } from 'formik'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { countryList } from '@/constants/countries.constant'
import { components } from 'react-select'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import type { OptionProps, SingleValueProps } from 'react-select'
import type { FieldInputProps, FieldProps } from 'formik'
// import type { PersonalInformation as PersonalInformationType } from '../store'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'
import { AxiosResponse } from 'axios'
import ApiService from '@/services/ApiService'
import { createSponsor } from '@/services/SponsorService'
import { getCustomers, useAppDispatch } from '../store'
import { toast } from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type PersonalInformationProps = {
    onDialogClose: () => void
}

const NumberInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} />
}

const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const Textarea = () => {
    return (
        <div>
            <Input placeholder="Text area example" textArea />
        </div>
    )
}

const validationSchema = Yup.object().shape({
    id: Yup.string().required('ID is Required'),
    firstName: Yup.string().required('First Name Required'),
    lastName: Yup.string().required('Last Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    place: Yup.string().required('Please enter your Place'),
    phoneNumber: Yup.string().required('Please enter your phone number'),
    whatsappNumber: Yup.string().required(
        'Please enter your whatsappNumber number'
    ),
    dob: Yup.string().required('Please enter your date of birth'),
    address: Yup.string().required('Please enter your address'),
    remarks: Yup.string().optional(),
})

// type MyApiResponse = {
//     someResponseData: string
//     someResponseData2: boolean
// }

const formData = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    place: '',
    address: '',
    remarks: '',
}

const AddSponsorForm = ({ onDialogClose }: PersonalInformationProps) => {
    const dispatch = useAppDispatch()

    const submitForm = async (values: any, setSubmitting: any) => {
        try {
            // Call the createSponsor function
            const response = await createSponsor(values)
            console.log('Sponsor created successfully:', response.data)
            setSubmitting(false)
            dispatch(
                getCustomers({
                    pageIndex: 1,
                    pageSize: 10,
                    sort: { key: '', order: 'asc' },
                    query: '',
                })
            )
            toast.push(
                <Notification closable type="success" duration={2000}>
                    Sponsor Created Successfully
                </Notification>
            )
            onDialogClose()
        } catch (error) {
            console.error('Error creating sponsor:', error)
            toast.push(
                <Notification closable type="danger" duration={2000}>
                    Something went wrong , please try again
                </Notification>
            )
            setSubmitting(false)
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h3 className="mb-2">Add Sponsor</h3>
                <p>Add a new Sponsor</p>
            </div>
            <Formik
                initialValues={formData}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    submitForm(values, setSubmitting)
                }}
            >
                {({
                    isValid,
                    dirty,
                    touched,
                    errors,
                    isSubmitting,
                    handleSubmit,
                }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <FormContainer size="sm">
                                <div className="md:grid grid-cols-3 gap-3">
                                    <FormItem
                                        label="ID"
                                        invalid={errors.id && touched.id}
                                        errorMessage={errors.id}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="id"
                                            placeholder="ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="First Name"
                                        invalid={
                                            errors.firstName &&
                                            touched.firstName
                                        }
                                        errorMessage={errors.firstName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="First Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Last Name"
                                        invalid={
                                            errors.lastName && touched.lastName
                                        }
                                        errorMessage={errors.lastName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-3 gap-4">
                                    <FormItem
                                        label="Email"
                                        invalid={errors.email && touched.email}
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Email"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Place"
                                        invalid={errors.place && touched.place}
                                        errorMessage={errors.place}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="place"
                                            placeholder="Place"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Date of Birth"
                                        invalid={errors.dob && touched.dob}
                                        errorMessage={errors.dob}
                                    >
                                        <Field
                                            name="dob"
                                            placeholder="Date of Birth"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            dayjs(date).format(
                                                                'YYYY-MM-DD'
                                                            )
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Phone Number"
                                        invalid={
                                            errors.phoneNumber &&
                                            touched.phoneNumber
                                        }
                                        errorMessage={errors.phoneNumber}
                                    >
                                        <Field name="phoneNumber">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <NumericFormatInput
                                                        form={form}
                                                        field={field}
                                                        customInput={
                                                            NumberInput as ComponentType
                                                        }
                                                        placeholder="Phone Number"
                                                        onValueChange={(e) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                e.value
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Whatsapp Number"
                                        invalid={
                                            errors.whatsappNumber &&
                                            touched.whatsappNumber
                                        }
                                        errorMessage="Please enter your phone number"
                                    >
                                        <Field name="whatsappNumber">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <NumericFormatInput
                                                        form={form}
                                                        field={field}
                                                        customInput={
                                                            NumberInput as ComponentType
                                                        }
                                                        placeholder="Whatsapp Number"
                                                        onValueChange={(e) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                e.value
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Address"
                                        invalid={
                                            errors.address && touched.address
                                        }
                                        errorMessage={errors.address}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            textArea
                                            name="address"
                                            placeholder="Enter you address here"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Remarks"
                                        invalid={
                                            errors.remarks && touched.remarks
                                        }
                                        errorMessage={errors.remarks}
                                    >
                                        <Field
                                            type="text"
                                            textarea
                                            autoComplete="off"
                                            name="remarks"
                                            placeholder="Enter any specific data to be added"
                                            component={Textarea}
                                        />
                                    </FormItem>
                                </div>
                            </FormContainer>
                            <div className="text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    variant="default"
                                    type="button"
                                    onClick={onDialogClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    type="submit"
                                    disabled={
                                        !isValid || isSubmitting
                                        // || !dirty
                                    }
                                    // onClick={onDialogClose}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddSponsorForm
