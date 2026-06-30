"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const projectsData = [
  {
    id: "PROJ_01",
    title: "AI-Driven Intelligent Liquid Cooling Vest",
    subtitle: "Adaptive Thermal Regulation System",
    description: "Interdisciplinary project (1st Sem) focused on a group of 5 students from various engineering branches. Developed an AI-driven system for adaptive thermal regulation using liquid cooling technology.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLsoDzxWz4IQyJHhunPn1FfDj0ii_tMGYQUecBAsFri4zsNdReO7nCdZ_O_aHeswVLdIPeVP6fk8-3IQWdyo6STUfBTS4IREeCLZmlTV3r9Ue58odBes4hQsjNE5BnYGVeODY_VXEgYYD88kJTuVsg8uSSVz041I7Zx-a_V4fKvTmApI4wV-6sTZ2-KuE8oLp4Fw-IDmxSN9N7o5xw44M_9H9N6zLABAnMD007m7Ly3VkFOIR6ToOrOLeWpm",
    team: "Group of 5 (Interdisciplinary)"
  },
  {
    id: "PROJ_02",
    title: "Thermal Simulation",
    subtitle: "MATLAB",
    description: "Detailed thermal simulation and analysis using MATLAB. Focuses on heat dissipation modeling and predictive thermal profiling for high-stress engineering environments.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVWHnbPxWWu47Boqpf7Pz1BiZLa4MYUUnr4TR59xjFhq1n60FP5mYNDUbYpUVaoQq_fuaOcqNTOvDUwoEWUjC9DR8w5Aq2rb_FMZkPbliFicb1v-nxt3t1yEc7zE7mMgQCjHKAI1NoodXFJ8KhqXEzr0T64WWcf1pEmr1yuPxkPz-Z9SuO8wEUyydthgjSkpbOfiU1ZJ9PI9yfTQZP2SSPxqJq-6yzJeV7SDWuwVLF2odny6rkP_zViQcHL5JF443V-geaOgoAe9VI",
  },
  {
    id: "PROJ_03",
    title: "Data Analysis Script",
    subtitle: "Python",
    description: "Python-based data analysis script for experimental results. Utilizes Pandas and NumPy for rapid dataset parsing and statistical distribution modeling.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVWHnbPxWWu47Boqpf7Pz1BiZLa4MYUUnr4TR59xjFhq1n60FP5mYNDUbYpUVaoQq_fuaOcqNTOvDUwoEWUjC9DR8w5Aq2rb_FMZkPbliFicb1v-nxt3t1yEc7zE7mMgQCjHKAI1NoodXFJ8KhqXEzr0T64WWcf1pEmr1yuPxkPz-Z9SuO8wEUyydthgjSkpbOfiU1ZJ9PI9yfTQZP2SSPxqJq-6yzJeV7SDWuwVLF2odny6rkP_zViQcHL5JF443V-geaOgoAe9VI",
  }
];

