'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {Package2Icon, HomeIcon, FileTextIcon, LineChartIcon, BookMarked} from 'lucide-react'
import Sidebar from './sidebar'
import Link from 'next/link'
import ThemeSelector from "./theme-selector"
import {usePathname} from 'next/navigation'


const MobileSidebar = () => {
  const pathName = usePathname()

  return (
    <Sheet>
      <SheetTrigger>
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetDescription>
            <div className=" block min-h-screen w-full">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}

export default MobileSidebar;