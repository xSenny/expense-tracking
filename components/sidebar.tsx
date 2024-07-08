'use client'

import Link from 'next/link'
import {Package2Icon, BellIcon, HomeIcon, FileTextIcon, LineChartIcon, BookMarked} from 'lucide-react'
import ThemeSelector from './theme-selector'
import {usePathname} from 'next/navigation'
import {useEffect} from 'react'

const Sidebar = () => {

  const pathName = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 lg:block min-h-screen w-[280px]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <Package2Icon className="h-6 w-6" />
              <span className="">Expense Tracker</span>
            </Link>
            <ThemeSelector/>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathName === '/' && 'bg-muted text-primary '
                }`}
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathName === '/transactions' && 'bg-muted text-primary '
                }`}
                prefetch={false}
              >
                <FileTextIcon className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                href="/analytics"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathName === '/analytics' && 'bg-muted text-primary '
                }`}
                prefetch={false}
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="/docs"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathName === '/docs' && 'bg-muted text-primary '
                }`}
                prefetch={false}
              >
                <BookMarked className="h-4 w-4" />
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </div>
  )
}

export default Sidebar;