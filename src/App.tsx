import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin, Facebook, Mail, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { langData, serviceDetails, rates } from './translations';

type Lang = 'ru' | 'en' | 'az';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  const t = langData[lang];
  const sd = serviceDetails[lang];

  const [calcMethod, setCalcMethod] = useState('air');
  const [calcWeight, setCalcWeight] = useState<number | ''>(100);
  const [calcLength, setCalcLength] = useState<number | ''>(50);
  const [calcWidth, setCalcWidth] = useState<number | ''>(50);
  const [calcHeight, setCalcHeight] = useState<number | ''>(50);

  useEffect(() => {
    if (calcMethod !== 'air') {
      setCalcLength('');
      setCalcWidth('');
      setCalcHeight('');
    }
  }, [calcMethod]);

  const calculateCHW = () => {
    const n = (v: any) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
    const round2 = (x: number) => Math.round(x * 100) / 100;

    const GW = n(calcWeight);
    const L = n(calcLength);
    const W = n(calcWidth);
    const H = n(calcHeight);

    let CHW = 0;

    if (calcMethod === 'air') {
      CHW = (L * H * W) / 6000;
    } else if (calcMethod === 'road' || calcMethod === 'sea') {
      CHW = GW / 225;
    } else if (calcMethod === 'rail') {
      CHW = GW / 500;
    }

    const finalChargeableWeight = Math.max(GW, CHW);

    return {
      value: String(round2(finalChargeableWeight)),
      type: CHW > GW ? 'volumetric' : 'gross'
    };
  };

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const servicesList = [
    { id: 's1', title: t['s1-t'], desc: t['s1-d'] },
    { id: 's2', title: t['s2-t'], desc: t['s2-d'] },
    { id: 's3', title: t['s3-t'], desc: t['s3-d'] },
    { id: 's4', title: t['s4-t'], desc: t['s4-d'] },
    { id: 's5', title: t['s5-t'], desc: t['s5-d'] },
    { id: 's6', title: t['s6-t'], desc: t['s6-d'] },
    { id: 's7', title: t['s7-t'], desc: t['s7-d'] },
    { id: 's8', title: t['s8-t'], desc: t['s8-d'] },
    { id: 's9', title: t['s9-t'], desc: t['s9-d'] },
    { id: 's10', title: t['s10-t'], desc: t['s10-d'] },
    { id: 's11', title: t['s11-t'], desc: t['s11-d'] },
    { id: 's12', title: t['s12-t'], desc: t['s12-d'] },
  ];

  return (
    <div className="antialiased overflow-x-hidden">
      <div id="cursor-glow" ref={glowRef} className="hidden md:block"></div>

      <nav className="fixed w-full z-[100] p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-panel px-6 py-4 rounded-2xl shadow-lg">
          <div 
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Portline<span className="text-orange-500">.</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest">
            <a href="#services" className="nav-link">{t['nav-services']}</a>
            <button onClick={() => setMapModalOpen(true)} className="nav-link">{t['nav-map']}</button>
            <a href="#calculator" className="nav-link">{t['nav-calc']}</a>
            <button onClick={() => setAboutModalOpen(true)} className="nav-link">{t['nav-about']}</button>
            <a href="#contact" className="nav-link">{t['nav-contact']}</a>
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="text-lg hover:scale-110 transition ml-4">🌓</button>
            <div className="flex space-x-3 border-l border-orange-500/30 pl-6">
              <button onClick={() => setLang('ru')} className={`hover:text-orange-500 transition ${lang === 'ru' ? 'text-orange-500' : ''}`}>RU</button>
              <button onClick={() => setLang('az')} className={`hover:text-orange-500 transition ${lang === 'az' ? 'text-orange-500' : ''}`}>AZ</button>
              <button onClick={() => setLang('en')} className={`hover:text-orange-500 transition ${lang === 'en' ? 'text-orange-500' : ''}`}>EN</button>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="text-lg">🌓</button>
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu" className="text-2xl text-orange-500">☰</button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={() => setTrackModalOpen(true)} className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition tracking-widest text-orange-500">
              {t['btn-track']}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }}
            className="fixed inset-0 z-[200] bg-black/95 p-8 flex flex-col justify-center text-center lg:hidden text-white"
          >
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu" className="absolute top-8 right-8 text-4xl">&times;</button>
            <div className="flex flex-col items-center space-y-6">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase">{t['nav-services']}</a>
              <button onClick={() => { setMobileMenuOpen(false); setMapModalOpen(true); }} className="text-xl font-black uppercase">{t['nav-map']}</button>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase">{t['nav-calc']}</a>
              <button onClick={() => { setMobileMenuOpen(false); setAboutModalOpen(true); }} className="text-xl font-black uppercase">{t['nav-about']}</button>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase">{t['nav-contact']}</a>
              <button onClick={() => { setMobileMenuOpen(false); setTrackModalOpen(true); }} className="text-xl font-black uppercase text-orange-500">{t['btn-track']}</button>
            </div>
            
            <div className="flex justify-center space-x-6 pt-8 mt-8 border-t border-white/10">
              <button onClick={() => { setLang('ru'); setMobileMenuOpen(false); }} className={lang === 'ru' ? 'text-orange-500' : ''}>RU</button>
              <button onClick={() => { setLang('az'); setMobileMenuOpen(false); }} className={lang === 'az' ? 'text-orange-500' : ''}>AZ</button>
              <button onClick={() => { setLang('en'); setMobileMenuOpen(false); }} className={lang === 'en' ? 'text-orange-500' : ''}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
            <source src="https://res.cloudinary.com/duypikbd2/video/upload/v1772653945/37379-413555939_medium_1_q2yl0w.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem] font-black mb-6 leading-none tracking-tighter uppercase">
            PORTLINE<br /> <span className="text-orange-500">SERVICES</span>
          </h1>
          <div className="flex flex-col items-center space-y-4 md:space-y-6 mt-8">
            <p className="text-xl md:text-4xl font-semibold tracking-tight opacity-90">{t['hero-subtitle-1']}</p>
            <div className="h-px w-24 bg-orange-500/50"></div>
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-orange-500">{t['hero-subtitle-2']}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 bg-black border-y border-white/10">
        <div className="method-box group h-[200px] md:h-[380px]">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" className="method-img" alt="Air" referrerPolicy="no-referrer" />
          <div className="method-content">
            <h3 className="text-4xl font-black italic text-white">{t['m-air']}</h3>
          </div>
        </div>
        <div className="method-box group h-[200px] md:h-[380px]">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800" className="method-img" alt="Road" referrerPolicy="no-referrer" />
          <div className="method-content">
            <h3 className="text-4xl font-black italic text-white">{t['m-road']}</h3>
          </div>
        </div>
        <div className="method-box group h-[200px] md:h-[380px]">
          <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800" className="method-img" alt="Sea" referrerPolicy="no-referrer" />
          <div className="method-content">
            <h3 className="text-4xl font-black italic text-white">{t['m-sea']}</h3>
          </div>
        </div>
        <div className="method-box group h-[200px] md:h-[380px]">
          <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800" className="method-img" alt="Rail" referrerPolicy="no-referrer" />
          <div className="method-content">
            <h3 className="text-4xl font-black italic text-white">{t['m-rail']}</h3>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-10 md:mb-16 tracking-tighter text-center">
            <span>{t['s-title-1']}</span> <span className="text-orange-500">{t['s-title-2']}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((s) => (
              <div 
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className="service-card p-6 md:p-10 rounded-2xl"
              >
                <h3 className="text-lg font-black uppercase mb-4 text-orange-500">
                  {s.title}
                </h3>
                <p className="opacity-70 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 md:p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-8 md:mb-10 text-center">{t['calc-title']}</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="calc-method" className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">{t['label-method']}</label>
                <select id="calc-method" value={calcMethod} onChange={e => setCalcMethod(e.target.value)} className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl text-base md:text-lg font-bold appearance-none">
                  <option value="air">{t['m-air']}</option>
                  <option value="road">{t['m-road']}</option>
                  <option value="sea">{t['m-sea']}</option>
                  <option value="rail">{t['m-rail']}</option>
                </select>
                <div className="absolute right-4 bottom-4 md:bottom-5 pointer-events-none opacity-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label htmlFor="calc-weight" className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">{t['label-weight']}</label>
                  <input id="calc-weight" type="number" min="0" value={calcWeight} onChange={e => setCalcWeight(e.target.value ? Number(e.target.value) : '')} className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl text-base md:text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label htmlFor="calc-length" className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">{t['label-length']}</label>
                  <input id="calc-length" type="number" min="0" value={calcLength} disabled={calcMethod !== 'air'} onChange={e => setCalcLength(e.target.value ? Number(e.target.value) : '')} className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl text-base md:text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label htmlFor="calc-width" className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">{t['label-width']}</label>
                  <input id="calc-width" type="number" min="0" value={calcWidth} disabled={calcMethod !== 'air'} onChange={e => setCalcWidth(e.target.value ? Number(e.target.value) : '')} className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl text-base md:text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label htmlFor="calc-height" className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">{t['label-height']}</label>
                  <input id="calc-height" type="number" min="0" value={calcHeight} disabled={calcMethod !== 'air'} onChange={e => setCalcHeight(e.target.value ? Number(e.target.value) : '')} className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl text-base md:text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
              </div>
            </div>
            <div className="text-center p-6 md:p-12 bg-orange-500/10 rounded-2xl border border-orange-500/20 h-full flex flex-col justify-center overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">
                {calculateCHW().type === 'volumetric' ? t['calc-result'] : t['label-weight']}
              </p>
              <div className={`font-black text-orange-500 tracking-tighter break-all transition-all duration-300 ${calculateCHW().value.length > 8 ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'}`}>
                {calculateCHW().value} <span className="text-2xl md:text-4xl">KG</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs md:text-sm opacity-60 italic text-center max-w-3xl mx-auto leading-relaxed">
            {t['calc-note']}
          </div>
        </div>
      </section>

      <div className="py-20 overflow-hidden border-y border-white/5" style={{ background: 'var(--card-bg)' }}>
        <div className="carousel-track space-x-20">
          {['Araznet MMC', 'R Service M MMC', 'Estel Azerbaijan MMC', 'VIP XIDMETLER QRUPPU MMC', 'GID CSR CONSULTING MMC', 'Araznet MMC', 'R Service M MMC', 'Estel Azerbaijan MMC', 'VIP XIDMETLER QRUPPU MMC', 'GID CSR CONSULTING MMC'].map((brand, i) => (
            <span key={`${brand}-${i}`} className="text-2xl md:text-3xl font-black opacity-20 uppercase tracking-tighter whitespace-nowrap">{brand}</span>
          ))}
        </div>
      </div>

      <section id="contact" className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-8 leading-none tracking-tighter" dangerouslySetInnerHTML={{ __html: t['c-h'] }}></h2>
            <p className="opacity-60 mb-10 md:mb-12 text-base md:text-lg">{t['c-p']}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 glass-panel rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Email</p>
                <p className="font-bold break-all">office@pls.az</p>
              </div>
              <div className="p-6 glass-panel rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Social</p>
                <a href="https://www.instagram.com/portline_services/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500 break-all hover:underline">@portline_services</a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Replace the # with your actual social media links */}
              <a href="https://www.instagram.com/portline_services/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:text-orange-500 hover:border-orange-500 transition"><Instagram size={24} /></a>
              <a href="https://www.linkedin.com/company/port-line-services-llc/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:text-orange-500 hover:border-orange-500 transition"><Linkedin size={24} /></a>
              <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:text-orange-500 hover:border-orange-500 transition"><Facebook size={24} /></a>
              <a href="mailto:office@pls.az" aria-label="Email" className="p-4 glass-panel rounded-full hover:text-orange-500 hover:border-orange-500 transition"><Mail size={24} /></a>
              <a href="https://wa.me/994512405888" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel rounded-full hover:text-orange-500 hover:border-orange-500 transition"><Phone size={24} /></a>
            </div>
          </div>
          <div className="glass-panel p-6 md:p-12 rounded-2xl">
            <form action="https://formspree.io/f/mreawzzb" method="POST" className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <input type="text" name="name" id="contact-name" aria-label={t['ph-name']} required placeholder={t['ph-name']} className="px-4 py-4 md:px-6 md:py-5 rounded-xl w-full" />
                <input type="tel" name="phone" id="contact-phone" aria-label={t['ph-phone']} required placeholder={t['ph-phone']} className="px-4 py-4 md:px-6 md:py-5 rounded-xl w-full" />
              </div>
              <input type="email" name="email" id="contact-email" aria-label={t['ph-email']} required placeholder={t['ph-email']} className="px-4 py-4 md:px-6 md:py-5 rounded-xl w-full" />
              <div className="relative">
                <select name="service" id="contact-service" aria-label="Select Service" className="px-4 py-4 md:px-6 md:py-5 rounded-xl w-full appearance-none">
                  <option value="Freight Inquiry">{t['q-1']}</option>
                  <option value="Legal Support">{t['q-2']}</option>
                  <option value="Customs Clearance">{t['q-3']}</option>
                  <option value="Other Services">{t['q-4']}</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <textarea name="message" id="contact-message" aria-label={t['ph-msg']} rows={4} required placeholder={t['ph-msg']} className="px-4 py-4 md:px-6 md:py-5 rounded-xl w-full"></textarea>
              <button type="submit" className="w-full bg-orange-500 py-5 md:py-6 rounded-xl font-black uppercase text-xs tracking-[0.2em] text-white hover:bg-orange-600 transition shadow-xl shadow-orange-500/20">{t['btn-send']}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-medium mb-8 max-w-2xl mx-auto opacity-80">{t['footer-text']}</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-sm opacity-60">
            <div>
              <p className="font-bold text-orange-500 mb-2 uppercase tracking-wider">{t['footer-head']}</p>
              <p>H.Aliyev av 152, Chinar Plaza, 32'nd floor</p>
            </div>
            <div>
              <p className="font-bold text-orange-500 mb-2 uppercase tracking-wider">{t['footer-branch']}</p>
              <p>Heyder Aliyer International Airport, Baku Logistics Center</p>
            </div>
          </div>
          <p className="text-[10px] font-black opacity-50 uppercase tracking-[1em]">
            Portline 2026 // <a href="https://coyora.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">Powered by Coyora Studio</a>
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {trackModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 md:px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full relative text-center"
            >
              <button onClick={() => setTrackModalOpen(false)} aria-label="Close" className="absolute top-6 right-6 md:top-8 md:right-8 text-2xl opacity-50 hover:opacity-100 hover:text-orange-500 transition"><X /></button>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-6 tracking-tighter">Track <span className="text-orange-500">Cargo</span></h3>
              <p className="text-lg opacity-80 mb-8">{t['track-partner']}</p>
              <a 
                href="https://log.origrace.shop/track-form/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setTrackModalOpen(false)}
                className="block w-full bg-orange-500 py-5 rounded-xl font-black text-white uppercase tracking-widest text-xs hover:bg-orange-600 shadow-xl shadow-orange-500/20 transition"
              >
                {t['btn-portal']}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeService && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            onClick={() => setActiveService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-12 rounded-2xl max-w-2xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActiveService(null)} aria-label="Close" className="absolute top-8 right-8 text-2xl opacity-50 hover:opacity-100 hover:text-orange-500 transition"><X /></button>
              <h3 className="text-3xl font-black uppercase italic mb-6 text-orange-500">{servicesList.find(s => s.id === activeService)?.title}</h3>
              <p className="text-lg leading-relaxed opacity-90">{sd[activeService as keyof typeof sd]}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl px-6 py-10"
            onClick={() => setAboutModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl max-h-full relative glass-panel rounded-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 flex justify-between items-center border-b border-white/10 relative z-10 bg-black/50">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">{t['about-title']}</h3>
                <button onClick={() => setAboutModalOpen(false)} aria-label="Close" className="text-2xl opacity-50 hover:opacity-100 hover:text-orange-500 transition"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 bg-[var(--bg)]">
                <p className="text-lg leading-relaxed opacity-90">{t['about-p1']}</p>
                <p className="text-lg leading-relaxed opacity-90">{t['about-p2']}</p>
                <p className="text-lg leading-relaxed opacity-90">{t['about-p3']}</p>
                
                <h4 className="text-2xl font-black uppercase text-orange-500 mt-10 mb-6">{t['about-why']}</h4>
                <ul className="space-y-4 opacity-90 list-disc pl-6">
                  <li dangerouslySetInnerHTML={{ __html: t['about-l1'] }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t['about-l2'] }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t['about-l3'] }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t['about-l4'] }}></li>
                  <li dangerouslySetInnerHTML={{ __html: t['about-l5'] }}></li>
                </ul>

                <div className="grid md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-white/10">
                  <div>
                    <h4 className="text-xl font-black uppercase text-orange-500 mb-4">{t['about-mission-t']}</h4>
                    <p className="opacity-90">{t['about-mission-d']}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-orange-500 mb-4">{t['about-vision-t']}</h4>
                    <p className="opacity-90">{t['about-vision-d']}</p>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-xl font-black italic text-orange-500">{t['about-slogan']}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mapModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl px-6"
            onClick={() => setMapModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-6xl max-h-[90vh] relative glass-panel rounded-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 flex justify-between items-center border-b border-white/10 relative z-10 bg-black/50">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">{t['cov-title']}</h3>
                <button onClick={() => setMapModalOpen(false)} aria-label="Close" className="text-2xl opacity-50 hover:opacity-100 hover:text-orange-500 transition"><X /></button>
              </div>
              <div className="flex-1 relative bg-[var(--bg)] overflow-y-auto flex flex-col md:flex-row p-8 gap-8 items-center">
                <div className="flex-1 space-y-6">
                  <p className="text-lg leading-relaxed opacity-90">{t['cov-p1']}</p>
                  <p className="text-lg leading-relaxed opacity-90">{t['cov-p2']}</p>
                </div>
                <div className="flex-1 relative min-h-[300px] w-full flex justify-center items-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                    alt="World Map" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain opacity-40" 
                    style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
