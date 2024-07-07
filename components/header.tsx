import Link from 'next/link'
import {Package2Icon, SearchIcon} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 justify-between">
      <div>
        <Link href="#" className="lg:hidden" prefetch={false}>
          <MobileSidebar />
        </Link>
      </div>
      <UserButton afterSignOutUrl="/"/>
    </header>
  )
}

export default Header;