'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Ticket, Network, Lightbulb, Linkedin, ExternalLink, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'


const EVENT_CONFIG = {
  name: 'MacTech Zirvesi',
  date: '3 Aralık 2025',
  description: 'MacTech Bilgisayar Bilimleri Zirvesi, teknoloji dünyasının öncü isimlerini bir araya getirerek yapay zeka, siber güvenlik, veri bilimi ve daha fazlası hakkında en son gelişmeleri keşfetme imkânı sunar. Mactech\'e katılarak sektör liderleriyle tanışabilir, yeni teknolojileri deneyimleyebilir ve kariyerinizde ilerleme fırsatı yakalayabilirsiniz. İster öğrenci olun ister profesyonel, bu etkinlik size ilham verecek ve ufkunuzu genişletecek. Haberler, program detayları ve sürpriz gelişmeler için takipte kalın!',
  location: 'Marmara Üniversitesi, Maltepe Kampüsü, İstanbul',
  attendees: '300+',
  email: 'info@macsec.club',
  phone: '+90 553 048 80 18',
  social: {
    twitter: 'https://x.com/macsecommunity',
    instagram: 'https://www.instagram.com/macsecommunity/',
    linkedin: 'https://www.linkedin.com/company/macsecommunity/'
  }
}

const SCHEDULE = [
  { time: '10:15 - 11.00', title: 'Yapay Zeka ve Kurumsal Şirketler', speaker: 'Barış Yüceses', type: 'Panel' },
  { time: '11.15 - 12.00', title: 'Siber Güvenlik', speaker: 'Atıl Samancıoğlu', type: 'Panel'},
  { time: '12.00 - 13.00', title: 'Yemek Molası', speaker: '', type: 'Sosyal' },
  { time: '13.00 - 13.45', title: 'Yazılımda Kariyer', speaker: 'Kardel Rüveyda Çetin', type: 'Panel' },
  { time: '14.00 - 14.45', title: 'Unlearn OOP: Back to Origins', speaker: 'Lemi Orhan Ergin', type: 'Panel' },
  { time: '15.00 - 15.45', title: 'Bilgisayar Mühendisliği ve Yapay Zeka', speaker: 'Furkan Sönmez', type: 'Panel' }
]

const SPEAKERS = [
  { 
    name: 'Lemi Orhan Ergin', 
    title: 'Developer & Architect',
    company: 'Craftgate', 
    image: '/speakers/lemi-orhan.jpg',
    accent: 'from-purple-500',
    linkedin: 'https://www.linkedin.com/in/lemiorhan/'
  },
  { 
    name: 'Atıl Samancıoğlu', 
    title: 'Founder of Academy Club & CTO at Orphex', 
    company: 'Academy Club', 
    image: '/speakers/atil-samancioglu.jpg',
    accent: 'from-blue-500',
    linkedin: 'https://www.linkedin.com/in/atıl-samancıoğlu-96028871/'
  },
  { 
    name: 'Barış Yüceses', 
    title: 'AI Architect & Ex-Getir CTO', 
    company: 'Indisol', 
    image: '/speakers/baris-yuceses.jpg',
    accent: 'from-blue-500',
    linkedin: 'https://www.linkedin.com/in/barisyuceses/'
  },
  { 
    name: 'Kardel Rüveyda Çetin', 
    title: 'Software Development Lead', 
    company: 'Doğuş Teknoloji', 
    image: '/speakers/ruveyda-cetin.jpg',
    accent: 'from-blue-500',
    linkedin: 'https://www.linkedin.com/in/kardelruveydacetin/'
  },
  { 
    name: 'Furkan Sönmez', 
    title: 'Senior Software Engineer', 
    company: 'Roamless', 
    image: '/speakers/furkan-sonmez.jpg',
    accent: 'from-blue-500',
    linkedin: 'https://www.linkedin.com/in/mrsonmez10'
  }
]

