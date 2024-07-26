import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
import { UrlQueryParams, RemoveUrlQueryParams, Param } from '@/types'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export function createSearchParams(paramsList: Param[]): string {
  const params = paramsList.reduce((acc, { param, value }) => {
    acc[param] = value;
    return acc;
  }, {} as Record<string, string>);

  return qs.stringify(params);
}

export const categories = [
  {
    label: 'Salary',
    value: 'Salary',
    type: 'income'
  },
  {
    label: 'Income',
    value: 'Income',
    type: 'income'
  },
  {
    label: 'Food',
    value: 'Food',
    type: 'expense'
  },
  {
    label: 'Transport',
    value: 'Transport',
    type: 'expense'
  },
  {
    label: 'Bills',
    value: 'Bills',
    type: 'expense'
  },
  {
    label: 'Entertainment',
    value: 'Entertainment',
    type: 'expense'
  },
  {
    label: 'Expense',
    value: 'Expense',
    type: 'expense'
  },
]