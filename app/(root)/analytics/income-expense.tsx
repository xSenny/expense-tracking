import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import {auth} from '@clerk/nextjs/server'
import {getSpendingVsIncome} from '@/lib/actions/transaction.actions'
import {IncomeExpenses} from '@/components/charts'


const IncomeExpenseChart = async ({analytics}: {analytics: any}) => {


  return(
    <>
      <Card className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>Monthly Income vs Expense chart</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <IncomeExpenses data={JSON.stringify(analytics)}/>
        </CardContent>
      </Card>
    </>
  )
}

export default IncomeExpenseChart