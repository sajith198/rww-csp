import { useEffect, useCallback, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import {
    getChildrenList,
    setTableData,
    setSelectedCustomer,
    setDrawerOpen,
    useAppDispatch,
    useAppSelector,
    Customer,
    Child,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CustomerEditDialog from './ChildEditDialog'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'

const statusColor: Record<string, string> = {
    active: 'bg-green-400',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }: { row: Child }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            Edit
        </div>
    )
}

const NameColumn = ({ row }: { row: Child }) => {
    // const { textTheme } = useThemeClass()
    return (
        <div className="flex w-28 items-center">
            {/* <Avatar size={28} shape="circle" src={row.img} /> */}
            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/details?id=${row.id}`}
            > */}
            {/* {row.firstName} */}
            {/* </Link> */}

            <Badge
                className={
                    row.priorityScale == 5 ? 'bg-green-400' : 'bg-red-500'
                }
            />
            <span className="ml-2 rtl:mr-2 capitalize">
                {row.firstName} {row.lastName}
            </span>
        </div>
    )
}

const Customers = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.rwwChildren.data.customerList)
    const loading = useAppSelector((state) => state.rwwChildren.data.loading)
    const filterData = useAppSelector(
        (state) => state.rwwChildren.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.rwwChildren.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(
            getChildrenList({ pageIndex, pageSize, sort, query, filterData })
        )
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Child>[] = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Name',
                accessorKey: 'firstName',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Class',
                accessorKey: 'std',
            },
            {
                header: 'Place',
                accessorKey: 'place',
            },
            {
                header: 'Phone',
                accessorKey: 'whatsapp',
            },

            {
                header: 'DOB',
                accessorKey: 'dob',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex w-14 items-center">
                            {dayjs(row.dob, 'YYYY-MM-DD').format('MMM D')}
                        </div>
                    )
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            // {
            //     header: 'Payment Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge className={statusColor[row.status]} />
            //                 <span className="ml-2 rtl:mr-2 capitalize">
            //                     {row.status}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Last Payment Date',
            //     accessorKey: 'lastPayment',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 {dayjs.unix(row.lastOnline).format('MM/DD/YYYY')}
            //             </div>
            //         )
            //     },
            // },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
