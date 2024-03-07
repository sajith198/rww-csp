import Input from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
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

type PersonalInformationType = {
    firstName: string
    lastName: string
    email: string
    place: string
    dialCode: string
    phoneNumber: string
    dob: string
}

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type PersonalInformationProps = {
    data: PersonalInformationType
    // onNextChange?: (
    //     values: FormModel,
    //     formName: string,
    //     setSubmitting: (isSubmitting: boolean) => void
    // ) => void
    // currentStepStatus?: string
}

const { SingleValue } = components

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

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name Required'),
    lastName: Yup.string().required('Last Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    place: Yup.string().required('Please select your Place'),
    phoneNumber: Yup.string().required('Please enter your phone number'),
    dob: Yup.string().required('Please enter your date of birth'),
    // gender: Yup.string().required('Please enter your gender'),
    // maritalStatus: Yup.string().required('Please enter your marital status'),
    dialCode: Yup.string().required('Please select dial code'),
})

const CareTakerForm = ({
    data = {
        firstName: '',
        lastName: '',
        email: '',
        place: '',
        dialCode: '',
        phoneNumber: '',
        dob: '',
    },
}: // onNextChange,
// currentStepStatus,
PersonalInformationProps) => {
    // const onNext = (
    //     values: FormModel,
    //     setSubmitting: (isSubmitting: boolean) => void
    // ) => {
    //     onNextChange?.(values, 'personalInformation', setSubmitting)
    // }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Add Sponsor</h3>
                <p>Add a new Sponsor</p>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    // setTimeout(() => {
                    //     // onNext(values, setSubmitting)
                    // }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-2 gap-4">
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
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Class"
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
                                    label="Phone Number"
                                    invalid={
                                        errors.phoneNumber &&
                                        touched.phoneNumber
                                    }
                                    errorMessage="Please enter your phone number"
                                >
                                    <InputGroup>
                                        {/* <Field name="dialCode">
                                            {({ field, form }: FieldProps) => (
                                                <Select<CountryOption>
                                                    className="min-w-[130px]"
                                                    placeholder="Dial Code"
                                                    components={{
                                                        Option: PhoneSelectOption,
                                                        SingleValue:
                                                            PhoneControl,
                                                    }}
                                                    field={field}
                                                    form={form}
                                                    options={countryList}
                                                    value={countryList.filter(
                                                        (country) =>
                                                            country.value ===
                                                            values.dialCode
                                                    )}
                                                    onChange={(country) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            country?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field> */}
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
                                    </InputGroup>
                                </FormItem>
                                <div className="md:grid grid-cols-2 gap-4">
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
                                        <Field name="dob" placeholder="Date">
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

                                {/* <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Next'}
                                    </Button>
                                </div> */}
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default CareTakerForm