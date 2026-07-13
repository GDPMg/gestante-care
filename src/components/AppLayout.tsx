import type { ReactNode } from 'react'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:min-h-svh">
      <TopNav />
      <div className="mx-auto flex min-h-svh max-w-md flex-col gap-5 px-6 pt-8 pb-28 lg:max-w-5xl lg:gap-8 lg:px-10 lg:pt-8 lg:pb-10">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
