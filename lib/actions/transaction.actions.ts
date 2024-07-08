'use server'
import { CreateTransactionProps, ExpenseIncomeTrack } from "@/types";
import { connectToDatabase } from "../database";
import Transaction from "../database/models/transaction.model";
import {cache} from 'react'
import {revalidatePath} from 'next/cache'
import queryString from "query-string";
import { formatMonth } from "../utils";
import { auth } from "@clerk/nextjs/server";

export const createTransaction = async(transaction: CreateTransactionProps) => {

  try {
    await connectToDatabase();

    const {sessionClaims} = auth();
    const user = sessionClaims?.userId as string;

    const createdTransaction = await Transaction.create({...transaction, user})

    revalidatePath('/transactions')

    return JSON.parse(JSON.stringify({
      createdTransaction,
      success: true
    }))
  } catch (e) {
    console.log(e)
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const getTransactions = async (query?: {startDate?: number, finishDate?: number, category?: string}) => {
  if (!query) {
    try {
      const {sessionClaims} = auth();
      const user = sessionClaims?.userId as string;

      await connectToDatabase();
  
      const allTransactions = await Transaction.find({user}).sort({createdAt: 'desc'})
      
      return JSON.parse(JSON.stringify(allTransactions));
    } catch (e) {
      console.log(e)
      throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
    }
  }

  try {
    await connectToDatabase();

    const {sessionClaims} = auth();
    const user = sessionClaims?.userId as string;


    const createdAt: any = {}
    if (query.startDate) {createdAt.$gte = query.startDate;}
    if (query.finishDate) {createdAt.$lte = query.finishDate;}

    const findQuery: any = {user}
    if (query.startDate || query.finishDate) findQuery.createdAt = createdAt
    if (query.category) {findQuery.category = query.category}


    const filteredTransactions = await Transaction.find(findQuery).sort({createdAt: 'desc'})

    return JSON.parse(JSON.stringify(filteredTransactions))

  } catch (e) {
    console.log(e);
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }

}

export const getTransactionsCached = cache(getTransactions)


export const getSpendingVsIncome = async () => {
  try {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1)
    
    const transactions = await getTransactionsCached({startDate: date.getDate()});

    const data = Array.from({length: 12}, (_, i) => {
      const d = new Date()
      d.setMonth(date.getMonth() - i);
      return {
        month: d.toLocaleString('default', {month: 'short'}),
        income: 0,
        expense: 0,
      }
    }).reverse();

    transactions.forEach((i: {createdAt: string, amount: number}) => {
      const d = new Date(i.createdAt);
      const month = new Date().getMonth() - d.getMonth() + (12 * (new Date().getFullYear() - d.getFullYear()))
      if (month >= 0 && month < 12) {
        if (i.amount > 0) {
          data[11-month].income += i.amount;
        } else {
          data[11 - month].expense += Math.abs(i.amount)
        }
      }
    })

    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const getSpendingTrend = async () => {
  try {
    const data = await getTransactionsCached();

    data.reverse();

    const trend: any[] = []
    data.forEach((i: {createdAt: string, amount: number}) => {
      const d = new Date(i.createdAt);
      const time = d.getTime()
      if (i.amount < 0) {
        trend.push({
          x: time,
          y: Math.abs(i.amount)
        })
      }
    })

    return JSON.parse(JSON.stringify(trend));
  } catch (e) {
    console.log(e);
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const getTopSpendingCategories = async () => {
  try {
    const data = await getTransactionsCached()

    let top: any = {};

    ['Income', 'Expenses', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'].forEach(i => {
      top[i] = 0;
    })

    data.forEach(({category, amount}: {category: string, amount: number}) => {
      if (amount < 0) {
        top[category] -= amount;
      }
    })
    const returning: any[] = []

    Object.keys(top).forEach(i => {
      returning.push({
        category: i,
        amount: top[i]
      })
    })

    return JSON.parse(JSON.stringify(returning));
  } catch (e) {
    console.log(e);
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const editTransaction = async (data: {transactionID: string, amount: Number, category: string, description: string}) => {
  try {

    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const {transactionID: id, amount, category, description} = data;

    await connectToDatabase();

    const transactionToUpdate = await Transaction.findById(id);

    if (transactionToUpdate.user.toString() !== userId) {
      return JSON.parse(JSON.stringify(
        {
          authorized: false,
          message: 'This is not your transaction.'
        }
      ))
    }

    await Transaction.findByIdAndUpdate(id, {
      amount,
      category,
      description
    })

    revalidatePath('/transactions')
    return JSON.parse(JSON.stringify(
      {
        authorized: true,
        message: ''
      }
    ))

  } catch (e) {
    console.log(e);
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const deleteTransaction = async (id: string) => {
  try {
    
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    await connectToDatabase()

    const transactionToDelete = await Transaction.findById(id);

    if (transactionToDelete.user.toString() !== userId) {
      return JSON.parse(JSON.stringify(
        {
          authorized: false,
          message: 'This is not your transaction.'
        }
      ))
    }

    await Transaction.findByIdAndDelete(id);

    revalidatePath('/transactions')
    return JSON.parse(JSON.stringify(
      {
        authorized: true,
        message: ''
      }
    ))
  } catch (e) {
    console.log(e);
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}