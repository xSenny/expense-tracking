import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import {auth} from '@clerk/nextjs/server'
import {getTopSpendingCategories} from '@/lib/actions/transaction.actions'
import {TopSpendingCategories} from '@/components/charts/top-categories'


const TopCategories = async ({analytics}: {analytics: any}) => {

  return(
    <>
      <Card className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>Top spending categories</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <TopSpendingCategories data={JSON.stringify(analytics)}/>
        </CardContent>
      </Card>
    </>
  )
}

export default TopCategories