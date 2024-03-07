import { useRef } from 'react'
import Button from '@/components/ui/Button'
import {
    getChildrenList,
    setTableData,
    setFilterData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import CustomerTableSearch from './ChildTableSearch'
import CustomerTableFilter from './ChildTableFilter'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import { HiOutlinePlusCircle } from 'react-icons/hi'

type ChildTableToolsProps = {
    openForm: () => void
}

const CustomersTableTools = (props: ChildTableToolsProps) => {
    const { openForm } = props

    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.rwwChildren.data.tableData
    )

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getChildrenList(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CustomerTableFilter />
                <div className="mb-4 mr-2">
                    <Button size="sm" onClick={onClearAll}>
                        Clear
                    </Button>
                </div>
            </div>
            <div className="mb-4">
                <Button
                    size="sm"
                    variant="solid"
                    icon={<HiOutlinePlusCircle />}
                    onClick={openForm}
                >
                    New Child
                </Button>
            </div>
        </div>
    )
}

export default CustomersTableTools
