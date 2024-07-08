'use client'
import {Card, CardHeader, CardDescription, CardContent} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from '@/components/ui/select'
import { Calendar } from "@/components/ui/calendar"
import {useState, useEffect} from 'react'
import {formatDateTime, createSearchParams} from '@/lib/utils'
import {useRouter} from 'next/navigation'

const TransactionFilter = () => {

  const router = useRouter()

  const [filterData, setFilterData] = useState<{
    startDate: Date | null,
    finishDate: Date | null,
    category: string | null
  }>({
    startDate: null,
    finishDate: null,
    category: null
  })


  const handleApply = () => {
    const params = [];
    if (filterData.startDate) {
      params.push({
        param: 'startDate',
        value: String(filterData.startDate.getTime())
      })
    }
    if (filterData.finishDate) {
      const date = new Date(filterData.finishDate);
      date.setDate(date.getDate() + 1)
      params.push({
        param: 'finishDate',
        value: String(date.getTime())
      })
    }
    if (filterData.category && filterData.category !== 'all') {
      params.push({
        param: 'category',
        value: filterData.category
      })
    }

    const newUrl = `/transactions?${createSearchParams(params)}`
    router.replace(newUrl, {scroll: false})
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription>Filters</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date-range">Date Range</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-col items-start w-full h-auto">
                    <span className="font-semibold uppercase text-[0.65rem]">Start Date</span>
                    <span className="font-normal">{filterData.startDate ? formatDateTime(filterData.startDate).dateOnly : 'Not selected'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 max-w-[276px]">
                  <Calendar onSelect={(e) => setFilterData(filterData => ({...filterData, startDate: e ? new Date(e) : new Date()}))} mode="single" selected={filterData.startDate || new Date()}/>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-col items-start w-full h-auto">
                    <span className="font-semibold uppercase text-[0.65rem]">End Date</span>
                    <span className="font-normal">{filterData.finishDate ? formatDateTime(filterData.finishDate).dateOnly : 'Not selected'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 max-w-[276px]">
                  <Calendar onSelect={(e) => setFilterData(filterData => ({...filterData, finishDate: e ? new Date(e) : new Date()}))} mode="single" selected={filterData.finishDate || new Date()}/>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(e: string) => setFilterData(filterData => ({...filterData, category: e}))} >
              <SelectTrigger className="h-auto">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expenses">Expenses</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleApply}>Apply Filters</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionFilter
