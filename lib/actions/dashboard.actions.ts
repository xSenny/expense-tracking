'use server'

import {getTransactionsCached} from './transaction.actions'

export const getDashboardData = async () => {
  try {
    const allTransactions = await getTransactionsCached();
    if (allTransactions.error) {
      throw new Error('Error receiving transactions')
    }

    let income = 0, expenses = 0;
    allTransactions.forEach(({amount}: {amount: number}) => {
      if (amount <= 0) {
        expenses -= amount;
      } else {
        income += amount;
      }
    })

    const date = new Date();
    date.setFullYear(date.getFullYear() - 1)
    
    const lastYearTransactions = await getTransactionsCached({startDate: date.getDate()});

    const data = Array.from({length: 12}, (_, i) => {
      const d = new Date()
      d.setMonth(date.getMonth() - i);
      return {
        month: d.toLocaleString('default', {month: 'short'}),
        spending: 0,
        income: 0
      }
    }).reverse();

    lastYearTransactions.forEach((i: {createdAt: string, amount: number}) => {
      const d = new Date(i.createdAt);
      const month = new Date().getMonth() - d.getMonth() + (12 * (new Date().getFullYear() - d.getFullYear()))
      if (month >= 0 && month < 12) {
        if (i.amount < 0) {
          data[11 - month].spending += Math.abs(i.amount)
        } else {
          data[11 - month].income += i.amount
        }
      }
    })


    return {
      income,
      expenses,
      balance: income - expenses,
      monthlySpendingBreakdown: data,
      recentTransactions: allTransactions.slice(0, 5)
    }

  } catch (e) {
    console.log(e);
    return {
      error: true
    }
  }
}