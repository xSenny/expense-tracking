import {getTransactionsCached} from '@/lib/actions/transaction.actions'
import { DataTable } from "./data-table";
import { columns } from './columns';
import TransactionFilter from '@/components/transaction-filter'
import {SearchParamProps} from '@/types'
import {Transaction} from './columns'


const TransactionsTable = async ({searchParams}: SearchParamProps) => {
  let transactions: Transaction[];
  if (searchParams.category || searchParams.finishDate || searchParams.startDate) {
    transactions = await getTransactionsCached({
      startDate: Number(searchParams.startDate) || undefined,
      finishDate: Number(searchParams.finishDate) || undefined,
      category: searchParams.category as string || undefined
    })
  }else {
    transactions = await getTransactionsCached()
  }
  
  return (
    <div className="">
      <DataTable columns={columns} data={transactions}/>
      <TransactionFilter />
    </div>
  )
}

export default TransactionsTable
