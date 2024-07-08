import {Suspense} from 'react'
import {Skeleton } from '@/components/ui/skeleton'
import {getSpendingTrend, getTopSpendingCategories, getSpendingVsIncome} from '@/lib/actions/transaction.actions'
import dynamic from 'next/dynamic'

//dynamic importing

const SpendingTrend = dynamic(() => import('./spending-trend'), {ssr: false})
const TopCategories = dynamic(() => import('./top-categories'), {ssr: false})
const IncomeExpenseChart = dynamic(() => import('./income-expense'), {ssr: false})


const Analytics = async () => {

  const [spendingTrend, topSpendingCategories, incomeExpenses] = await Promise.all([
    getSpendingTrend(),
    getTopSpendingCategories(),
    getSpendingVsIncome()
  ])

  return(
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Analytics</h1>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <Suspense fallback={<Skeleton className="w-full h-[393px] rounded-3xl"/>}>
            <IncomeExpenseChart analytics={incomeExpenses}/>
          </Suspense>
          <Suspense fallback={<Skeleton className="w-full h-[393px] rounded-3xl"/>}>
            <SpendingTrend analytics={spendingTrend}/>
          </Suspense>
          <Suspense fallback={<Skeleton className="w-full h-[393px] rounded-3xl"/>}>
            <TopCategories analytics={topSpendingCategories} />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 

export default Analytics