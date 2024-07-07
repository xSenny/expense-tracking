import Image from "next/image";
import ThemeSelector from '@/components/theme-selector'
import Dashboard from './dashboard'
import {Suspense} from 'react'
import {Skeleton} from '@/components/ui/skeleton'
const DashboardPage = async () => {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Dashboard</h1>
      </div>
      <div className="grid gap-6">
        <Suspense fallback={<Skeleton className="rounded-3 h-screen w-full"/>}>
          <Dashboard />
        </Suspense>
      </div>
    </div>
  )
}

export default DashboardPage;