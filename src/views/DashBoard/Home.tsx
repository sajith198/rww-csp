import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from '@/store'
import reducer from './store/index'

injectReducer('crmCustomers', reducer)

const Home = () => {
    return (
        <>
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                {/* <CustomersTableTools />
                <CustomersTable /> */}
            </AdaptableCard>
        </>
    )
}

export default Home
