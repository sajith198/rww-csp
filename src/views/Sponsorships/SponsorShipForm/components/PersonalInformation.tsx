import Input from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { countryList } from '@/constants/countries.constant'
import { statusOptions } from '../constants'
import { components } from 'react-select'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import type { OptionProps, SingleValueProps } from 'react-select'
import type { FieldInputProps, FieldProps } from 'formik'
import type { PersonalInformation as PersonalInformationType } from '../store'
import { useEffect, type ComponentType, useState } from 'react'
import type { InputProps } from '@/components/ui/Input'

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type Child = {
    id: string
    firstName: string
    lastName: string
    place: string
    address: string
    phone: string
    whatsapp: string
    dob: string
    email: string
    std: string
    remarks: string
    priority: number
    gender: string
}

type FormModel = Partial<Child>

type PersonalInformationProps = {
    data: Partial<Child>
    onNextChange?: (
        values: FormModel,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    currentStepStatus?: string
}

const { SingleValue } = components

const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
]

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

const PhoneSelectOption = ({
    innerProps,
    data,
    isSelected,
}: OptionProps<CountryOption>) => {
    return (
        <div
            className={`cursor-pointer flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <span>
                    ({data.value}) {data.dialCode}
                </span>
            </div>
        </div>
    )
}

const PhoneControl = (props: SingleValueProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <SingleValue {...props}>
            {selected && <span>{selected.dialCode}</span>}
        </SingleValue>
    )
}

// const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required('First Name Required'),
//     lastName: Yup.string().required('Last Name Required'),
//     email: Yup.string().email('Invalid email').required('Email Required'),
//     nationality: Yup.string().required('Please select your nationality'),
//     phoneNumber: Yup.string().required('Please enter your phone number'),
//     dob: Yup.string().required('Please enter your date of birth'),
//     gender: Yup.string().required('Please enter your gender'),
//     maritalStatus: Yup.string().required('Please enter your marital status'),
//     dialCode: Yup.string().required('Please select dial code'),
// })

const PersonalInformation = ({
    data = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
        whatsapp: '',
        priority: 0,
        dob: '',
        gender: '',
    },
    onNextChange,
    currentStepStatus,
}: PersonalInformationProps) => {
    const [childData, setChildData] = useState(data)
    const [ID, setChildID] = useState('')

    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'personalInformation', setSubmitting)
    }

    const getChildData = (id: string | undefined) => {
        fetch(
            `https://csp-backend-4gyg.onrender.com/api/v1/children/fetchChild/${id}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                // Handle the data
                console.log(data.data.child)
                setChildData(data.data.child)
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    'There was a problem with the fetch operation:',
                    error
                )
            })
    }

    // const postData = {
    //     // _id:'SCC1000',
    //     id: 1212132,
    //     sponsorID: 'SP0001',
    //     childID: 'CH1',
    //     caretakerID: 'yysy',
    //     status: 'Active',
    //     paymentDate: '2022-03-18T00:00:00.000+00:00',
    //     sponsorshipType: 'Montly',
    // } // Your POST data

    // fetch(
    //     'http://192.168.29.254:8080/api/v1/sponsorship/createSponsorship',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(postData),
    //     }
    // )
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok')
    //         }
    //         return response.json()
    //     })
    //     .then((data) => {
    //         // Handle the data
    //         console.log(
    //             '----------SUBMIT SUCCESSFULL--------------',
    //             '\n',
    //             data
    //         )
    //     })
    //     .catch((error) => {
    //         // Handle errors
    //         console.error(
    //             'There was a problem with the fetch operation:',
    //             error
    //         )
    //     })

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Child Information</h3>
                <p>Basic information of the child</p>
            </div>
            <Formik
                initialValues={childData}
                enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem label="Child ID">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="id"
                                            placeholder="Enter Child ID"
                                            component={Input}
                                            value={values.id}
                                        />
                                    </FormItem>
                                    <FormItem className="pt-7">
                                        <Button
                                            loading={isSubmitting}
                                            variant="solid"
                                            type="button"
                                            onClick={() =>
                                                getChildData(values.id)
                                            }
                                        >
                                            Get Child Details
                                        </Button>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem label="First Name">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            disabled
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
                                            disabled
                                            placeholder="Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        disabled
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Gender"
                                        invalid={
                                            errors.gender && touched.gender
                                        }
                                        errorMessage={errors.gender}
                                    >
                                        <Field name="gender">
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    placeholder="Gender"
                                                    field={field}
                                                    form={form}
                                                    options={genderOptions}
                                                    value={genderOptions.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.gender
                                                    )}
                                                    onChange={(gender) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            gender?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>

                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem label="Phone Number">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            disabled
                                            name="phone"
                                            placeholder="phone number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label="Date of Birth">
                                        <Field
                                            name="dob"
                                            placeholder="Date"
                                            disabled
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <DatePicker
                                                    disabled
                                                    field={field}
                                                    form={form}
                                                    value={dayjs(values.dob)}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default PersonalInformation
