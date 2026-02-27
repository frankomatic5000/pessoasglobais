'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/shared/Footer'
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat'

interface LayoutShellProps {
  children: React.ReactNode
  initialLang: 'PT' | 'EN'
}

export function LayoutShell({ children, initialLang }: LayoutShellProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) return <>{children}</>

  return (
    <>
      <Navbar initialLang={initialLang} />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
