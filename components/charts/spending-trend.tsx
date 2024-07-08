"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {formatDateTime} from '@/lib/utils'

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
  x: {
    label: "Day"
  },
  y: {
    label: "Spendings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SpendingTrendChart({data}: {data: string}) {
  console.log(data)
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <AreaChart
        accessibilityLayer
        data={JSON.parse(data)}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="x"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            return new Date(value).toDateString();
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel/>}
        />
        <Area
          dataKey="y"
          type="linear"
          fill="var(--color-y)"
          fillOpacity={0.4}
          stroke="var(--color-y)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
