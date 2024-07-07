'use client'
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

import {deleteTransaction} from '@/lib/actions/transaction.actions'


import TransactionForm from './transaction-form'

import { MoreHorizontal } from "lucide-react"

import {useState} from 'react'
import { useToast } from "@/components/ui/use-toast"


const TransactionMenu = ({transaction}: {transaction: {category: string, description: string, amount: number, _id: string}}) => {

  const [open, setOpen] = useState(false) 

  const {toast } = useToast()

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteTransaction = async () => {
    const deleted = await deleteTransaction(transaction._id)
    if (deleted.authorized) {
      toast({
        title: 'Deleted your transaction',
        description: transaction.description
      })
    } else {
      toast({
        title: deleted.message,
        variant: 'destructive'
      })
    }
  }

  return(
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Edit Transaction
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={handleDeleteTransaction}>Delete Transaction</DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit a Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm onClose={handleClose} type="Edit" transaction={transaction}/>
        </DialogContent>
      </DropdownMenu>
    </Dialog>
  )
}

export default TransactionMenu;