import Image from "next/image";
import ThemeSelector from '@/components/theme-selector'
import { DataTable } from "./data-table";
import { columns, Transaction } from "./columns";
import {Button} from '@/components/ui/button'
import { auth } from "@clerk/nextjs/server";
import AddTransaction from '@/components/add-transaction'
import TransactionsTable from "./transactions-table";
import {Suspense} from 'react'
import {Skeleton } from '@/components/ui/skeleton'
import {SearchParamProps} from '@/types'

const Transactions = async ({searchParams}: SearchParamProps) => {

  return (
    <div className="w-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
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