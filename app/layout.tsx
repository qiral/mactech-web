import type { Metadata } from 'next'
import { Geist , Geist_Mono} from 'next/font/google'
import './globals.css'

const _geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-sans"
});
const _geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});

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
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
