import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import {auth} from '@clerk/nextjs/server'
import {getSpendingTrend} from '@/lib/actions/transaction.actions'
import {SpendingTrendChart} from '@/components/charts/spending-trend'


const SpendingTrend = async ({analytics}: {analytics: any}) => {

  return(
    <>
      <Card className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>Spending Trend over time</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <SpendingTrendChart data={JSON.stringify(analytics)}/>
        </CardContent>
      </Card>
    </>
  )
}

export default SpendingTrend