'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const REGISTER_URL = 'https://lu.ma/embed-checkout/0nz70uyt'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/mactech-logo.jpg" alt="MacTech Zirvesi" width={32} height={32} className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold tracking-tight">MacTech Zirvesi</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black hover:border-white">
              Etkinliğe Dön
            </Button>
          </Link>
        </div>
      </nav>

      <div className="overflow-hidden pt-24 pb-24 px-6">
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
              height="650"
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
