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

export default function Home() {
  const [heroPhase, setHeroPhase] = useState(0); 
  const [typedName, setTypedName] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  useEffect(() => {
    const phase1Timer = setTimeout(() => {
      setHeroPhase(1);
    }, 1500);
    return () => clearTimeout(phase1Timer);
  }, []);

  useEffect(() => {
    if (heroPhase === 1) {
      const fullName = "M. Rupan Vijay";
      let i = 0;
      const typeDuration = 800;
      const intervalTime = typeDuration / fullName.length;
      const typeInterval = setInterval(() => {
        setTypedName(fullName.slice(0, i + 1));
        i++;
        if (i === fullName.length) {
          clearInterval(typeInterval);
          setTimeout(() => setHeroPhase(2), 100); 
        }
      }, intervalTime);
      return () => clearInterval(typeInterval);
    } else if (heroPhase === 2) {
      setTypedName("M. Rupan Vijay");
    }
  }, [heroPhase]);

  useEffect(() => {
    // Scroll animations & Skill Bars
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bars if in section
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const el = bar as HTMLElement;
                    el.style.width = el.getAttribute('data-width') || '0%';
                });

                // Trigger counters
                const counters = entry.target.querySelectorAll('.counter, .skill-counter');
                counters.forEach(counter => {
                    const el = counter as HTMLElement;
                    const targetAttr = el.getAttribute('data-target');
                    const target = targetAttr ? parseFloat(targetAttr) : 0;
                    const decimalsAttr = el.getAttribute('data-decimals');
                    const decimals = decimalsAttr ? parseInt(decimalsAttr) : 0;
                    const isSkill = el.classList.contains('skill-counter');
                    const duration = isSkill ? 1200 : 2000;
                    const stepTime = isSkill ? 20 : 50;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const updateCounter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(updateCounter);
                        }
                        if (isSkill) {
                            el.textContent = current.toFixed(0) + '%';
                        } else {
                            if (el.textContent !== current.toFixed(decimals)) {
                              el.textContent = current.toFixed(decimals);
                            }
                        }
                    }, stepTime);
                    el.classList.remove('counter'); // Prevent re-trigger
                    el.classList.remove('skill-counter');
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade, #skills, .counter, .project-card-reveal, .timeline-item').forEach((el) => {
        observer.observe(el);
    });

    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
          html.classList.toggle('dark');
          html.classList.toggle('light');
          const isDark = html.classList.contains('dark');
          if (themeIcon) themeIcon.textContent = isDark ? 'dark_mode' : 'light_mode';
          if (themeText) themeText.textContent = isDark ? 'MODE_02: BLUEPRINT' : 'MODE_01: WHITEPRINT';
      });
    }

    const magneticElements = document.querySelectorAll('.magnetic-el');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = (mouseEvent.clientX - centerX) / rect.width;
            const distY = (mouseEvent.clientY - centerY) / rect.height;
            const moveX = distX * 12; 
            const moveY = distY * 12;
            (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        el.addEventListener('mouseleave', () => {
            (el as HTMLElement).style.transform = `translate(0px, 0px)`;
        });
    });

    const handleScroll = () => {
        const container = document.querySelector('.timeline-container');
        const line = document.querySelector('.timeline-line');
        if (!container || !line) return;
        const rect = container.getBoundingClientRect();
        const startOffset = window.innerHeight * 0.75;
        let progress = (startOffset - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));
        (line as HTMLElement).style.height = `${progress * 100}%`;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-transparent text-white font-body-md transition-colors duration-300  min-h-screen flex flex-col relative">
      
{/* Navigation */}

