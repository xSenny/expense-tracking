import { CardContent, Card, CardHeader, CardDescription, CardTitle } from "./ui/card";
import {formatDateTime} from '@/lib/utils'
const RecentTransactions = ({data}: {data: string}) => {
  const parsedData = JSON.parse(data)
  console.log(parsedData)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Recent Transactions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {parsedData.map((data: {category: string, amount: number, createdAt: Date}) => (
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-medium">{data.category}</div>
            <div className="text-sm text-muted-foreground">{formatDateTime(new Date(data.createdAt)).dateOnly}</div>
          </div>
          <div className={`font-medium text-primary ${data.amount < 0 ? 'text-red-700' : 'text-green-700'}`}>{data.amount}</div>
        </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default RecentTransactions;