const SPONSORS = [
  { 
    name: 'Unicourse', 
    tier: 'Altın Sponsor', 
    image: '/sponsors/unicourse-logo.jpg', 
    webpage: 'https://www.unicourse.co'
  },
  { 
    name: 'Summarify', 
    tier: 'Stand Sponsoru', 
    image: '/sponsors/summarify-logo.jpg', 
    webpage: 'https://www.summarify.io'
  },
  { 
    name: 'Öğrenci Kariyeri', 
    tier: 'Stand Sponsoru', 
    image: '/sponsors/ogrenci-kariyeri-logo.jpg', 
    webpage: 'https://www.ogrencikariyeri.com'
  },
  { 
    name: 'Muhiku', 
    tier: 'Çekiliş Sponsoru', 
    image: '/sponsors/muhiku-logo.jpg', 
    webpage: 'https://www.muhiku.com'
  },
  { 
    name: 'Yapı Kredi Yayınları', 
    tier: 'Çekiliş Sponsoru', 
    image: '/sponsors/yapi-kredi-yayinlari-logo.jpg', 
    webpage: 'https://www.ykykultur.com.tr'
  },
  { 
    name: 'Yves Rocher', 
    tier: 'Çekiliş Sponsoru', 
    image: '/sponsors/yves-rocher-logo.jpg', 
    webpage: 'https://www.yvesrocher.com.tr'
  },
  { 
    name: 'Storytel', 
    tier: 'Çekiliş Sponsoru', 
    image: '/sponsors/storytel-logo.jpg', 
    webpage: 'https://www.storytel.com/tr'
  },
  { 
    name: 'Miuul', 
    tier: 'Çekiliş Sponsoru', 
    image: '/sponsors/miuul-logo.jpg', 
    webpage: 'https://www.miuul.com'
  },
  { 
    name: 'Jerf', 
    tier: 'Çekiliş Sponsoru', 
    image: '/sponsors/jerf-logo.jpg', 
    webpage: 'https://www.jerf.com.tr'
  },
  {
    name: 'Hop Scooter',
    tier: 'Çekiliş Sponsoru',
    image: '/sponsors/hoplagit-logo.jpg',
    webpage: 'https://www.hoplagit.com'
  },
  { 
    name: 'Toptalent', 
    tier: 'Medya Sponsoru', 
    image: '/sponsors/toptalent-logo.jpg', 
    webpage: 'https://www.toptalent.co'
  },
  { 
    name: 'Univerlist', 
    tier: 'Medya Sponsoru', 
    image: '/sponsors/univerlist-logo.jpg', 
    webpage: 'https://www.univerlist.com'
  },
  { 
    name: 'Nuh\'un Ankara Makarnası', 
    tier: 'Yemek Sponsoru', 
    image: '/sponsors/nuhun-ankara-logo.jpg', 
    webpage: 'https://www.nuh.com.tr'
  },
  { 
    name: 'Gaziantepli Taha Usta', 
    tier: 'Yemek Sponsoru', 
    image: '/sponsors/taha-usta-logo.jpg', 
    webpage: 'https://www.instagram.com/gazianteplitahausta/'
  },
  { 
    name: 'Nescafe', 
    tier: 'İçecek Sponsoru', 
    image: '/sponsors/nescafe-logo.jpg', 
    webpage: 'https://www.nescafe.com/tr/'
  },
  { 
    name: 'Scala Yayıncılık', 
    tier: 'Ürün Sponsoru', 
    image: '/sponsors/scala-logo.jpg', 
    webpage: 'https://www.scalakitapci.com'
  },
]

