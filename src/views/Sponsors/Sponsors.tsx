import AdaptableCard from '@/components/shared/AdaptableCard'
import SponsorTable from './components/SponsorTable'
import SponsorTableTools from './components/SponsorTableTools'
import SponsorStatistics from './components/SponsorStatistic'
import { injectReducer } from '@/store'
import reducer from './store'
import { useState } from 'react'
import AddSponsor from './components/AddSponsor'

injectReducer('rwwSponsors', reducer)

const SponsorsView = () => {
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
            {/* <SponsorStatistics /> */}
            <AddSponsor
                openDialog={openDialog}
                dialogIsOpen={dialogIsOpen}
                onDialogClose={onDialogClose}
                onDialogOk={onDialogOk}
            />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <SponsorTableTools openForm={openDialog} />
                <SponsorTable />
            </AdaptableCard>
        </>
    )
}

export default SponsorsView
