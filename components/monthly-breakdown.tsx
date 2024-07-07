'use client'
import useWindowDimensions from './window-size'
import { BarChart, Bar , XAxis, YAxis } from 'recharts';


const MonthlySpendingBreakdown = ({data}: {data: string}) => {
  const parsedData = JSON.parse(data)

  const {width} = useWindowDimensions()

  return (
    <BarChart width={width !== undefined ? (width > 1000 ? 0.65*width : 0.8*width) : 1000} height={300} data={parsedData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="month"/>
      <Bar dataKey="spending" fill="#82ca9d"/>
      <YAxis />   
    </BarChart>
  )

}
export default MonthlySpendingBreakdown