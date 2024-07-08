"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import TransactionCategories from "./transaction-categories"
import {CreateTransactionProps} from '@/types'
import {createTransaction, editTransaction} from '@/lib/actions/transaction.actions'
import { useToast } from "@/components/ui/use-toast"



const formSchema = z.object({
  amount: z.string({
    required_error: 'The amount must be introduced',
  }),
  category: z.string().min(1, 'Select a category'),
  description: z.string().max(25, 'Your description is too long, use only 25 characters.').min(1, 'Add a description')
})

const TransactionForm = ({ onClose, type, transaction}: { onClose: () => void; type: 'Create' | 'Edit'; transaction?: {category: string, description: string, amount: number, _id: string}}) => {

  const {toast} = useToast();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: transaction ? {
      amount: String(transaction.amount),
      category: transaction.category,
      description: transaction.description
    } : {
      amount: '0',
      category: 'Income',
      description: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "Create") {
      const transactionProps: CreateTransactionProps = {
        amount: Number(values.amount),
        category: values.category as "Income" | "Expenses" | "Food" | "Transport" | "Bills" | "Entertainment" | "Other",
        createdAt: new Date(),
        description: values.description
      }
      const createdTransaction = await createTransaction(transactionProps);
      if (!createdTransaction.error) {
        onClose()
        toast({
          title: 'Created a new transaction',
          description: transactionProps.description
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An error occured',
          description: transactionProps.description
        })
      }
    } else if (type === 'Edit' && transaction !== undefined) {
      const action = await editTransaction({
        transactionID: transaction._id,
        amount: Number(values.amount),
        category: values.category,
        description: values.description
      })

      if (action.authorized) {
        onClose()
        toast({
          title: 'Updated your transaction',
          description: values.description
        })
      } else {
        toast({
          title: action.message,
          variant: 'destructive'
        })
      }
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="-120" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the amount of your transaction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <TransactionCategories value={field.value} onChangeHandler={field.onChange} />
                </FormControl>
                <FormDescription>
                  Select your specific category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                Add a short description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button className="self-center" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default TransactionForm
