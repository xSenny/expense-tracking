import DataCard from "@/components/card";
import { MonthlyBreakdown } from "@/components/charts/monthly-breakdown";
import RecentTransactions from '@/components/recent-transactions'
import {getDashboardData} from '@/lib/actions/dashboard.actions'

const Dashboard = async () => {
  const dashboardData = await getDashboardData()
  console.log(dashboardData)
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <DataCard title="Total income" amount={dashboardData.income!!}/>
        <DataCard title="Total expenses" amount={dashboardData.expenses!!}/>
        <DataCard title="Current balance" amount={dashboardData.balance!!}/>
      </div>
      <div className="flex items-center flex-col gap-6 mt-10 w-full">
        <MonthlyBreakdown data={JSON.stringify(dashboardData.monthlySpendingBreakdown)}/>
        <RecentTransactions data={JSON.stringify(dashboardData.recentTransactions)} />
      </div>
    </>
  )
}

export default Dashboard;