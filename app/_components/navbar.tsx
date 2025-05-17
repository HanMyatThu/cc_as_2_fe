import { ModeToggle } from '@/components/common/theme-switcher'
import React from 'react'


export const Navbar = () => {
  return (
    <div className="w-full flex h-10 px-8 py-2 border-b-2 border-neutral-200 items-center justify-between dark:border-neutral-600">
      <div>
        Hello World
      </div>
      <div className="flex flex-row items-center justify-center gap-x-3">
        <ModeToggle />
        Login
      </div>
    </div>
  )
}