import AddTransaction from '@/components/add-transaction'
import TransactionsTable from "./transactions-table";
import {Suspense} from 'react'
import {Skeleton } from '@/components/ui/skeleton'
import {SearchParamProps} from '@/types'

const Transactions = ({searchParams}: SearchParamProps) => {

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 w-[100vw] lg:w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Transactions</h1>
        <AddTransaction/>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TransactionsTable searchParams={searchParams}/>
      </Suspense>
    </div>
  )
}

const TableSkeleton = () => {
  return (
    <Skeleton className="w-full h-[400px] rounded-3xl" />
  )
}

export default Transactions;