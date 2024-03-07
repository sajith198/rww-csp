import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetChildList, apPutCrmCustomer } from '@/services/ChildService'
import type { TableQueries } from '@/@types/common'
import { apiGetCrmCustomersStatistic } from '@/services/SponsorService'
import processResponseData from '@/utils/processResponse'

type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type Customer = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
    orderHistory: OrderHistory[]
    paymentMethod: PaymentMethod[]
    subscription: Subscription[]
}

export type Child = {
    id: string
    firstName: string
    lastName: string
    place: string
    phone: string
    whatsapp: string
    dob: string
    email: string
    std: string
    remarks: string
    priorityScale: number
}

type Statistic = {
    value: number
    growShrink: number
}

type CustomerStatistic = {
    totalCustomers: Statistic
    activeCustomers: Statistic
    newCustomers: Statistic
}

type Filter = {
    status: string
}

type GetCrmCustomersResponse = {
    data: Child[]
    total: number
}

type GetCrmCustomersStatisticResponse = CustomerStatistic

export type CustomersState = {
    loading: boolean
    statisticLoading: boolean
    customerList: Child[]
    statisticData: Partial<CustomerStatistic>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean
    selectedCustomer: Partial<Customer>
}

export const SLICE_NAME = 'rwwChildren'

// export const getCustomerStatistic = createAsyncThunk(
//     'children/data/getChildrenStatistics',
//     async () => {
//         const response =
//             await apiGetCrmCustomersStatistic<GetCrmCustomersStatisticResponse>()
//         return response.data
//     }
// )

export const getChildrenList = createAsyncThunk(
    'rwwChildren/data/getChildren',
    async (reqData: TableQueries & { filterData?: Filter }) => {
        const response = await apiGetChildList<
            GetCrmCustomersResponse,
            TableQueries
        >(reqData)
        if (response.data) {
            if (response.data) {
                const processedData = processResponseData(
                    response.data.data,
                    reqData
                )
                return processedData
            }
        }
    }
)

export const getCustomerStatistic = createAsyncThunk(
    'rwwChildren/data/getCustomerStatistic',
    async () => {
        const response =
            await apiGetCrmCustomersStatistic<GetCrmCustomersStatisticResponse>()
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'rwwChildren/data/putCustomer',
    async (data: Child) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const initialState: CustomersState = {
    loading: false,
    statisticLoading: false,
    customerList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    drawerOpen: false,
    selectedCustomer: {},
}

const customersSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChildrenList.fulfilled, (state, action) => {
                if (action.payload) {
                    state.customerList = action.payload.data
                    state.tableData.total = action.payload.total
                    state.loading = false
                }
            })
            .addCase(getChildrenList.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerStatistic.fulfilled, (state, action) => {
                state.statisticData = action.payload
                state.statisticLoading = false
            })
            .addCase(getCustomerStatistic.pending, (state) => {
                state.statisticLoading = true
            })
    },
})

export const {
    setTableData,
    setCustomerList,
    setFilterData,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = customersSlice.actions

export default customersSlice.reducer
