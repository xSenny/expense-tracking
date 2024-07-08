"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  spending: {
    label: "Spending",
    color: "hsl(var(--chart-2))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MonthlyBreakdown({data}: {data: string}) {

  const chartData = JSON.parse(data)

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>Monthly spending breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full" >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
