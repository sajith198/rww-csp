import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apPutCrmCustomer,
    apiGetCrmCustomersStatistic,
    apiGetSponsors,
} from '@/services/SponsorService'
import type { TableQueries, Filter } from '@/@types/common'
import { AxiosResponse } from 'axios'
import processResponseData from '@/utils/processResponse'

export type Sponsor = {
    id: string
    firstName: string
    lastName: string
    place: string
    phone: string
    whatsapp: string
    email: string
    dob: string
    remarks: string
    address: string
    childCount: number
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

type GetCrmCustomersStatisticResponse = CustomerStatistic

export type CustomersState = {
    loading: boolean
    statisticLoading: boolean
    customerList: Sponsor[]
    statisticData: Partial<CustomerStatistic>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean
    selectedCustomer: Partial<Sponsor>
}

export const SLICE_NAME = 'rwwSponsors'

export const getCustomerStatistic = createAsyncThunk(
    'rwwSponsors/data/getCustomerStatistic',
    async () => {
        const response =
            await apiGetCrmCustomersStatistic<GetCrmCustomersStatisticResponse>()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'rwwSponsors/data/getSponsors',
    async (reqData: TableQueries) => {
        const response = await apiGetSponsors<AxiosResponse, TableQueries>(
            reqData
        )
        if (response.data) {
            const processedData = processResponseData(
                response.data.data,
                reqData
            )
            return processedData
        }
    }
)

export const putCustomer = createAsyncThunk(
    'rwwSponsors/data/putCustomer',
    async (data: Sponsor) => {
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
        filterTable: (state) => {
            console.log('Im inside')
            state.loading = false
            let filterData = processResponseData(
                state.customerList,
                state.tableData
            )
            state.customerList = filterData.data
            state.tableData.total = filterData.total
            state.loading = false
        },
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
            .addCase(getCustomers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.customerList = action.payload.data
                    state.tableData.total = action.payload.total
                    state.loading = false
                }
            })
            .addCase(getCustomers.pending, (state) => {
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
    filterTable,
    setCustomerList,
    setFilterData,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = customersSlice.actions

export default customersSlice.reducer
