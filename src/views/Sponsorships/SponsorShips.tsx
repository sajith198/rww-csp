import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/SponsorshipTable'
import CustomersTableTools from './components/SponsorshipTableTools'
import CustomerStatistic from './components/SponsorshipStatistic'
import { injectReducer } from '@/store'
import reducer from './store'
import Tabs from '@/components/ui/Tabs'

injectReducer('crmCustomers', reducer)
const { TabNav, TabList, TabContent } = Tabs

const Sponsorships = () => {
    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <Tabs
                    onChange={(val) => console.log(val)}
                    defaultValue="tab1"
                    variant="pill"
                    className="mb-5"
                >
                    <TabList>
                        <TabNav value="tab1">Ongoing</TabNav>
                        <TabNav value="tab2">Completed</TabNav>
                        <TabNav value="tab3">Discontinued</TabNav>
                        <TabNav value="tab4">Delayed</TabNav>
                    </TabList>
                </Tabs>
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Sponsorships
