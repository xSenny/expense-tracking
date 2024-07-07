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
import TransactionForm from '@/components/transaction-form'

import {Button} from '@/components/ui/button'
import { useState } from "react"

const AddTransaction = () => {
  const [open, setOpen] = useState(false) 

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button className="ml-auto">Add Transaction</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm onClose={handleClose} type="Create"/>
      </DialogContent>
    </Dialog>

  )
}

export default AddTransaction
