export type UserProps = {
  email: string,
  username: string,
  clerkId?: string,
  photo: string,
  _id?: string,
}

export type CreateTransactionProps = {
  amount: number,
  category: string,
  createdAt: Date,
  description: string
}

export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export type Param = {
  param: string,
  value: string,
}

export type ExpenseIncomeTrack = {
  month: string,
  expense: number,
  income: number;
}