import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { IncomeVsExpensesChart } from "@/components/charts/income-expenses"


const IncomeExpenseChart = async ({analytics}: {analytics: any}) => {

  return(
    <>
      <Card className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>Monthly Income vs Expense chart</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <IncomeVsExpensesChart data={JSON.stringify(analytics)}/>
        </CardContent>
      </Card>
    </>
  )
}

export default IncomeExpenseChart