<main className="flex-grow pt-16">
{/* Hero Section */}

      {/* Background Layer */}
      <div className="cosmic-bg"></div>

      {/* Hero Section */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12">
        
        {/* Top Header */}
        <header className="flex justify-between items-start text-xs md:text-sm tracking-widest text-gray-300 font-light w-full">
          <div className="flex gap-4 items-center">
            <span className="font-bold text-white tracking-normal">M. RUPAN VIJAY.</span>
            <nav className="flex gap-4 opacity-80">
              <a href="#" className="hover:text-cyan-400 transition-colors pointer-events-auto">HOME</a> <span className="opacity-30">|</span>
              <a href="#" className="hover:text-cyan-400 transition-colors pointer-events-auto">ABOUT</a> <span className="opacity-30">|</span>
              <a href="#" className="hover:text-cyan-400 transition-colors pointer-events-auto">SKILLS</a> <span className="opacity-30">|</span>
              <a href="#" className="hover:text-cyan-400 transition-colors pointer-events-auto">JOURNEY</a> <span className="opacity-30">|</span>
              <a href="#" className="hover:text-cyan-400 transition-colors pointer-events-auto">PORTFOLIO</a>
            </nav>
          </div>
          <div className="text-right flex flex-col items-end opacity-70 text-[10px]">
            <div>SLOW REVOLUTION:</div>
            <div>[P1 CAR: 1.8 RPM]</div>
            <div>[PORTRAIT: 1.2 RPM]</div>
            <div className="mt-4 border-b border-gray-600 pb-1">TECHNICAL TELEMETRY</div>
          </div>
        </header>

        {/* Left Side Vertical Telemetry */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-16 text-[10px] text-gray-400 border-l border-gray-700/50 pl-4">
           <div className="relative">
             <div className="absolute w-2 h-[1px] bg-cyan-500/50 -left-[17px] top-1/2"></div>
             28.5 B/V
           </div>
           <div className="relative">
             <div className="absolute w-2 h-[1px] bg-cyan-500/50 -left-[17px] top-1/2"></div>
             200 P/M
           </div>
           <div className="relative">
             <div className="absolute w-2 h-[1px] bg-cyan-500/50 -left-[17px] top-1/2"></div>
             0.33 M
           </div>
           <div className="relative">
             <div className="absolute w-2 h-[1px] bg-cyan-500/50 -left-[17px] top-1/2"></div>
             8 PPM
           </div>
        </div>

        {/* Bottom Corner Overlays */}
        <div className="flex justify-between items-end w-full pb-2">
          <div className="text-[10px] tracking-widest text-gray-400 opacity-60 ml-6 md:ml-12">
            SUBIN REVOLUTION:<br />
            [F1 CAN: 1.6 NPM]<br />
            [PORTRAIT: 1.2 NRM]
          </div>
          <div className="text-right text-[10px] tracking-widest text-gray-400 flex items-center justify-end gap-3 opacity-80">
            <div className="flex flex-col items-end leading-tight">
              <span>BACKGROUND</span>
              <span>MOTION</span>
              <span>TELEMETRY: <span className="text-white">ACTIVE</span></span>
            </div>
            <div className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center relative mr-2">
               <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
               <div className="absolute inset-[-4px] border border-cyan-500/10 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3D Composition Area */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        
        {/* Horizontal Telemetry Line passing through */}
        <div className="telemetry-line top-[65%]"></div>

        {/* Central Models Container */}
        <div className="relative w-full max-w-[1600px] h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
           
           {/* LEFT SIDE: Biometric Portrait & Card */}
           <div className="relative w-full md:w-[45%] h-[50%] md:h-[80%] flex items-center justify-center mt-10 md:mt-20">
              
              {/* Orbital Rings behind portrait */}
              <div className="absolute w-[70%] aspect-square flex items-center justify-center pointer-events-none">
                 <div className="orbital-ring orbital-ring-1"></div>
                 <div className="target-grid w-[90%] h-[90%]"></div>
              </div>

              {/* Holographic Portrait */}
              <img 
                src="/assets/portrait.png" 
                alt="Biometric Portrait" 
                className="relative z-10 w-[70%] h-auto object-contain float-anim pointer-events-none mix-blend-screen"
              />

              {/* Floating Content Panel */}
              <div className="glass-panel absolute left-0 md:-left-10 top-[60%] md:top-[40%] z-20 w-full md:w-[480px] p-6 md:p-8 pointer-events-auto">
                 <div className="text-[10px] text-gray-400 tracking-widest mb-4">MODE: INITIALIZE</div>
                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">M. Rupan Vijay</h1>
                 <h2 className="text-xs md:text-sm text-gray-300 mb-6 font-light">B.Tech Mechanical Engineering — VIT Chennai</h2>
                 
                 <p className="text-xs md:text-sm text-gray-400 italic border-l-2 border-cyan-500/50 pl-4 mb-8">
                   "Education is the premise of progress."
                 </p>

                 <div className="flex gap-4">
                   <button className="btn-holographic">More About Me</button>
                   <button className="btn-holographic">Download Resume</button>
                 </div>
              </div>

           </div>

           {/* RIGHT SIDE: F1 Car */}
           <div className="relative w-full md:w-[50%] h-[50%] md:h-[80%] flex items-center justify-center md:justify-end mt-10 md:mt-0">
              
              {/* Orbital Rings behind F1 Car */}
              <div className="absolute w-[80%] aspect-square flex items-center justify-center pointer-events-none mt-10 md:mt-20 mr-0 md:mr-10">
                 <div className="orbital-ring orbital-ring-2"></div>
                 <div className="target-grid-inner w-[70%] h-[70%]"></div>
                 {/* Little orbital dot */}
                 <div className="absolute w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(255,51,102,0.8)] top-[10%] right-[20%] animate-pulse"></div>
              </div>

              {/* Glowing F1 Car */}
              <img 
                src="/assets/car.png" 
                alt="F1 Wireframe Car" 
                className="relative z-10 w-[90%] md:w-[85%] h-auto object-contain float-anim-alt pointer-events-none mix-blend-screen mt-0 md:mt-10 mr-0 md:mr-10"
              />

           </div>

        </div>
      </div>
      
    
      </section>

{/* About Section */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t border-cyan-900/40" id="about">
<div className="grid md:grid-cols-2 gap-12 items-center">
<div className="scroll-fade crop-marks crop-marks-top-left crop-marks-bottom-right p-2 border border-cyan-800/50 bg-black/80 backdrop-blur-sm visible overflow-hidden">
<img alt="M. Rupan Vijay" className="w-full h-auto contrast-125 transition-transform duration-500 scale-125 origin-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4vPXAHKIa92uKuDvF9PlBP5RY0Y4qOVs5jjMSzvNM1wK1fout1lPRUtcjxFnbNEtJHgUXkKyvCRHo0Uv0CgUn4dY-5BWUa6E8dV-CnmO_jqL9U_hVi63SxuaHnWdIvUJaQUBp1hxA7D7nN4A15iYDSFiHWdNt06kUHkQRNqJSnK3TTqhXEcq7Pb2ymwfW0gkOqp-YILQZToAj3c9ZAVEtPT4IwRIaL_t6JDHviXRlbTDpqHtF2y3Wj7gGwnvvGIUEVQ82ve3sGP5S" />
</div>
<div className="scroll-fade visible">
<h2 className="font-headline-md text-headline-md mb-6">SPECIFICATIONS</h2>
<p className="font-body-md text-body-md mb-8 text-gray-300">
                        Dedicated Mechanical Engineering student with a strong foundation in computational tools and technical documentation. Driven by a precise approach to problem-solving and a commitment to continuous learning in both traditional engineering principles and modern software applications.
                    </p>
<ul className="space-y-4 mb-8 font-label-mono text-label-mono">
<li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">NAME</span> <span className="">M. Rupan Vijay</span></li>
<li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">MAJOR</span> <span className="">Mechanical Engineering</span></li>
<li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">INSTITUTE</span> <span className="">VIT Chennai</span></li>
<li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">CGPA</span> <span className="">9.02</span></li>
<li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">HIGHLIGHT</span> <span className="">University Rank Holder</span></li>
<li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">DOB</span> <span className="">April 5, 2007</span></li><li className="flex border-b border-cyan-900/40 pb-2"><span className="w-32 text-cyan-400/60">MINORS</span> <span className="">Full Stack Development, Business Enthusiast</span></li></ul>
<div className="flex gap-4">
<a className="magnetic-el px-6 py-3 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] text-white font-label-mono text-label-mono uppercase tracking-widest hover:bg-black hover:text-cyan-400" href="#contact">Get In Touch</a>
</div>
</div>
</div>
</section>
{/* Skills Section */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t border-cyan-900/40 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 visible" id="skills">
<h2 className="font-headline-md text-headline-md mb-12 text-center scroll-fade visible">Engineering &amp; Computational Toolkit</h2>
<div className="max-w-3xl mx-auto space-y-8 scroll-fade visible">
{/* Skill Item */}
<div>
<div className="flex justify-between font-label-mono text-label-mono mb-2">
<span className="">SolidWorks</span>
<span className="skill-counter" data-target="80">0%</span>
</div>
<div className="h-4 border border-cyan-700/60 p-[1px] w-full bg-transparent">
<div className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] skill-bar" data-width="80%"></div>
</div>
</div>
{/* Skill Item */}
<div>
<div className="flex justify-between font-label-mono text-label-mono mb-2">
<span className="">MATLAB</span>
<span className="skill-counter" data-target="75">0%</span>
</div>
<div className="h-4 border border-cyan-700/60 p-[1px] w-full bg-transparent">
<div className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] delay-100 skill-bar" data-width="75%"></div>
</div>
</div>
{/* Skill Item */}
<div>
<div className="flex justify-between font-label-mono text-label-mono mb-2">
<span className="">AutoCAD</span>
<span className="skill-counter" data-target="85">0%</span>
</div>
<div className="h-4 border border-cyan-700/60 p-[1px] w-full bg-transparent">
<div className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] delay-150 skill-bar" data-width="85%"></div>
</div>
</div>
{/* Skill Item */}
<div>
<div className="flex justify-between font-label-mono text-label-mono mb-2">
<span className="">Python</span>
<span className="skill-counter" data-target="70">0%</span>
</div>
<div className="h-4 border border-cyan-700/60 p-[1px] w-full bg-transparent">
<div className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] delay-200 skill-bar" data-width="70%"></div>
</div>
</div>
{/* Skill Item */}
<div>
<div className="flex justify-between font-label-mono text-label-mono mb-2">
<span className="">Java</span>
<span className="skill-counter" data-target="65">0%</span>
</div>
<div className="h-4 border border-cyan-700/60 p-[1px] w-full bg-transparent">
<div className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] delay-300 skill-bar" data-width="65%"></div>
</div>
</div>
{/* Skill Item */}
<div>
<div className="flex justify-between font-label-mono text-label-mono mb-2">
<span className="">LTspice</span>
<span className="skill-counter" data-target="75">0%</span>
</div>
<div className="h-4 border border-cyan-700/60 p-[1px] w-full bg-transparent">
<div className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] w-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] delay-400 skill-bar" data-width="75%"></div>
</div>
</div>
</div>
</section>
{/* Stats Section */}
<section className="py-16 border-y border-cyan-900/40 bg-black/60 backdrop-blur-md">
<div className="max-w-screen-2xl mx-auto px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-8 text-center scroll-fade visible">
<div>
<div className="font-headline-lg text-headline-lg text-cyan-400 mb-2 visible counter" data-decimals="2" data-target="9.02">9.02</div>
<div className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-cyan-400/60">Current CGPA</div>
</div>
<div>
<div className="font-headline-lg text-headline-lg text-cyan-400 mb-2"><span className="visible counter" data-decimals="0" data-target="90">90</span>%<span className="text-2xl">+</span></div>
<div className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-cyan-400/60">Board Exams</div>
</div>
<div>
<div className="font-headline-lg text-headline-lg text-cyan-400 mb-2"><span className="visible counter" data-decimals="1" data-target="91.7">91.7</span></div>
<div className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-cyan-400/60">JEE Percentile</div>
</div>
<div>
<div className="font-headline-lg text-headline-lg text-cyan-400 mb-2 visible counter" data-decimals="0" data-target="2">2</div>
<div className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-cyan-400/60">Year B.Tech</div>
</div>
</div>
</section>
{/* Journey Section */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto" id="journey">
<h2 className="font-headline-md text-headline-md mb-16 text-center scroll-fade visible">TIMELINE &amp; ACHIEVEMENTS</h2>
<div className="relative max-w-2xl mx-auto pl-8 space-y-12 timeline-container">
<div className="absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-cyan-700/60 opacity-20"></div>
<div className="absolute left-0 top-0 w-px border-l-2 border-cyan-700 timeline-line" style={{ height: '0%' }}></div>
{/* VIT Chennai */}
<div className="relative timeline-item">
<div className="absolute w-2 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] -left-[37px] top-2 timeline-dot"></div>
<div className="timeline-content">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">2025 - 2029</div>
<h3 className="font-headline-md text-headline-md mb-2">VIT Chennai</h3>
<p className="font-body-md text-body-md text-gray-300">B.Tech Mechanical Engineering. Current CGPA: 9.02</p>
</div>
</div>
{/* CS Academy */}
<div className="relative timeline-item">
<div className="absolute w-2 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] -left-[37px] top-2 timeline-dot"></div>
<div className="timeline-content">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">2018 - 2024</div>
<h3 className="font-headline-md text-headline-md mb-2">CS Academy</h3>
<p className="font-body-md text-body-md text-gray-300">Foundation and Schooling. Strong foundational education setting the premise for engineering.</p>
</div>
</div>
{/* Royal International School */}
<div className="relative timeline-item">
<div className="absolute w-2 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] -left-[37px] top-2 timeline-dot"></div>
<div className="timeline-content">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">2015 - 2017</div>
<h3 className="font-headline-md text-headline-md mb-2">Royal International School</h3>
<p className="font-body-md text-body-md text-gray-300">Primary and Middle School education.</p>
</div>
</div>
{/* SSM Central School */}
<div className="relative timeline-item">
<div className="absolute w-2 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] -left-[37px] top-2 timeline-dot"></div>
<div className="timeline-content">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">2011 - 2014</div>
<h3 className="font-headline-md text-headline-md mb-2">SSM Central School</h3>
<p className="font-body-md text-body-md text-gray-300">Early Schooling years.</p>
</div>
</div>
{/* Euro Kids */}
<div className="relative timeline-item">
<div className="absolute w-2 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] -left-[37px] top-2 timeline-dot"></div>
<div className="timeline-content">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">2009 - 2010</div>
<h3 className="font-headline-md text-headline-md mb-2">Euro Kids</h3>
<p className="font-body-md text-body-md text-gray-300">Pre-School: The foundational start of the educational journey.</p>
</div>
</div></div>
</section>
{/* Extracurriculars & Languages Section */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t border-cyan-900/40 bg-black/40 backdrop-blur-md border-y border-cyan-900/50">
<div className="grid md:grid-cols-2 gap-16">
<div className="scroll-fade visible">
<h2 className="font-headline-md text-headline-md mb-8">SPORTS &amp; EXTRACURRICULARS</h2>
<ul className="space-y-4 font-body-md text-body-md text-gray-300 list-none"><li className="flex items-center gap-3"><span className="material-symbols-outlined text-cyan-400">workspace_premium</span> Grandmaster in SIP abacus</li><li className="flex items-center gap-3"><span className="material-symbols-outlined text-cyan-400">storefront</span> Entrepreneur in Baujii Handlooms</li><li className="flex items-center gap-3"><span className="material-symbols-outlined text-cyan-400">self_improvement</span> Yoga State Level</li><li className="flex items-center gap-3"><span className="material-symbols-outlined text-cyan-400">sports_volleyball</span> Volleyball State Level</li></ul>
</div>
<div className="scroll-fade border-l border-cyan-900/40 pl-8 lg:pl-16 visible">
<h2 className="font-headline-md text-headline-md mb-8">LANGUAGES KNOWN</h2>
<div className="grid grid-cols-2 gap-4 font-body-md text-body-md text-gray-300">
<div className="p-4 border border-cyan-900/40 bg-transparent rounded-sm">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">NATIVE</div>
<div className="">Tamil</div>
</div>
<div className="p-4 border border-cyan-900/40 bg-transparent rounded-sm">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">PROFICIENT</div>
<div className="">English</div>
</div>
<div className="p-4 border border-cyan-900/40 bg-transparent rounded-sm">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">INTERMEDIATE</div>
<div className="">Hindi</div>
</div>
<div className="p-4 border border-cyan-900/40 bg-transparent rounded-sm">
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-1">BASIC</div>
<div className="">German</div>
</div>
</div>
</div>
</div>
</section>
{/* Portfolio/Certifications */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t border-cyan-900/40 bg-transparent transition-colors duration-300" id="certifications">
<div className="scroll-fade visible">
<p className="font-label-mono-sm text-label-mono-sm mb-4 text-cyan-400/60">Sheet 06 / 07 ΓÇö Certifications</p>
<h2 className="font-headline-md text-headline-md mb-4">Certifications &amp; Honours</h2>
<p className="font-body-md text-body-md text-gray-300 mb-12">A selection of my professional credentials and academic recognitions.</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden"><div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black"><img alt="Group Dance Winner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Z9tYcVFWPloX9NlxDb97qy6FvBkOtIHLPRu_H18_AQ2wMqvZaHWojuyStkaak9QD2qZYczQ5oqjLIxCZmNwRXAdnu12NbGCEG640MAn0CLCkgX1vK2C44voE7g8r8YzhzsktTjTzbGTW4d6IyS67C7xcJgNsgLXYyUl1-yxLElSxrWf9-DUkce60lVWsYonshyxKoFGAprsgehQ94AkZt36IvkZnZ1rQM69gUMcS3ExuMRtlA9oq08Mdb5X0Dc2O1-cowMFSISY1" /></div><p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Group Dance Winner</p></div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden"><div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black"><img alt="CS Academy Sports Winner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoAnM_UaVaWy4spszmfrPjDDDnNUq71NAJfpOAgDkzPJFvD0BjnLpEyX_q3z6NvTbzZnxASS0q8-hs8n86-T9B7PNK6LBEhE6cXooILXi5XlvJahVXRbTI66lFAT172slShK-ybgNDV1lxnXoBLaqxAgVivOZHVcZVRVZUgTPai_iUtXSVweoScSNmtVTuR4Hdu7gGtcdZMcTfYV7OmxKrXbmWq00jxSjaza_FW2SBO-oxkNk9lYDr9HORGGbdvoCdQhNsENahTa40" /></div><p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">CS Academy Sports Winner</p></div>
{/* Certificate 1: SIP Abacus Grandmaster */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[3/4] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="SIP Abacus Grandmaster" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEXYapewr6sqrvCXemv5aCvoeUT3M5IUQ2E8BaP7ESnrOOWQ5ZUmHAFV4xDlxQI2dfIRrabSyy1kfC87WethccP_xdB0dLzbLnDXFHPZV2I7QntHgonxix05UYEG2f-N6SrbzZCq5bXwRzKeuXSnpD7XcW2AY82Rs-KApMcK_SMAlXSZe5CQ48A0q5nvSJJYe1zuEX1YuUkXEFyEKVuk9b3jyjLcKUQf-u40GDcR2yUjw4IBO8ifheyroySOTr8hIbjPIJ4VUU6X_Z" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">SIP Abacus Grandmaster</p>
</div>
{/* Certificate 2: Google Cloud LLM */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Intro to LLM - Google Cloud" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBPBXY2V6OWuohxexsLtSOFUA8hWXN0VTZZm34NAR1THWvz2AS5HuwSAw4vtQmpn5hwBZuHd8hGG4joXNAovNxmXEC8McuUynqrFa9UPmWqTu-Jm1HubBl4j_Ohc-dCvIon0zRkjwexH8S-SoxBW8EnR6TvixzKWMuRuWACdJ6v_xw9MbJeL3dwknnwiLUQCWz5ML-90p-7lAJjeuyXdQmbltIRChagapQCzNvmeYCKtEth5ba_XdBwD7P6P568d0_B62ypIRQ0Kr6" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Intro to LLM - Google Cloud</p>
</div>
{/* Certificate 3: SIP Regional Prodigy */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="SIP Regional Prodigy 2020" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWc3BNUvcgqp0LNjAzXNqzppw_zcSF_0026KWKb1DTgRKMBPLIcTU2-wbfFZoNspc_m3EBoskKl84BECPkFNbdLKji4WyDFpqdSRx7p6p-qA1kD6EwA0AOGkMfo9U_sdlABNUtj2lx416C5bvxiBCLQm-ToLdmYamdtYc7uJbTB5J7o4dSHdhabhZpjTS-Nmy6cLWyQEjnAELHf8MiNrdajY2X4l755JoXm_p00oHQ5VZENWz6rXVUrcTyJvTtxMqid_xPQRCQtguc" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">SIP Regional Prodigy 2020</p>
</div>
{/* Certificate 4: State Level Volleyball */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="State Level Volleyball" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8cQZ33QU3urdyYuYofcdb3iykH1zO4xIf1IQCb_xqtDzprbLzKZesw0oqeO7bumuwuJ12iqj9htpiRV3k6KB3q2Qgs5MqzRv27_-1Dbp8r6jNopTPUmJlFmHUEIeQoZLX1lsEy69TJKDK1kxGkJ2Fpz1X0CG8yQK9N7LsRoXc55fdgzRiWTCkB9k_uABqs7GvtZQ_NgzIX15tbgtsgmRJRViUAbvVWpEEDfFtP98gySNvigk4Psf_EAJHy2tOh13ovMmXVFOTWyxu" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">State Level Volleyball</p>
</div>
{/* Certificate 5: Yoga State Level */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Yoga State Level" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASVJHRUYGWKowW22j8y6s2OvJgHXNThq7_3kH5y5uy0WnBfcId2Xm3YtOyiChEJgCBU14JplJ3oCJtBtSHj-6-faXgwJcZkjAkRo6k2znraKQUtsqK78Z7WpIHOx6tV5wr7opG7x4hEwgBAUPyOqO6qhCQWuxN_OLoVo0-_oZGVaEqJrMdB_ErADTKih4vEdT5Qu3is5KPpcUa1HODDtUGqtWOJ9wXBgQJ813NkmbkGsZfrEOOufc25VS9BaglcQ6F41WvvmBpA3bs" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Yoga State Level</p>
</div>
{/* Certificate 6: National Spell Bee Rank */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="National Spell Bee Rank" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwJOAcsBUwjXtxRp8NOKyMGMh0EYai_KWtZZrdogPE_so-YqbawATz2FxqH3Ma0ftUh-kVp0E0HRQIC-DNQfHYGm2Gn_uUnB3VzOioHAHOHHw4z0rgT9y2S7h8bPSzUTDWPxo6kkUtA6HhiZAou2tTu2-lSKxCvCXTuqJgTelY_C29_yeU839BBLujMTFCTGwLbPnC39wSOpWoO_mqEBwsGOg0OWv8jGyDDDpLsI6kl-JH6kqqT_QgfIskdYwGHVYEj7du6clkN2II" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">National Spell Bee Rank</p>
</div>
{/* SSM Central School Merit */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="SSM Merit Certificate" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA59zzMsSdNUb5tFt4iBZdMG26yP2KWHKNPnoSjAfnVh4Ej7PPceAu4pp6_b5t4zuRqf7O5MGUY1lhWVAsbQuJud2-obynUw9eXaIR4ZJNYhLIBlow2zzQnOEiewmCL-0UZGR9ZKs7-QVbfexkWhO4-hkqID9trK9ayee3D_C2z2EldANkafPIWiXY8ZK9i7ohbb1zYie1z6Jvl_St66x0J3XCaQI5FTLYNV3b8WsLt7A8tCn5qwZsZZmpbdlwHgaEb2uo1RFxdw78X" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">SSM Merit Certificate</p>
</div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="SSM Merit Certificate" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3DQH76cAbDy2qmx_puwQayw_gQREq9KP-kBBPxND8fZXP1UnRwsIeLTaqAnT2qGhGtPo67uCi8UA60Bn_Ll-3YtWptZm5bXcRq1ZgLA52SKfpZtZV_AsSYNH426lSI5Y49rbsTwHUYLz6_aRg_brjlx60c3IHeeEZ9-6aJLkxy1wxrgQ1fW4ZeAFyTdujs4OTVWwoJCnxpvtpWKOGI8WCYjsYuDVoFR7nNb5-EyhOfodi_PvDDEB80eR6_x-SreslfTWpyp_-t0b_" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">SSM Merit Certificate</p>
</div>
{/* Sports First Place */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Sports Meet - First Place" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt9wSD2Hx1G2NMyWeM0_raEv1EedGQJnItIsnVBvSdCfvvgn1N20qpHz-6Q-KHiOKPK69yx_zmCR4cO7mEYlZ85wJUZO710gUK1tX4ZzICxtFje1ovdKlEag4Md3kDRutTRwfDTGHNRT0FPCDJNV5-twFMpYlKdCvgyJMM3tOk0Q7nqqsECifRDwZRqefrrpA-tgbWmW95dh08biEYHzWxFdaRIt-Y-1n8DQNf0XaKnbEaS720RkMcMCt6duGeTVO7-8CowoqciCd0" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Sports Meet - First Place</p>
</div>
{/* Royal International */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Royal International Merit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlJWUjacDVXVUIPP--GfjECyaayBm7UgPMiLRMzCMyYHAFPXrp6uqe8BT7vNGRL7-lnJfrKnvBDw39_n4OBnR0XDWOPpd9qysxtqpuyiPZar6D-YvWAkuf9A1rS-HEFInxAgSBgMk17rt5f9v_ylLSCpZg9WGNYQJfPR9dVwrjaoOd28LY-ZJBZPqp3GnIVM839Qqw8MnAruTMmI5tuF242QkrMosDm6H5x7Ghmjn5v9ZuThQy1Er5krAjoQQHUnXNlpFQL8CtKSNZ" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Royal International Merit</p>
</div>
{/* Additional Sports & Merit */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Annual Sports Meet" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCvFOdv80zKNlrBQk8RwHQ-eBpJ49Yf6m6EtznVxbzeSF7stS1WYZc2v3qfl8YQfjyUNVSfdaubTB6-00mdahry_6jrGu_YxnQ3HGJhu_Z-qHXUMaI53QMwTPfNETtLJfWIoV_c_Hzx8MwBXXKeAQNbIqeQZrkQWNev4VIBq24WpFdsLFqUFijAHf6Ctq6vtTFiv263ZWgcHxZMHrRFxH7vE824BnOoqzOGaPRVC8_C33mbMkXX9haVHjLSZcbugPQPqlP8k2tIzqc" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Annual Sports Meet</p>
</div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Cultural Merit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgvLuZoL49qEUW4nvDVY46EshjFztOLgbXRKZaP3yzSB4_ta1SaGppcSf8d-1Lq87ejMdSXeeSs_5c5or6oBNX8yGdqGe4VVoV0xCn8ta0Gs9CWWtXAlH6dAzzbsOCwC8qTupkVv1zy9Ehmp2FvnKShUBBchFdadFovv0FsJIE7kwDhsSL3o0WVSd1Oj3kHEHiNMCUPRIjqkQXDEd4ZU1BZtHH5lUTLZQy_Pyf4Kn3Qpx8-rQd38likD-QsYftwowrNUCblkq0B0k1" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Cultural Merit</p>
</div>
{/* NEW CERTIFICATIONS */}
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="Cyber Security Workshop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW6EbxjETizKT8ezK6myTtGz14l4Z67y3Ek5Qpp0cOqbfRqW0iiVIA4TobWrfK82yjLipJJIuQLphqEBYkEmtIlP2sQXw4Tnp_NRVAFJXoAYoQQwVuf4uQlPJG5KSfr21SrTqqKm7SixohHSUnlpGzD1QD3X8WR8WtyHmwr887M1L4tAgA_Ko4-X89--Wb1x3UhdPIdO66cj2O6412vDwR5z7hnnhaESPPFm6Bp8EKpmUL69XIyiBQUnd8IfTbBfunizoDS6oF-R30" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">Cyber Security Workshop</p>
</div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="NSO 2017" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkhv9AtAlbNYPSnZDEwe0daqjD0t2xbH_KOS_d2S2IAkNgPHmZhgls1amvA_2VGp6NZzJPhGMPlRFxebrmupJRci9Gq5sQGr7rNFC4JqXErtbAFT2Py1xTvw1uFDnMrNneqw7BpHrhkJ7f8Ad7XqM45xrUyGw4rgvV2cx6aTREhqwhKycN9g6VThSN3SDF-PDxAULIMt5AcIV15kD6VyDVW_KECDlck9aRHlxdmWbo7CA6JWESc6QBa0o4CCIiJjz6X7AyDEWViCHf" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">NSO 2017</p>
</div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="GREEN Olympiad 2018" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEBZDFqRDKEX-gQ3EHp7HM4WgTPnsgNAI9GtEk_9ZSDjy0XYmfc3SvrPyhGb04tDZ3zNKb73EvzS4VCDC2sYCyzIA34wgi3eHom18w_A49KPrv58Vy5AMEJUdzAORYYs3yR7pxGFmZ6Nma54k-dKMTR1ksNuF67ZG7l4JkfhXa4E7OiN4_QqpurkJRhcV2i5EtsEdKj4byZbpw_C_Shh5CzefcmLf00w-60_5LCn_cZR1JwPdeGb8fblKyevSx5aoUo8Y4YLO73Gdj" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">GREEN Olympiad 2018</p>
</div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="NSTSE 2015" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuTnDcSgDS7ly3Khc4puM4l-QAwGfBH5aVEmvikAbGoHS33PrHoa8PvEzOcbBPC2aaGVGsRImjbttGmWhD0GFtbFzgdo2mGkP9ZORtMAw6YtYXBnQQqJ-Hu5BG03tAZIbmKULqwBwEom66zQpcGEJoj6CqkYyKuU7aYbEq4Y3ApRzgRHZeZlZllXlU7NGtRB1jH5aKwDqd7k5djATP6ez4G25Rj90Xja59jZHikCRq6SRZf0EcVc0VwVhvV6TIDyV8iRj8R0xFlq8S" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">NSTSE 2015</p>
</div>
<div className="border border-cyan-800/50 bg-black/40 backdrop-blur-md border-y border-cyan-900/50 p-2 group overflow-hidden">
<div className="aspect-[4/3] overflow-hidden border border-cyan-900/40 bg-black">
<img alt="IMO 2016" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY51N03dOzADgA7ULpLDuXZaJ484MmRZjzGi-IlUwA7RxIZZhMeIoEf_Y59Imc0bILY_ufp3k7MWTywwfa7LuZDAZK03Z3pNgCDt7SkHPEMM8vwRf_CIdiUjZvxtTZUOuqezHtAXaqUXG2CN8Q41_uNgCxTGkgSPNKqYgTqDq0AedmaZCj2_iu9y102kTkkOTD4jruGVDW0tfvYR38m-e7yxgbjFdSARN2qwBoAE-87QIAxaz4jMo3nNsDEEOEAX04HU2KSOiWYR08" />
</div>
<p className="font-label-mono text-label-mono mt-4 text-center uppercase tracking-widest">IMO 2016</p>
</div>
</div>
<div className="flex justify-center">
<a className="magnetic-el px-8 py-4 border-2 font-label-mono text-label-mono uppercase tracking-widest transition-all duration-300 hover:bg-primary-container hover:text-white text-white border-cyan-700" href="#portfolio">
        View Project Archive <span className="icon-shift inline-block ml-1">ΓåÆ</span>
      </a>
</div>
</div>
</section>
{/* Project Archive */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t border-cyan-900/40" id="portfolio">
<h2 className="font-headline-md text-headline-md mb-12 text-center scroll-fade visible">PROJECT ARCHIVE</h2>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-fade visible">
{projectsData.map((project, index) => (
  <div 
    key={project.id}
    className="border border-cyan-800/50 bg-transparent group overflow-hidden project-card-reveal relative cursor-pointer hover:border-cyan-400 transition-colors duration-300"
    onClick={() => setSelectedProject(project)}
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="h-48 border-b border-cyan-800/50 relative overflow-hidden">
      <img alt={project.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" src={project.image} />
      {project.team && (
        <div className="absolute top-2 right-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] text-white px-2 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-widest">TEAM</div>
      )}
    </div>
    <div className="p-6 relative flex flex-col h-[calc(100%-12rem)]">
      <div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-2">{project.id}</div>
      <h3 className="font-headline-md text-headline-md mb-2">{project.title}</h3>
      <p className="font-label-mono text-label-mono text-cyan-400 mb-4">{project.subtitle}</p>
      
      {project.team && (
        <div className="mt-auto pt-4 flex items-center gap-2 font-label-mono-sm text-label-mono-sm text-cyan-400/60">
          <span className="material-symbols-outlined text-sm">groups</span>
          <span className="">{project.team}</span>
        </div>
      )}
    </div>
  </div>
))}
</div>
</section>
{/* Contact Section */}
<section className="py-24 px-margin-desktop max-w-screen-2xl mx-auto border-t border-cyan-900/40 bg-black/40 backdrop-blur-md border-y border-cyan-900/50" id="contact">
<div className="grid md:grid-cols-2 gap-16 scroll-fade visible">
<div>
<h2 className="font-headline-md text-headline-md mb-8">INITIATE CONTACT</h2>
<form className="space-y-8">
<div>
<label className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 block mb-1">NAME</label>
<input className="w-full input-underline text-white py-2 font-label-mono text-label-mono" placeholder="Enter full name" type="text" />
</div>
<div>
<label className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 block mb-1">EMAIL</label>
<input className="w-full input-underline text-white py-2 font-label-mono text-label-mono" placeholder="address@domain.com" type="email" />
</div>
<div>
<label className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 block mb-1">SUBJECT</label>
<input className="w-full input-underline text-white py-2 font-label-mono text-label-mono" placeholder="Inquiry topic" type="text" />
</div>
<div>
<label className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 block mb-1">MESSAGE</label>
<textarea className="w-full input-underline text-white py-2 font-label-mono text-label-mono h-24 resize-none" placeholder="Transmit message..."></textarea>
</div>
<button className="magnetic-el px-8 py-3 bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] text-white font-label-mono text-label-mono uppercase tracking-widest hover:bg-black hover:text-cyan-400 w-full border border-cyan-400" type="button">
                            SEND TRANSMISSION
                        </button>
</form>
</div>
<div className="border-l border-cyan-900/40 pl-8 lg:pl-16 flex flex-col justify-center space-y-12">
<div>
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-2">PHONE_LINK</div>
<a className="font-headline-md text-headline-md hover:text-cyan-400 transition-colors block" href="tel:+918925887050">+91 89258 87050</a>
</div>
<div>
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-2">EMAIL_LINK</div>
<a className="font-headline-md text-headline-md hover:text-cyan-400 transition-colors block break-all" href="mailto:rupanvijay0526@gmail.com">rupanvijay0526@gmail.com</a>
</div>
<div>
<div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-2">SOCIAL_LINK</div>
<a className="font-headline-md text-headline-md hover:text-cyan-400 transition-colors block" href="#">@__rupanvijay__</a>
</div>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-black/80 backdrop-blur-sm border-t border-cyan-800/50 flex flex-col md:flex-row justify-between items-center py-8 px-margin-desktop w-full z-10 relative">
<div className="font-label-mono text-label-mono font-bold text-white mb-4 md:mb-0">
            ┬⌐ 2024 M. RUPAN VIJAY | MECHANICAL ENGINEERING
        </div>
<div className="flex space-x-6 font-label-mono-sm text-label-mono-sm">
<a className="text-white hover:underline decoration-secondary-container transition-all duration-300" href="#">INSTAGRAM</a>
<a className="text-white hover:underline decoration-secondary-container transition-all duration-300" href="#">LINKEDIN</a>
<a className="text-white hover:underline decoration-secondary-container transition-all duration-300" href="#">GITHUB</a>
</div>
</footer>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md backdrop-blur-md transition-opacity duration-300" onClick={() => setSelectedProject(null)}></div>
          <div className="relative w-full max-w-5xl h-[80vh] bg-transparent border border-cyan-700/60 flex flex-col md:flex-row shadow-2xl animate-modal-pop">
            <button 
              onClick={() => setSelectedProject(null)}
              className="magnetic-el absolute top-4 right-4 z-10 font-label-mono text-label-mono bg-primary-container text-surface px-4 py-2 hover:bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)] hover:text-white transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">close</span> TERMINATE
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-full bg-black/40 backdrop-blur-md border-y border-cyan-900/50 border-b md:border-b-0 md:border-r border-cyan-800/50 relative">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover grayscale opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-50 md:hidden"></div>
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto bg-transparent relative">
              <div className="font-label-mono-sm text-label-mono-sm text-cyan-400/60 mb-6">{selectedProject.id} // SECURE_ARCHIVE</div>
              <h2 className="font-headline-lg text-headline-lg mb-4 pr-32">{selectedProject.title}</h2>
              <h3 className="font-label-mono text-label-mono text-cyan-400 mb-8 border-l-2 border-cyan-400 pl-4">{selectedProject.subtitle}</h3>
              
              <div className="font-body-lg text-body-lg text-gray-200 leading-relaxed mb-8 flex-grow">
                {selectedProject.description}
              </div>

              {selectedProject.team && (
                <div className="mt-auto pt-8 border-t border-cyan-800/50 flex items-center gap-3 font-label-mono text-label-mono text-gray-300">
                  <span className="material-symbols-outlined">groups</span> {selectedProject.team}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
