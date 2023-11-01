import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import * as React from 'react'

import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Chat Next.Js & Bun',
}

const roboto = Roboto({
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={roboto.className} suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