const certificationsData = [
  { alt: 'Group Dance Winner', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Z9tYcVFWPloX9NlxDb97qy6FvBkOtIHLPRu_H18_AQ2wMqvZaHWojuyStkaak9QD2qZYczQ5oqjLIxCZmNwRXAdnu12NbGCEG640MAn0CLCkgX1vK2C44voE7g8r8YzhzsktTjTzbGTW4d6IyS67C7xcJgNsgLXYyUl1-yxLElSxrWf9-DUkce60lVWsYonshyxKoFGAprsgehQ94AkZt36IvkZnZ1rQM69gUMcS3ExuMRtlA9oq08Mdb5X0Dc2O1-cowMFSISY1', aspect:'4/3' },
  { alt: 'CS Academy Sports Winner', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoAnM_UaVaWy4spszmfrPjDDDnNUq71NAJfpOAgDkzPJFvD0BjnLpEyX_q3z6NvTbzZnxASS0q8-hs8n86-T9B7PNK6LBEhE6cXooILXi5XlvJahVXRbTI66lFAT172slShK-ybgNDV1lxnXoBLaqxAgVivOZHVcZVRVZUgTPai_iUtXSVweoScSNmtVTuR4Hdu7gGtcdZMcTfYV7OmxKrXbmWq00jxSjaza_FW2SBO-oxkNk9lYDr9HORGGbdvoCdQhNsENahTa40', aspect:'4/3' },
  { alt: 'SIP Abacus Grandmaster', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEXYapewr6sqrvCXemv5aCvoeUT3M5IUQ2E8BaP7ESnrOOWQ5ZUmHAFV4xDlxQI2dfIRrabSyy1kfC87WethccP_xdB0dLzbLnDXFHPZV2I7QntHgonxix05UYEG2f-N6SrbzZCq5bXwRzKeuXSnpD7XcW2AY82Rs-KApMcK_SMAlXSZe5CQ48A0q5nvSJJYe1zuEX1YuUkXEFyEKVuk9b3jyjLcKUQf-u40GDcR2yUjw4IBO8ifheyroySOTr8hIbjPIJ4VUU6X_Z', aspect:'3/4' },
  { alt: 'Intro to LLM - Google Cloud', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPBXY2V6OWuohxexsLtSOFUA8hWXN0VTZZm34NAR1THWvz2AS5HuwSAw4vtQmpn5hwBZuHd8hGG4joXNAovNxmXEC8McuUynqrFa9UPmWqTu-Jm1HubBl4j_Ohc-dCvIon0zRkjwexH8S-SoxBW8EnR6TvixzKWMuRuWACdJ6v_xw9MbJeL3dwknnwiLUQCWz5ML-90p-7lAJjeuyXdQmbltIRChagapQCzNvmeYCKtEth5ba_XdBwD7P6P568d0_B62ypIRQ0Kr6', aspect:'4/3' },
  { alt: 'SIP Regional Prodigy 2020', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWc3BNUvcgqp0LNjAzXNqzppw_zcSF_0026KWKb1DTgRKMBPLIcTU2-wbfFZoNspc_m3EBoskKl84BECPkFNbdLKji4WyDFpqdSRx7p6p-qA1kD6EwA0AOGkMfo9U_sdlABNUtj2lx416C5bvxiBCLQm-ToLdmYamdtYc7uJbTB5J7o4dSHdhabhZpjTS-Nmy6cLWyQEjnAELHf8MiNrdajY2X4l755JoXm_p00oHQ5VZENWz6rXVUrcTyJvTtxMqid_xPQRCQtguc', aspect:'4/3' },
  { alt: 'State Level Volleyball', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8cQZ33QU3urdyYuYofcdb3iykH1zO4xIf1IQCb_xqtDzprbLzKZesw0oqeO7bumuwuJ12iqj9htpiRV3k6KB3q2Qgs5MqzRv27_-1Dbp8r6jNopTPUmJlFmHUEIeQoZLX1lsEy69TJKDK1kxGkJ2Fpz1X0CG8yQK9N7LsRoXc55fdgzRiWTCkB9k_uABqs7GvtZQ_NgzIX15tbgtsgmRJRViUAbvVWpEEDfFtP98gySNvigk4Psf_EAJHy2tOh13ovMmXVFOTWyxu', aspect:'4/3' },
  { alt: 'Yoga State Level', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASVJHRUYGWKowW22j8y6s2OvJgHXNThq7_3kH5y5uy0WnBfcId2Xm3YtOyiChEJgCBU14JplJ3oCJtBtSHj-6-faXgwJcZkjAkRo6k2znraKQUtsqK78Z7WpIHOx6tV5wr7opG7x4hEwgBAUPyOqO6qhCQWuxN_OLoVo0-_oZGVaEqJrMdB_ErADTKih4vEdT5Qu3is5KPpcUa1HODDtUGqtWOJ9wXBgQJ813NkmbkGsZfrEOOufc25VS9BaglcQ6F41WvvmBpA3bs', aspect:'4/3' },
  { alt: 'National Spell Bee Rank', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwJOAcsBUwjXtxRp8NOKyMGMh0EYai_KWtZZrdogPE_so-YqbawATz2FxqH3Ma0ftUh-kVp0E0HRQIC-DNQfHYGm2Gn_uUnB3VzOioHAHOHHw4z0rgT9y2S7h8bPSzUTDWPxo6kkUtA6HhiZAou2tTu2-lSKxCvCXTuqJgTelY_C29_yeU839BBLujMTFCTGwLbPnC39wSOpWoO_mqEBwsGOg0OWv8jGyDDDpLsI6kl-JH6kqqT_QgfIskdYwGHVYEj7du6clkN2II', aspect:'4/3' },
  { alt: 'SSM Merit Certificate', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA59zzMsSdNUb5tFt4iBZdMG26yP2KWHKNPnoSjAfnVh4Ej7PPceAu4pp6_b5t4zuRqf7O5MGUY1lhWVAsbQuJud2-obynUw9eXaIR4ZJNYhLIBlow2zzQnOEiewmCL-0UZGR9ZKs7-QVbfexkWhO4-hkqID9trK9ayee3D_C2z2EldANkafPIWiXY8ZK9i7ohbb1zYie1z6Jvl_St66x0J3XCaQI5FTLYNV3b8WsLt7A8tCn5qwZsZZmpbdlwHgaEb2uo1RFxdw78X', aspect:'4/3' },
  { alt: 'Sports Meet - First Place', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt9wSD2Hx1G2NMyWeM0_raEv1EedGQJnItIsnVBvSdCfvvgn1N20qpHz-6Q-KHiOKPK69yx_zmCR4cO7mEYlZ85wJUZO710gUK1tX4ZzICxtFje1ovdKlEag4Md3kDRutTRwfDTGHNRT0FPCDJNV5-twFMpYlKdCvgyJMM3tOk0Q7nqqsECifRDwZRqefrrpA-tgbWmW95dh08biEYHzWxFdaRIt-Y-1n8DQNf0XaKnbEaS720RkMcMCt6duGeTVO7-8CowoqciCd0', aspect:'4/3' },
  { alt: 'Cyber Security Workshop', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW6EbxjETizKT8ezK6myTtGz14l4Z67y3Ek5Qpp0cOqbfRqW0iiVIA4TobWrfK82yjLipJJIuQLphqEBYkEmtIlP2sQXw4Tnp_NRVAFJXoAYoQQwVuf4uQlPJG5KSfr21SrTqqKm7SixohHSUnlpGzD1QD3X8WR8WtyHmwr887M1L4tAgA_Ko4-X89--Wb1x3UhdPIdO66cj2O6412vDwR5z7hnnhaESPPFm6Bp8EKpmUL69XIyiBQUnd8IfTbBfunizoDS6oF-R30', aspect:'4/3' },
  { alt: 'NSO 2017', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkhv9AtAlbNYPSnZDEwe0daqjD0t2xbH_KOS_d2S2IAkNgPHmZhgls1amvA_2VGp6NZzJPhGMPlRFxebrmupJRci9Gq5sQGr7rNFC4JqXErtbAFT2Py1xTvw1uFDnMrNneqw7BpHrhkJ7f8Ad7XqM45xrUyGw4rgvV2cx6aTREhqwhKycN9g6VThSN3SDF-PDxAULIMt5AcIV15kD6VyDVW_KECDlck9aRHlxdmWbo7CA6JWESc6QBa0o4CCIiJjz6X7AyDEWViCHf', aspect:'4/3' },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          const skillBars = entry.target.querySelectorAll('.skill-bar');
          skillBars.forEach(bar => {
            const el = bar as HTMLElement;
            el.style.width = el.getAttribute('data-width') || '0%';
          });

          const counters = entry.target.querySelectorAll('.counter, .skill-counter');
          counters.forEach(counter => {
            const el = counter as HTMLElement;
            const target = parseFloat(el.getAttribute('data-target') || '0');
            const decimals = parseInt(el.getAttribute('data-decimals') || '0');
            const isSkill = el.classList.contains('skill-counter');
            const duration = isSkill ? 1200 : 2000;
            const stepTime = isSkill ? 20 : 50;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            const updateCounter = setInterval(() => {
              current += increment;
              if (current >= target) { current = target; clearInterval(updateCounter); }
              el.textContent = isSkill ? current.toFixed(0) + '%' : current.toFixed(decimals);
            }, stepTime);
            el.classList.remove('counter');
            el.classList.remove('skill-counter');
          });

          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade, #skills, .counter, .project-card-reveal, .timeline-item').forEach(el => observer.observe(el));

    const magneticElements = document.querySelectorAll('.magnetic-el');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const moveX = ((me.clientX - rect.left - rect.width / 2) / rect.width) * 12;
        const moveY = ((me.clientY - rect.top - rect.height / 2) / rect.height) * 12;
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      el.addEventListener('mouseleave', () => { (el as HTMLElement).style.transform = 'translate(0,0)'; });
    });

    const handleScroll = () => {
      const container = document.querySelector('.timeline-container');
      const line = document.querySelector('.timeline-line');
      if (!container || !line) return;
      const rect = container.getBoundingClientRect();
      let progress = (window.innerHeight * 0.75 - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      (line as HTMLElement).style.height = `${progress * 100}%`;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-transparent text-slate-900 dark:text-white min-h-screen flex flex-col relative transition-colors duration-500">

      {/* ── Cosmic Background ── */}
      <div className="cosmic-bg opacity-0 dark:opacity-100 transition-opacity duration-1000"></div>

      <main className="flex-grow">

        <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-10">

          {/* Top Navigation */}
          <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 md:px-14 pt-6 pb-4 text-lg tracking-widest text-slate-900 dark:text-white font-semibold bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-900/60 transition-colors duration-500 shadow-sm dark:shadow-none">
            <div className="flex gap-8 items-center">
              <span className="font-extrabold text-slate-900 dark:text-white text-2xl drop-shadow-md">M. RUPAN VIJAY.</span>
              <nav className="hidden lg:flex gap-8 opacity-100 items-center">
                <a href="#hero" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors font-bold">HOME</a>
                <span className="text-slate-300 dark:text-cyan-700/50">|</span>
                <a href="#about" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors font-bold">ABOUT</a>
                <span className="text-slate-300 dark:text-cyan-700/50">|</span>
                <a href="#skills" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors font-bold">SKILLS</a>
                <span className="text-slate-300 dark:text-cyan-700/50">|</span>
                <a href="#journey" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors font-bold">JOURNEY</a>
                <span className="text-slate-300 dark:text-cyan-700/50">|</span>
                <a href="#portfolio" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors font-bold">PORTFOLIO.</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right hidden lg:flex flex-col items-end opacity-100 text-[11px] leading-relaxed font-bold tracking-widest text-slate-500 dark:text-cyan-300 font-mono">
                <span>BUSINESSMAN</span>
                <span>MECHANICAL ENGINEER</span>
                <span>MATHEMATICIAN</span>
              </div>
              
              {/* Theme Toggle Slider */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative inline-flex items-center justify-between w-[80px] h-[40px] rounded-full bg-slate-200 dark:bg-black border-2 border-slate-300 dark:border-cyan-700/60 transition-colors duration-300 shadow-inner cursor-pointer group shrink-0"
                aria-label="Toggle Light/Dark Mode"
              >
                <div className="absolute inset-0 flex items-center justify-between px-[8px] transition-opacity duration-300">
                  <span className={`text-[20px] z-10 transition-opacity ${isDarkMode ? 'opacity-30' : 'opacity-100'}`}>☀️</span>
                  <span className={`text-[18px] z-10 transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-30'}`}>🌙</span>
                </div>
                <div className={`absolute top-[2px] w-[32px] h-[32px] rounded-full bg-white dark:bg-cyan-400 shadow-md transition-transform duration-300 ease-in-out z-20 ${isDarkMode ? 'translate-x-[42px]' : 'translate-x-[2px]'}`} />
              </button>
            </div>
          </header>

          {/* Left Vertical Social Links */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-8 border-l-2 border-slate-300 dark:border-cyan-500/60 pl-4 pointer-events-auto">
            
            <a href="https://www.instagram.com/__rupanvijay__/" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 dark:text-cyan-500/70 hover:text-blue-600 dark:hover:text-cyan-300 transition-all duration-300 hover:scale-110">
              <div className="absolute w-4 h-[2px] bg-slate-300 dark:bg-cyan-500/60 group-hover:bg-blue-600 dark:group-hover:bg-cyan-300 -left-[18px] top-1/2 transition-colors duration-300" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:group-hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.8)]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/rupan-vijay-978868411/" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 dark:text-cyan-500/70 hover:text-blue-600 dark:hover:text-cyan-300 transition-all duration-300 hover:scale-110">
              <div className="absolute w-4 h-[2px] bg-slate-300 dark:bg-cyan-500/60 group-hover:bg-blue-600 dark:group-hover:bg-cyan-300 -left-[18px] top-1/2 transition-colors duration-300" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:group-hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.8)]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a href="mailto:rupanvijay0526@gmail.com" className="relative group text-slate-400 dark:text-cyan-500/70 hover:text-blue-600 dark:hover:text-cyan-300 transition-all duration-300 hover:scale-110">
              <div className="absolute w-4 h-[2px] bg-slate-300 dark:bg-cyan-500/60 group-hover:bg-blue-600 dark:group-hover:bg-cyan-300 -left-[18px] top-1/2 transition-colors duration-300" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:group-hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.8)]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          {/* Bottom Corner Overlays */}
          <div className="absolute bottom-5 left-8 z-20 text-[11px] font-bold tracking-widest text-slate-600 dark:text-cyan-300 font-mono pointer-events-none leading-relaxed bg-white/80 dark:bg-black/70 backdrop-blur-md p-3 rounded-md border border-slate-200 dark:border-cyan-800/50 shadow-sm dark:shadow-none transition-colors duration-500 hidden md:block">
            BUSINESSMAN<br />
            MECHANICAL ENGINEER<br />
            MATHEMATICIAN
          </div>
          <div className="absolute bottom-5 right-8 z-20 text-[11px] font-bold tracking-widest text-slate-600 dark:text-cyan-300 font-mono pointer-events-none leading-relaxed text-right bg-white/80 dark:bg-black/70 backdrop-blur-md p-3 rounded-md border border-slate-200 dark:border-cyan-800/50 shadow-sm dark:shadow-none transition-colors duration-500 hidden md:block">
            BUSINESSMAN<br />
            MECHANICAL ENGINEER<br />
            MATHEMATICIAN
          </div>

          {/* ── True 3D Orbital System ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-10">
             <div className="relative w-[115vw] max-w-[1600px] h-[45vh]">
                
                 {/* Back Ring (Behind Master Container z-10) */}
                 <div className="absolute inset-0 rounded-[50%] border-[2px] border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,204,0.05)] z-10 opacity-0 dark:opacity-100 transition-opacity duration-1000"></div>
                 
                 {/* Front Ring (In Front of Master Container z-30) - Clipped to bottom half */}
                 <div 
                   className="absolute inset-0 rounded-[50%] border-[2px] border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,204,0.2)] z-30 opacity-0 dark:opacity-100 transition-opacity duration-1000"
                   style={{ clipPath: 'polygon(-20% 50%, 120% 50%, 120% 150%, -20% 150%)' }}
                 ></div>
                 
                 {/* F1 Car - Dynamic Z-Index Interleaving */}
                 <img 
                   src="/assets/car.png" 
                   alt="F1 Wireframe Car" 
                   className="absolute top-0 left-0 w-[450px] md:w-[550px] object-contain mix-blend-screen opacity-0 dark:opacity-100 transition-opacity duration-1000"
                   style={{
                     offsetPath: 'ellipse(50% 50% at 50% 50%)',
                     offsetRotate: 'auto 90deg',
                     animation: 'orbit-path-anim 16s linear infinite, orbit-z-anim 16s linear infinite'
                   }}
                 />
             </div>
          </div>

          {/* ── Master Glassmorphism Container ── */}
          <div className="relative z-20 w-[90%] max-w-6xl bg-white/90 dark:bg-[#141928]/40 backdrop-blur-[12px] border border-slate-200 dark:border-cyan-500/30 rounded-[20px] shadow-2xl dark:shadow-[0_0_80px_rgba(0,255,204,0.15)] flex flex-col md:flex-row items-stretch transition-colors duration-500 pointer-events-auto mt-10">
            
            {/* Left Column (Typography & UI) */}
            <div className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center z-10">
                <div className="text-xs font-extrabold text-blue-600 dark:text-cyan-300 tracking-[0.2em] mb-4 uppercase drop-shadow-sm">MODE: INITIALIZE</div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight drop-shadow-sm dark:drop-shadow-lg">M. Rupan Vijay</h1>
                <h2 className="text-lg md:text-xl font-bold text-slate-600 dark:text-gray-100 mb-6 tracking-wide drop-shadow-none dark:drop-shadow-sm">B Tech Mechanical Engineering — VIT Chennai</h2>
                <p className="text-base font-semibold text-slate-500 dark:text-slate-400 italic border-l-4 border-blue-500 dark:border-cyan-500 pl-5 mb-10 leading-relaxed">
                  &quot;Education is the premise of progress.&quot;
                </p>
                <div className="flex gap-5 flex-wrap">
                  <button className="magnetic-el text-sm font-bold py-4 px-8 bg-blue-600 dark:bg-cyan-500 text-white dark:text-black border border-transparent rounded-lg transition-colors shadow-lg hover:bg-blue-700 dark:hover:bg-cyan-400 dark:hover:shadow-[0_0_20px_rgba(0,255,204,0.6)] uppercase tracking-widest">More About Me</button>
                  <button className="magnetic-el text-sm font-bold py-4 px-8 bg-transparent text-slate-900 dark:text-white border-2 border-slate-400 dark:border-white hover:border-blue-600 dark:hover:border-cyan-300 rounded-lg transition-colors shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-cyan-300 uppercase tracking-widest">Download Resume</button>
                </div>
            </div>

            {/* Right Column (The Portrait) */}
            <div className="w-full md:w-2/5 relative min-h-[400px] flex items-end justify-center rounded-r-[20px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-50/50 dark:to-cyan-900/10 z-0"></div>
              <img
                src="/assets/portrait.png"
                alt="M. Rupan Vijay Portrait"
                className="relative z-10 w-[120%] max-w-none md:w-[130%] h-auto object-contain float-anim pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  filter: 'drop-shadow(0 0 25px rgba(0,255,204,0.3)) drop-shadow(0 0 50px rgba(0,200,255,0.1))',
                  marginBottom: '-5%',
                  marginRight: '-5%'
                }}
              />
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════
            ABOUT SECTION
        ══════════════════════════════════════════ */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t-2 border-slate-200 dark:border-cyan-900/60 relative" id="about">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-fade crop-marks p-3 border-2 border-slate-200 dark:border-cyan-600/50 bg-white/90 dark:bg-[#030811]/95 backdrop-blur-3xl visible overflow-hidden rounded-xl shadow-lg dark:shadow-[0_0_40px_rgba(0,255,204,0.15)] transition-colors duration-500">
              <img alt="M. Rupan Vijay" className="w-full h-auto contrast-125 transition-transform duration-500 scale-125 origin-center rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4vPXAHKIa92uKuDvF9PlBP5RY0Y4qOVs5jjMSzvNM1wK1fout1lPRUtcjxFnbNEtJHgUXkKyvCRHo0Uv0CgUn4dY-5BWUa6E8dV-CnmO_jqL9U_hVi63SxuaHnWdIvUJaQUBp1hxA7D7nN4A15iYDSFiHWdNt06kUHkQRNqJSnK3TTqhXEcq7Pb2ymwfW0gkOqp-YILQZToAj3c9ZAVEtPT4IwRIaL_t6JDHviXRlbTDpqHtF2y3Wj7gGwnvvGIUEVQ82ve3sGP5S" />
            </div>
            <div className="scroll-fade visible bg-slate-50/90 dark:bg-[#030811]/95 backdrop-blur-3xl border border-slate-200 dark:border-cyan-600/40 p-10 rounded-2xl shadow-xl dark:shadow-[0_0_50px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <h2 className="font-headline-md text-4xl font-bold mb-6 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md tracking-wide">SPECIFICATIONS</h2>
              <p className="font-body-md text-lg font-semibold mb-8 text-slate-700 dark:text-white leading-relaxed">
                Dedicated Mechanical Engineering student with a strong foundation in computational tools and technical documentation. Driven by a precise approach to problem-solving and a commitment to continuous learning in both traditional engineering principles and modern software applications.
              </p>
              <ul className="space-y-4 mb-10 font-label-mono text-sm font-bold text-slate-800 dark:text-white">
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">NAME</span> <span>M. Rupan Vijay</span></li>
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">MAJOR</span> <span>Mechanical Engineering</span></li>
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">INSTITUTE</span> <span>VIT Chennai</span></li>
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">CGPA</span> <span>9.02</span></li>
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">HIGHLIGHT</span> <span>University Rank Holder</span></li>
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">DOB</span> <span>April 5, 2007</span></li>
                <li className="flex border-b border-slate-200 dark:border-cyan-700/60 pb-3"><span className="w-32 text-blue-600 dark:text-cyan-300 drop-shadow-sm">MINORS</span> <span>Full Stack Development, Business Enthusiast</span></li>
              </ul>
              <div className="flex gap-4">
                <a className="magnetic-el px-8 py-4 bg-blue-600 dark:bg-cyan-600 shadow-md dark:shadow-[0_0_25px_rgba(0,255,204,0.6)] text-white font-label-mono text-sm font-extrabold uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-white dark:hover:text-cyan-900 transition-colors rounded" href="#contact">Get In Touch</a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SKILLS SECTION
        ══════════════════════════════════════════ */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t-2 border-slate-200 dark:border-cyan-900/60 bg-transparent visible" id="skills">
          <div className="bg-white/90 dark:bg-[#030811]/95 backdrop-blur-3xl border border-slate-200 dark:border-cyan-700/60 rounded-3xl p-12 max-w-4xl mx-auto shadow-xl dark:shadow-[0_0_60px_rgba(0,255,204,0.1)] transition-colors duration-500">
            <h2 className="font-headline-md text-3xl font-extrabold mb-12 text-center scroll-fade visible text-slate-900 dark:text-white tracking-widest drop-shadow-sm dark:drop-shadow-lg">Engineering &amp; Computational Toolkit</h2>
            <div className="space-y-10 scroll-fade visible">
              {[
                { name: 'SolidWorks', val: 80 },
                { name: 'MATLAB', val: 75 },
                { name: 'AutoCAD', val: 85 },
                { name: 'Python', val: 70 },
                { name: 'Java', val: 65 },
                { name: 'LTspice', val: 75 },
              ].map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between font-label-mono text-base font-bold text-slate-900 dark:text-white mb-3 tracking-wide drop-shadow-sm dark:drop-shadow-md">
                    <span>{skill.name}</span>
                    <span className="skill-counter text-blue-600 dark:text-cyan-300" data-target={skill.val}>0%</span>
                  </div>
                  <div className="h-5 border-2 border-slate-300 dark:border-cyan-800/80 p-[2px] w-full bg-slate-100 dark:bg-[#0a1128] rounded-md shadow-inner transition-colors duration-500">
                    <div className={`h-full bg-blue-500 dark:bg-cyan-400 shadow-sm dark:shadow-[0_0_20px_rgba(0,255,204,0.8)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] skill-bar delay-[${i*100}ms]`} data-width={`${skill.val}%`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y-2 border-slate-200 dark:border-cyan-900/60 bg-slate-50/90 dark:bg-[#030811]/95 backdrop-blur-3xl shadow-sm dark:shadow-[0_0_40px_rgba(0,255,204,0.05)] transition-colors duration-500">
          <div className="max-w-screen-2xl mx-auto px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-8 text-center scroll-fade visible">
            <div className="bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-cyan-800/50 rounded-2xl p-8 shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <div className="font-headline-lg text-5xl font-extrabold text-blue-600 dark:text-cyan-300 mb-3 visible counter drop-shadow-sm dark:drop-shadow-lg" data-decimals="2" data-target="9.02">9.02</div>
              <div className="font-label-mono-sm text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white">Current CGPA</div>
            </div>
            <div className="bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-cyan-800/50 rounded-2xl p-8 shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <div className="font-headline-lg text-5xl font-extrabold text-blue-600 dark:text-cyan-300 mb-3 drop-shadow-sm dark:drop-shadow-lg"><span className="visible counter" data-decimals="0" data-target="90">90</span>%<span className="text-4xl">+</span></div>
              <div className="font-label-mono-sm text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white">Board Exams</div>
            </div>
            <div className="bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-cyan-800/50 rounded-2xl p-8 shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <div className="font-headline-lg text-5xl font-extrabold text-blue-600 dark:text-cyan-300 mb-3 visible counter drop-shadow-sm dark:drop-shadow-lg" data-decimals="1" data-target="91.7">91.7</div>
              <div className="font-label-mono-sm text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white">JEE Percentile</div>
            </div>
            <div className="bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-cyan-800/50 rounded-2xl p-8 shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <div className="font-headline-lg text-5xl font-extrabold text-blue-600 dark:text-cyan-300 mb-3 visible counter drop-shadow-sm dark:drop-shadow-lg" data-decimals="0" data-target="2">2</div>
              <div className="font-label-mono-sm text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white">Year B.Tech</div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            JOURNEY SECTION
        ══════════════════════════════════════════ */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto bg-transparent relative" id="journey">
          <div className="bg-white/90 dark:bg-[#030811]/95 backdrop-blur-3xl border border-slate-200 dark:border-cyan-800/50 rounded-3xl p-12 shadow-xl dark:shadow-[0_0_60px_rgba(0,255,204,0.1)] max-w-5xl mx-auto transition-colors duration-500">
            <h2 className="font-headline-md text-4xl font-extrabold mb-16 text-center text-slate-900 dark:text-white tracking-widest drop-shadow-sm dark:drop-shadow-md scroll-fade visible">TIMELINE &amp; ACHIEVEMENTS</h2>
            <div className="relative max-w-3xl mx-auto pl-10 space-y-16 timeline-container">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-cyan-900/50"></div>
              <div className="absolute left-0 top-0 w-[2px] bg-blue-500 dark:bg-cyan-400 timeline-line shadow-sm dark:shadow-[0_0_20px_rgba(0,255,204,0.8)] transition-colors duration-500" style={{ height: '0%' }}></div>
              {[
                { years: '2025 - 2029', title: 'VIT Chennai', desc: 'B.Tech Mechanical Engineering. Current CGPA: 9.02' },
                { years: '2018 - 2024', title: 'CS Academy', desc: 'Foundation and Schooling. Strong foundational education setting the premise for engineering.' },
                { years: '2015 - 2017', title: 'Royal International School', desc: 'Primary and Middle School education.' },
                { years: '2011 - 2014', title: 'SSM Central School', desc: 'Early Schooling years.' },
                { years: '2009 - 2010', title: 'Euro Kids', desc: 'Pre-School: The foundational start of the educational journey.' },
              ].map(item => (
                <div key={item.title} className="relative timeline-item">
                  <div className="absolute w-5 h-5 bg-blue-500 dark:bg-cyan-400 shadow-md dark:shadow-[0_0_20px_rgba(0,255,204,1)] -left-[49.5px] top-2 timeline-dot rounded-full transition-colors duration-500"></div>
                  <div className="timeline-content bg-slate-50/90 dark:bg-black/70 backdrop-blur-xl border border-slate-200 dark:border-cyan-600/50 p-8 rounded-2xl shadow-lg dark:shadow-xl transition-colors duration-500">
                    <div className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 mb-2 drop-shadow-sm dark:drop-shadow-md tracking-wider">{item.years}</div>
                    <h3 className="font-headline-md text-3xl font-extrabold mb-3 text-slate-900 dark:text-white drop-shadow-sm">{item.title}</h3>
                    <p className="font-body-md text-lg font-semibold text-slate-700 dark:text-white leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extracurriculars & Languages */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t-2 border-slate-200 dark:border-cyan-900/60 bg-slate-50/90 dark:bg-[#030811]/95 backdrop-blur-3xl border-b-2 border-slate-200 dark:border-cyan-900/60 shadow-sm dark:shadow-[0_0_50px_rgba(0,255,204,0.05)] transition-colors duration-500">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="scroll-fade visible bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-cyan-800/50 p-10 rounded-3xl shadow-lg dark:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <h2 className="font-headline-md text-3xl font-bold mb-10 text-slate-900 dark:text-white tracking-widest drop-shadow-sm dark:drop-shadow-md">SPORTS &amp; EXTRACURRICULARS</h2>
              <ul className="space-y-6 font-body-md text-xl font-bold text-slate-800 dark:text-white list-none">
                <li className="flex items-center gap-5 border-b border-slate-200 dark:border-cyan-800/60 pb-5"><span className="material-symbols-outlined text-blue-600 dark:text-cyan-400 text-3xl drop-shadow-sm dark:drop-shadow-lg">workspace_premium</span> Grandmaster in SIP abacus</li>
                <li className="flex items-center gap-5 border-b border-slate-200 dark:border-cyan-800/60 pb-5"><span className="material-symbols-outlined text-blue-600 dark:text-cyan-400 text-3xl drop-shadow-sm dark:drop-shadow-lg">storefront</span> Entrepreneur in Baujii Handlooms</li>
                <li className="flex items-center gap-5 border-b border-slate-200 dark:border-cyan-800/60 pb-5"><span className="material-symbols-outlined text-blue-600 dark:text-cyan-400 text-3xl drop-shadow-sm dark:drop-shadow-lg">self_improvement</span> Yoga State Level</li>
                <li className="flex items-center gap-5 border-b border-slate-200 dark:border-cyan-800/60 pb-5"><span className="material-symbols-outlined text-blue-600 dark:text-cyan-400 text-3xl drop-shadow-sm dark:drop-shadow-lg">sports_volleyball</span> Volleyball State Level</li>
              </ul>
            </div>
            <div className="scroll-fade bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-cyan-800/50 p-10 rounded-3xl visible shadow-lg dark:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-colors duration-500">
              <h2 className="font-headline-md text-3xl font-bold mb-10 text-slate-900 dark:text-white tracking-widest drop-shadow-sm dark:drop-shadow-md">LANGUAGES KNOWN</h2>
              <div className="grid grid-cols-2 gap-6 font-body-md text-lg font-bold text-slate-800 dark:text-white">
                {[{level:'NATIVE',lang:'Tamil'},{level:'PROFICIENT',lang:'English'},{level:'INTERMEDIATE',lang:'Hindi'},{level:'BASIC',lang:'German'}].map(l=>(
                  <div key={l.lang} className="p-6 border border-slate-200 dark:border-cyan-600/60 bg-slate-50/90 dark:bg-[#030811]/90 rounded-2xl shadow-md dark:shadow-[0_0_20px_rgba(0,255,204,0.15)] flex flex-col items-center justify-center text-center transition-colors duration-500">
                    <div className="font-label-mono-sm text-xs font-extrabold text-blue-600 dark:text-cyan-300 mb-3 tracking-widest drop-shadow-sm dark:drop-shadow-md">{l.level}</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{l.lang}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CERTIFICATIONS SECTION
        ══════════════════════════════════════════ */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto bg-transparent relative" id="certifications">
          <div className="bg-white/90 dark:bg-[#030811]/95 backdrop-blur-3xl border border-slate-200 dark:border-cyan-800/50 rounded-3xl p-12 shadow-xl dark:shadow-[0_0_60px_rgba(0,255,204,0.1)] transition-colors duration-500">
            <div className="scroll-fade visible text-center max-w-3xl mx-auto mb-16">
              <p className="font-label-mono-sm text-sm font-extrabold tracking-widest mb-4 text-blue-600 dark:text-cyan-300 drop-shadow-sm dark:drop-shadow-md">Sheet 06 / 07 — Certifications</p>
              <h2 className="font-headline-md text-5xl font-extrabold mb-8 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg">Certifications &amp; Honours</h2>
              <p className="font-body-md text-xl font-medium text-slate-700 dark:text-white leading-relaxed">A selection of my professional credentials and academic recognitions. Documented achievements confirming technical and personal proficiency.</p>
            </div>
            
            <div className="flex justify-center mb-12">
              <div key={certificationsData[0].alt} className="max-w-2xl w-full border-2 border-slate-200 dark:border-cyan-700/70 bg-slate-50/90 dark:bg-black/70 backdrop-blur-xl p-6 rounded-3xl group overflow-hidden shadow-lg dark:shadow-[0_0_40px_rgba(0,255,204,0.2)] transition-colors duration-500">
                <div className={`aspect-[${certificationsData[0].aspect}] overflow-hidden border border-slate-300 dark:border-cyan-800/60 bg-black rounded-2xl`}>
                  <img alt={certificationsData[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={certificationsData[0].src} />
                </div>
                <p className="font-label-mono text-lg font-extrabold mt-6 text-center uppercase tracking-widest text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">{certificationsData[0].alt}</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <button onClick={() => setIsCertModalOpen(true)} className="magnetic-el px-8 py-4 border-2 border-blue-500 dark:border-cyan-400 font-label-mono text-sm font-extrabold uppercase tracking-widest transition-all duration-300 bg-transparent hover:bg-blue-50 dark:hover:bg-cyan-500/20 text-blue-700 dark:text-white rounded-xl shadow-sm dark:shadow-[0_0_20px_rgba(0,255,204,0.2)]">
                View All Certificates
              </button>
              <a className="magnetic-el px-10 py-5 border-2 border-blue-600 dark:border-cyan-500 font-label-mono text-sm font-extrabold uppercase tracking-widest transition-all duration-300 bg-blue-600 dark:bg-cyan-900/40 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white rounded-xl shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.4)] hover:shadow-lg dark:hover:shadow-[0_0_50px_rgba(0,255,204,0.7)]" href="#portfolio">
                View Project Archive <span className="icon-shift inline-block ml-3 text-xl font-bold">→</span>
              </a>
            </div>
            
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECT ARCHIVE
        ══════════════════════════════════════════ */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t-2 border-slate-200 dark:border-cyan-900/60 bg-slate-50/90 dark:bg-[#030811]/95 backdrop-blur-3xl shadow-sm dark:shadow-[0_0_60px_rgba(0,255,204,0.1)] border-b-2 border-slate-200 dark:border-cyan-900/60 transition-colors duration-500" id="portfolio">
          <h2 className="font-headline-md text-4xl font-extrabold mb-16 text-center text-slate-900 dark:text-white tracking-widest drop-shadow-sm dark:drop-shadow-lg scroll-fade visible">PROJECT ARCHIVE</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 scroll-fade visible">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className="border-2 border-slate-200 dark:border-cyan-700/60 bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl group overflow-hidden project-card-reveal relative cursor-pointer hover:border-blue-400 dark:hover:border-cyan-400 transition-all duration-300 shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.15)] hover:shadow-xl dark:hover:shadow-[0_0_50px_rgba(0,255,204,0.4)]"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-56 border-b-2 border-slate-200 dark:border-cyan-800/60 relative overflow-hidden transition-colors duration-500">
                  <img alt={project.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" src={project.image} />
                  {project.team && (
                    <div className="absolute top-4 right-4 bg-blue-600 dark:bg-cyan-600 shadow-md dark:shadow-[0_0_20px_rgba(0,255,204,0.8)] text-white px-3 py-1 font-label-mono-sm text-xs font-extrabold uppercase tracking-widest rounded-md">TEAM</div>
                  )}
                </div>
                <div className="p-8 relative flex flex-col h-[calc(100%-14rem)] bg-gradient-to-b from-transparent to-slate-50 dark:to-[#030811]/90 transition-colors duration-500">
                  <div className="font-label-mono-sm text-xs font-extrabold text-blue-600 dark:text-cyan-300 mb-3 tracking-widest drop-shadow-sm dark:drop-shadow-md">{project.id}</div>
                  <h3 className="font-headline-md text-2xl font-bold mb-4 text-slate-900 dark:text-white leading-tight drop-shadow-none dark:drop-shadow-sm">{project.title}</h3>
                  <p className="font-label-mono text-sm font-bold text-slate-600 dark:text-cyan-200 mb-6 drop-shadow-none dark:drop-shadow-sm">{project.subtitle}</p>
                  {project.team && (
                    <div className="mt-auto pt-5 border-t border-slate-200 dark:border-cyan-800/60 flex items-center gap-3 font-label-mono-sm text-sm font-bold text-slate-700 dark:text-white uppercase tracking-widest transition-colors duration-500">
                      <span className="material-symbols-outlined text-2xl text-blue-500 dark:text-cyan-400 drop-shadow-sm dark:drop-shadow-md">groups</span>
                      <span>{project.team}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTACT SECTION
        ══════════════════════════════════════════ */}
        <section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto bg-transparent relative" id="contact">
          <div className="bg-white/90 dark:bg-[#030811]/95 backdrop-blur-3xl border border-slate-200 dark:border-cyan-800/50 rounded-3xl p-10 md:p-16 shadow-xl dark:shadow-[0_0_60px_rgba(0,255,204,0.15)] max-w-6xl mx-auto transition-colors duration-500">
            <div className="grid md:grid-cols-2 gap-16 scroll-fade visible">
              <div className="bg-slate-50/90 dark:bg-black/60 border border-slate-200 dark:border-cyan-700/50 p-10 rounded-2xl shadow-lg dark:shadow-[0_0_40px_rgba(0,255,204,0.1)] transition-colors duration-500">
                <h2 className="font-headline-md text-3xl font-extrabold mb-10 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg tracking-wider">INITIATE CONTACT</h2>
                <form className="space-y-8">
                  <div>
                    <label className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 block mb-3 tracking-widest drop-shadow-sm dark:drop-shadow-md">NAME</label>
                    <input className="w-full input-underline text-slate-900 dark:text-white py-3 font-body-md text-lg font-bold border-slate-300 dark:border-cyan-600/50 focus:border-blue-500 dark:focus:border-cyan-300 transition-colors bg-white/50 dark:bg-black/40 px-4 rounded-t-md" placeholder="Enter full name" type="text" />
                  </div>
                  <div>
                    <label className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 block mb-3 tracking-widest drop-shadow-sm dark:drop-shadow-md">EMAIL</label>
                    <input className="w-full input-underline text-slate-900 dark:text-white py-3 font-body-md text-lg font-bold border-slate-300 dark:border-cyan-600/50 focus:border-blue-500 dark:focus:border-cyan-300 transition-colors bg-white/50 dark:bg-black/40 px-4 rounded-t-md" placeholder="address@domain.com" type="email" />
                  </div>
                  <div>
                    <label className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 block mb-3 tracking-widest drop-shadow-sm dark:drop-shadow-md">SUBJECT</label>
                    <input className="w-full input-underline text-slate-900 dark:text-white py-3 font-body-md text-lg font-bold border-slate-300 dark:border-cyan-600/50 focus:border-blue-500 dark:focus:border-cyan-300 transition-colors bg-white/50 dark:bg-black/40 px-4 rounded-t-md" placeholder="Inquiry topic" type="text" />
                  </div>
                  <div>
                    <label className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 block mb-3 tracking-widest drop-shadow-sm dark:drop-shadow-md">MESSAGE</label>
                    <textarea className="w-full input-underline text-slate-900 dark:text-white py-3 font-body-md text-lg font-bold border-slate-300 dark:border-cyan-600/50 focus:border-blue-500 dark:focus:border-cyan-300 transition-colors h-32 resize-none bg-white/50 dark:bg-black/40 px-4 rounded-t-md" placeholder="Transmit message..."></textarea>
                  </div>
                  <button className="magnetic-el px-8 py-5 bg-blue-600 dark:bg-cyan-600 shadow-md dark:shadow-[0_0_30px_rgba(0,255,204,0.6)] text-white font-label-mono text-base font-extrabold uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-white dark:hover:text-cyan-900 transition-colors w-full rounded-lg" type="button">
                    SEND TRANSMISSION
                  </button>
                </form>
              </div>
              <div className="border border-slate-200 dark:border-cyan-700/50 bg-slate-50/90 dark:bg-black/60 p-10 rounded-2xl flex flex-col justify-center space-y-14 shadow-lg dark:shadow-[0_0_40px_rgba(0,255,204,0.1)] transition-colors duration-500">
                <div>
                  <div className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 mb-4 tracking-widest drop-shadow-sm dark:drop-shadow-md">PHONE_LINK</div>
                  <a className="font-headline-md text-4xl font-extrabold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-cyan-300 transition-colors block drop-shadow-sm dark:drop-shadow-lg" href="tel:+918925887050">+91 89258 87050</a>
                </div>
                <div>
                  <div className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 mb-4 tracking-widest drop-shadow-sm dark:drop-shadow-md">EMAIL_LINK</div>
                  <a className="font-headline-md text-4xl font-extrabold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-cyan-300 transition-colors block break-all drop-shadow-sm dark:drop-shadow-lg" href="mailto:rupanvijay0526@gmail.com">rupanvijay0526@gmail.com</a>
                </div>
                <div>
                  <div className="font-label-mono-sm text-sm font-bold text-blue-600 dark:text-cyan-300 mb-4 tracking-widest drop-shadow-sm dark:drop-shadow-md">SOCIAL_LINK</div>
                  <a className="font-headline-md text-4xl font-extrabold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-cyan-300 transition-colors block drop-shadow-sm dark:drop-shadow-lg" href="#">@__rupanvijay__</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100/90 dark:bg-black/90 backdrop-blur-2xl border-t-2 border-slate-300 dark:border-cyan-600/80 flex flex-col md:flex-row justify-between items-center py-12 px-margin-desktop w-full z-10 relative transition-colors duration-500">
        <div className="font-label-mono text-base font-bold text-slate-800 dark:text-white mb-6 md:mb-0 tracking-widest drop-shadow-sm dark:drop-shadow-md">
          © 2024 M. RUPAN VIJAY | MECHANICAL ENGINEERING
        </div>
        <div className="flex space-x-10 font-label-mono-sm text-sm font-extrabold tracking-widest">
          <a className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-cyan-300 hover:scale-110 transition-all duration-300 drop-shadow-sm dark:drop-shadow-md" href="#">INSTAGRAM</a>
          <a className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-cyan-300 hover:scale-110 transition-all duration-300 drop-shadow-sm dark:drop-shadow-md" href="#">LINKEDIN</a>
          <a className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-cyan-300 hover:scale-110 transition-all duration-300 drop-shadow-sm dark:drop-shadow-md" href="#">GITHUB</a>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-3xl transition-opacity duration-300" onClick={() => setSelectedProject(null)}></div>
          <div className="relative w-full max-w-6xl h-[85vh] bg-white/95 dark:bg-[#030811]/95 border-2 border-slate-200 dark:border-cyan-600/80 rounded-3xl flex flex-col md:flex-row shadow-2xl dark:shadow-[0_0_80px_rgba(0,255,204,0.4)] animate-modal-pop overflow-hidden transition-colors duration-500">
            <button
              onClick={() => setSelectedProject(null)}
              className="magnetic-el absolute top-6 right-6 z-10 font-label-mono text-base font-bold tracking-widest bg-slate-200 dark:bg-cyan-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl hover:bg-slate-300 dark:hover:bg-cyan-400 dark:hover:text-black transition-colors flex items-center gap-3 shadow-md dark:shadow-[0_0_20px_rgba(0,255,204,0.6)]"
            >
              <span className="material-symbols-outlined text-xl font-bold">close</span> TERMINATE
            </button>
            <div className="w-full md:w-[45%] h-64 md:h-full bg-slate-100 dark:bg-black/60 border-b md:border-b-0 md:border-r border-slate-200 dark:border-cyan-700/60 relative transition-colors duration-500">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/95 dark:to-[#030811]/95 md:block hidden pointer-events-none transition-colors duration-500"></div>
            </div>
            <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col overflow-y-auto bg-transparent relative">
              <div className="font-label-mono-sm text-sm font-extrabold text-blue-600 dark:text-cyan-300 mb-6 tracking-widest drop-shadow-sm dark:drop-shadow-md">{selectedProject.id} // SECURE_ARCHIVE</div>
              <h2 className="font-headline-lg text-5xl font-extrabold text-slate-900 dark:text-white mb-6 pr-32 leading-tight drop-shadow-sm dark:drop-shadow-lg">{selectedProject.title}</h2>
              <h3 className="font-label-mono text-xl font-bold text-blue-700 dark:text-cyan-300 mb-10 border-l-4 border-blue-500 dark:border-cyan-400 pl-5 tracking-wide drop-shadow-none dark:drop-shadow-sm">{selectedProject.subtitle}</h3>
              <div className="font-body-lg text-xl font-semibold text-slate-700 dark:text-white leading-relaxed mb-10 flex-grow drop-shadow-none dark:drop-shadow-sm">{selectedProject.description}</div>
              {selectedProject.team && (
                <div className="mt-auto pt-8 border-t-2 border-slate-200 dark:border-cyan-800/60 flex items-center gap-4 font-label-mono text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest transition-colors duration-500">
                  <span className="material-symbols-outlined text-4xl text-blue-500 dark:text-cyan-400 drop-shadow-sm dark:drop-shadow-md">groups</span> {selectedProject.team}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certifications Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-3xl transition-opacity duration-300" onClick={() => setIsCertModalOpen(false)}></div>
          <div className="relative w-full max-w-7xl h-[90vh] bg-white/95 dark:bg-[#030811]/95 border-2 border-slate-200 dark:border-cyan-600/80 rounded-3xl flex flex-col shadow-2xl dark:shadow-[0_0_80px_rgba(0,255,204,0.4)] animate-modal-pop overflow-hidden transition-colors duration-500">
            <div className="flex justify-between items-center p-8 border-b-2 border-slate-200 dark:border-cyan-800/60 bg-slate-50/90 dark:bg-black/60 relative z-10 transition-colors duration-500">
              <h2 className="font-headline-md text-3xl font-extrabold text-slate-900 dark:text-white tracking-widest drop-shadow-sm dark:drop-shadow-md">CERTIFICATION ARCHIVE</h2>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="magnetic-el font-label-mono text-sm font-bold tracking-widest bg-slate-200 dark:bg-cyan-700 text-slate-900 dark:text-white px-5 py-3 rounded-xl hover:bg-slate-300 dark:hover:bg-cyan-400 dark:hover:text-black transition-colors flex items-center gap-2 shadow-md dark:shadow-[0_0_20px_rgba(0,255,204,0.6)]"
              >
                <span className="material-symbols-outlined text-lg font-bold">close</span> CLOSE
              </button>
            </div>
            <div className="p-10 overflow-y-auto flex-grow relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {certificationsData.map(cert => (
                  <div key={cert.alt} className="border-2 border-slate-200 dark:border-cyan-700/70 bg-slate-50/80 dark:bg-black/70 backdrop-blur-xl p-4 rounded-2xl group overflow-hidden shadow-lg dark:shadow-[0_0_25px_rgba(0,255,204,0.15)] transition-colors duration-500">
                    <div className={`aspect-[${cert.aspect}] overflow-hidden border border-slate-300 dark:border-cyan-800/60 bg-black rounded-xl`}>
                      <img alt={cert.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={cert.src} />
                    </div>
                    <p className="font-label-mono text-sm font-extrabold mt-5 text-center uppercase tracking-widest text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">{cert.alt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
