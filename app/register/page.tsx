'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

const REGISTER_URL = 'https://lu.ma/embed-checkout/evt-M77alrdLvnfeAdE'

export default function RegisterPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://embed.lu.ma/checkout-button.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/mactech-logo.jpg" alt="MacTech Zirvesi" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold tracking-tight">MacTech Zirvesi</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black hover:border-white">
              Etkinliğe Dön
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Yerinizi Ayırın
            </h1>
            <p className="text-lg text-gray-400">Teknoloji bakış açınızı değiştirecek bir gün için 300+ yenilikçi ile buluşun.</p>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur overflow-hidden">
            <iframe
              src={REGISTER_URL}
              width="100%"
              height="700"
              style={{
                border: 'none',
                borderRadius: '12px'
              }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>

          <div className="mt-6 text-center space-y-4">
            <p className="text-gray-500 text-sm">Sorunuz mu var? <a href="mailto:info@macsec.club" className="text-blue-500">info@macsec.club</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