const HIGHLIGHTS = [
  { icon: Lightbulb, label: 'İnovatif Konuşmalar', desc: 'Sektörün öncü isimlerinden gelecek odaklı fikirler, yenilikçi yaklaşımlar ve uygulamalı örneklerle ilham alın.' },
  { icon: Network, label: 'Networking Fırsatı', desc: 'Profesyoneller, işe alım ekipleri ve girişimcilerle doğrudan bağlantı kurun; yeni iş birlikleri ve mentorluk imkânları oluşturun.' },
  { icon: Ticket, label: 'Çekiliş ve Ödüller', desc: 'Değerli sponsorlarımızın sunduğu sürpriz hediyeler, ödüller ve katılımcılara özel avantajlar için şansınızı deneyin.' }
]


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const targetDate = new Date('2025-12-03T10:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
          transition: 'background 0.3s ease-out'
        }}
      />

      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/mactech-logo.jpg" alt="MacTech Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">{EVENT_CONFIG.name}</span>
          </div>
          <Link href="/register">
            <Button className="bg-white text-black hover:bg-white/90 font-semibold">
              Kayıt Ol <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      <section className="pt-24 pb-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div 
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 relative cursor-pointer"
            onMouseEnter={() => setShowCountdown(true)}
            onMouseLeave={() => setShowCountdown(false)}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">{EVENT_CONFIG.date}</span>
            
            <div 
              className={`absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl transition-all duration-300 ease-out ${
                showCountdown 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{ minWidth: '320px' }}
            >
              <div className="flex items-center gap-2 mb-4 text-purple-300">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Etkinliğe Kalan Süre</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 mb-2 border border-purple-500/20">
                    <div className="text-2xl font-black text-white tabular-nums">
                      {countdown.days}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Gün</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 mb-2 border border-purple-500/20">
                    <div className="text-2xl font-black text-white tabular-nums">
                      {countdown.hours.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Saat</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 mb-2 border border-purple-500/20">
                    <div className="text-2xl font-black text-white tabular-nums">
                      {countdown.minutes.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Dakika</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 mb-2 border border-purple-500/20 animate-pulse">
                    <div className="text-2xl font-black text-white tabular-nums">
                      {countdown.seconds.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Saniye</div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 tracking-tighter">
            Geleceğin Teknolojilerini
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Keşfedin
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed">
            {EVENT_CONFIG.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-black hover:bg-white/90 font-bold">
                Hemen Kaydolun <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5">
              Daha Fazla Bilgi
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="border border-white/10 rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur">
              <div className="text-3xl md:text-4xl font-black text-purple-400">{EVENT_CONFIG.attendees}</div>
              <div className="text-sm text-gray-400 mt-2">Katılımcı</div>
            </div>
            <div className="border border-white/10 rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur">
              <div className="text-3xl md:text-4xl font-black text-purple-400">{SPEAKERS.length}</div>
              <div className="text-sm text-gray-400 mt-2">Konuşmacı</div>
            </div>
            <div className="border border-white/10 rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur">
              <div className="text-3xl md:text-4xl font-black text-purple-400">{SPONSORS.length}</div>
              <div className="text-sm text-gray-400 mt-2">Sponsor</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/10" id="about">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            Bir Gün Boyunca
            <br />
            <span className="text-purple-400">Enerji Dolu Deneyim</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Sektörün önde gelen isimlerinden ilham verici konuşmalar, uygulamalı teknik atölyeler, işe alım ekipleriyle doğrudan buluşma imkânı ve gerçekten işe yarayan networking fırsatları sizi bekliyor.
          </p>
        </div>

            <div className="space-y-4">
              {HIGHLIGHTS.map((item, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/40 transition-colors">
                      <item.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/10" id="speakers">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16">Konuşmacılar</h2>

          <div className="flex flex-wrap justify-center gap-6">
            {SPEAKERS.map((speaker, i) => (
              <a
                key={i}
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={speaker.image || "/placeholder.svg"} 
                    alt={speaker.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-4 right-4 p-2 bg-black/80 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Linkedin className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <h3 className="font-black text-lg leading-tight">{speaker.name}</h3>
                  <p className="text-sm text-purple-400 font-semibold">{speaker.title}</p>
                  <p className="text-xs text-gray-400">{speaker.company}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/5 border-y border-white/10" id="schedule">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16">Program</h2>

          <div className="space-y-3">
            {SCHEDULE.map((session, j) => (
              <div
                key={j}
                className="p-4 rounded-lg border transition-all border-white/10 bg-white/5 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 font-mono mb-1">{session.time}</div>
                    <div className="font-semibold">{session.title}</div>
                    {session.speaker && (
                      <div className="text-sm text-purple-400 mt-1">{session.speaker}</div>
                    )}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 whitespace-nowrap">
                    {session.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16">Sponsorlarımız</h2>

          <div className="flex flex-wrap justify-center gap-6">
            {SPONSORS.map((sponsor, i) => (
              <a
                key={i}
                href={sponsor.webpage}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 bg-white/5 hover:bg-white/10 cursor-pointer w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="relative aspect-square overflow-hidden bg-black/50">
                  <Image
                    src={sponsor.image || "/placeholder.svg"} 
                    alt={sponsor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                  <div className="absolute top-4 right-4 p-2 bg-black/80 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-black text-lg mb-2">{sponsor.name}</h3>
                  <p className="text-sm text-purple-400 font-semibold">{sponsor.tier}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Geleceğin bir parçası
            <br />
            <span className="text-purple-400">olmaya hazır mısınız?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">Hemen kayıt olun.</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold text-lg px-8">
              Hemen Kaydolun <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10 bg-black/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/mactech-logo.jpg" alt="MacTech Logo" width={24} height={24} className="w-6 h-6" />
                <span className="font-black">{EVENT_CONFIG.name}</span>
              </div>
              <p className="text-sm text-gray-500">Bütün yeniliklerin buluştuğu zirve.</p>
            </div>
            {[
              { title: 'Etkinlik', links: [
                { name: 'Hakkında', id: 'about' },
                { name: 'Program', id: 'schedule' },
                { name: 'Konuşmacılar', id: 'speakers' }
              ]},
              { title: 'Topluluk', links: [
                { name: 'Twitter', url: EVENT_CONFIG.social.twitter },
                { name: 'Instagram', url: EVENT_CONFIG.social.instagram },
                { name: 'LinkedIn', url: EVENT_CONFIG.social.linkedin }
              ]},
              { title: 'İletişim', links: [
                { name: EVENT_CONFIG.email, url: `mailto:${EVENT_CONFIG.email}` },
                { name: EVENT_CONFIG.phone, url: `tel:${EVENT_CONFIG.phone}` }
              ]}
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link: { name: string; id?: string; url?: string }, j) => (
                    <li key={j}>
                      {link.id ? (
                        <button 
                          onClick={() => link.id && scrollToSection(link.id)}
                          className="text-sm text-gray-500 hover:text-white transition-colors text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link 
                          href={link.url || '#'}
                          target={link.url?.startsWith('http') ? '_blank' : undefined}
                          rel={link.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-gray-500 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}