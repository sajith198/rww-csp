import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export type TableListQuery = {
    pageSize: number
    pageNumber: number
}

export type Filter = {
    status: string
}

export type SponsorInformationType = {
    id: string
    firstName: string
    lastName: string
    email: string
    place: string
    phoneNumber: string
    whatsappNumber: string
    dob: string
    address: string
    remarks: string
}
