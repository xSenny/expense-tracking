'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import TransactionMenu from '@/components/transaction-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Transaction = {
  createdAt: Date,
  description: string,
  amount: number,
  category: 'Income' | 'Expenses' | 'Food' | 'Transport' | 'Bills' | 'Entertainment' | 'Other',
  _id: string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({row}) => {
      const date = new Date(row.original.createdAt);
      const formatted = `${String(date.getDate()).padStart(2, '0')}:${String(date.getMonth() + 1).padStart(2, '0')}:${String(date.getFullYear())}`
      return <div>{formatted}</div>
    }
  }, 
  {
    accessorKey: 'description',
    header: 'Description'
  }, 
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({row}) => {
      const amount = row.original.amount;
      return <div className={`${amount < 0 ? 'text-red-400' : 'text-green-400'}`}>{amount}</div>
    }
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <TransactionMenu transaction={transaction}/>
      )
    },
  },
]