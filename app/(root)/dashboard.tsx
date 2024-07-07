import DataCard from "@/components/card";
import RecentTransactions from '@/components/recent-transactions'
import {getDashboardData} from '@/lib/actions/dashboard.actions'
import { auth } from '@clerk/nextjs/server';
import dynamic from 'next/dynamic'

const MonthlySpendingBreakdown = dynamic(() => import('@/components/monthly-breakdown'), { ssr: false })


const Dashboard = async () => {
  const dashboardData = await getDashboardData()

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <DataCard title="Total income" amount={dashboardData.income!!}/>
        <DataCard title="Total expenses" amount={dashboardData.expenses!!}/>
        <DataCard title="Current balance" amount={dashboardData.balance!!}/>
      </div>
      <div className="flex items-center flex-col gap-6 mt-10 w-full">
        <MonthlySpendingBreakdown data={JSON.stringify(dashboardData.monthlySpendingBreakdown)}/>
        <RecentTransactions data={JSON.stringify(dashboardData.recentTransactions)} />
      </div>
    </>
  )
}

export default Dashboard;