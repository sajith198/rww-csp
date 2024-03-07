import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from '@/store'
import reducer from './store'
import { useState } from 'react'
import AddCareTaker from './components/AddCareTaker'

injectReducer('crmCustomers', reducer)

const CareTaker = () => {
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
            <AddCareTaker
                openDialog={openDialog}
                dialogIsOpen={dialogIsOpen}
                onDialogClose={onDialogClose}
                onDialogOk={onDialogOk}
            />
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools openDialog={openDialog} />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default CareTaker
