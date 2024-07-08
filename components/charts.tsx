'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect} from 'react'
import useWindowDimensions from './window-size'
import {formatDateTime} from '@/lib/utils'
import { BarChart, Bar, Rectangle } from 'recharts';

export const IncomeExpenses = ({data}: {data: string}) => {

  const parsed = JSON.parse(data)

  const { width } = useWindowDimensions()

  return(
    <>

      <LineChart width={width !== undefined ? (width > 1000 ? 0.65*width : 0.8*width) : 1000} height={300} data={parsed} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <Tooltip 
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      Income
                    </span>
                    <span className="font-bold text-muted-foreground">
                      {payload[0].value}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      Expenses
                    </span>
                    <span className="font-bold">
                      {payload[1].value}
                    </span>
                  </div>
                </div>
              </div>
            )
          }

          return null
        }}/>
        <Line type="monotone" strokeWidth={2} dataKey="income" stroke="#1ca612" activeDot={{ r: 6, style: { fill: "var(--theme-primary)", opacity: 0.25 }}}/>
        <Line type="monotone" strokeWidth={2} dataKey="expense" stroke="#941813" activeDot={{ r: 6, style: { fill: "var(--theme-primary)", opacity: 0.25 }}}/>
        <XAxis dataKey="month" />
      </LineChart>
        
    </>
  )
}

 
export const SpendingTrendChart = ({data}: {data: string}) => {
  const parsed = JSON.parse(data)
  

  const { width } = useWindowDimensions()

  return (
    <>

      <LineChart width={width !== undefined ? (width > 1000 ? 0.65*width : 0.8*width) : 1000} height={300} data={parsed} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <Tooltip 
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      Date
                    </span>
                    <span className="font-bold text-muted-foreground">
                      {formatDateTime(new Date(payload[0].payload.x)).dateTime}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      Spent
                    </span>
                    <span className="font-bold">
                      {payload[0].value}
                    </span>
                  </div>
                </div>
              </div>
            )
          }

          return null
        }}/>
          <Line strokeWidth={2} data={parsed} dataKey="y" stroke="red" tooltipType="none" activeDot={{ r: 6, style: { fill: "var(--theme-primary)", opacity: 0.25 }}}/>
          <XAxis
            dataKey="x"
            domain={['auto', 'auto']}
            interval={0}
            type="number"
            label={{
              key: 'xAxisLabel',
              value: 'x',
              position: 'bottom',
            }}
            className="hidden"
            allowDataOverflow={true}
            strokeWidth={2}
          />
      </LineChart>
        
    </>
  )
}


export const TopSpendingCategories = ({data} : {data: string}) => {
  const parsed = JSON.parse(data)

  const { width } = useWindowDimensions()

  return (
    <BarChart width={width !== undefined ? (width > 1000 ? 0.65*width : 0.8*width) : 1000} height={300} data={parsed} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="category"/>
      <Bar dataKey="amount" fill="#82ca9d"/>
      <YAxis />   
    </BarChart>
  )
}


