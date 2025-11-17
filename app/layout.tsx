import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'MacTech Zirvesi',
  description: 'MacTech Zirvesi 2025\'e katılın - Teknoloji liderleriyle bağlantı kurun, en son yenilikleri keşfedin ve bilgisayar bilimi kariyerinizi ilerletin.',
  icons: {
    icon: [
      {
        url: '/mactech-logo.jpg',
        media: '(prefers-color-scheme: light)',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
