import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/ChildTable'
import CustomersTableTools from './components/ChildTableTools'
import CustomerStatistic from './components/ChildStatistic'
import { injectReducer } from '@/store'
import reducer from './store'
import { useState } from 'react'
import AddChild from './components/AddChild'

injectReducer('rwwChildren', reducer)

const Children = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        console.log('onDialogClose')
        setIsOpen(false)
    }

    const onDialogOk = () => {
        console.log('onDialogOk')
        setIsOpen(false)
    }

    return (
        <>
            <AddChild
                openDialog={openDialog}
                dialogIsOpen={dialogIsOpen}
                onDialogClose={onDialogClose}
                onDialogOk={onDialogOk}
            />
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools openForm={openDialog} />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Children
