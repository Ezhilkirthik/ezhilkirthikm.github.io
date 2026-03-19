import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, Download, ExternalLink, 
  Cpu, Zap, CircuitBoard, Award, BookOpen, Briefcase,
  Activity, Antenna, Battery, Gauge, Radio, Signal, 
  Waves, Play
} from 'lucide-react';
import { cn } from './utils/cn';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  highlight: string;
}

const projects: Project[] = [
  {
    title: "High-Efficiency Synchronous DC-DC Buck Converter",
    description: "Modeled and designed a 12V-to-5V synchronous buck converter in LTspice and MATLAB/Simulink. Validated performance with oscilloscopes and multimeters. Built prototype PCB assemblies.",
    technologies: ["LTspice", "MATLAB", "Simulink", "PCB Design"],
    github: "https://github.com/Ezhilkirthik",
    highlight: "Automotive Power Systems"
  },
  {
    title: "Hardware Logic-Based Color Detection & Sorting System",
    description: "Built microcontroller-free system using analog signal conditioning and comparator circuits. Custom harnesses and insulation resistance verification for robust detection.",
    technologies: ["Analog Electronics", "Comparators", "Signal Conditioning"],
    github: "https://github.com/Ezhilkirthik",
    highlight: "Pure Hardware Implementation"
  },
  {
    title: "Quarter Car Suspension Control Analysis",
    description: "Analyzed passive vs Skyhook semi-active suspension using Bode plots and MATLAB. Achieved 9% reduction in RMS body acceleration with improved stability margins.",
    technologies: ["MATLAB", "Simulink", "Control Systems"],
    github: "https://github.com/Ezhilkirthik",
    highlight: "9% RMS Reduction"
  },
  {
    title: "Automotive ECU & Power Monitoring System",
    description: "Real-time safety-critical system on STM32F401RE for speed, collision and battery monitoring. Sensor interfacing and noise condition analysis.",
    technologies: ["STM32", "Embedded C", "CAN", "Sensors"],
    github: "https://github.com/Ezhilkirthik",
    highlight: "ISO 26262 Compliant"
  },
  {
    title: "FPGA-Based Digital Speedometer with Hall Sensor",
    description: "Interfaced Hall Effect sensors using Verilog on FPGA. Optimized RTL achieving 34% LUT, 50% register and 63% I/O reduction.",
    technologies: ["Verilog", "FPGA", "Xilinx Vivado", "RTL"],
    github: "https://github.com/Ezhilkirthik",
    highlight: "63% I/O Reduction"
  },
  {
    title: "Sentinel-X Multi Modal Access Control",
    description: "Deterministic security system using Raspberry Pi Pico. Focused on reliable wiring and hardware-level troubleshooting with lab equipment.",
    technologies: ["Raspberry Pi", "Embedded Systems", "IoT"],
    github: "https://github.com/Ezhilkirthik",
    highlight: "Hardware Security"
  }
];

const skills = {
  "Electrical": ["Circuit Analysis", "Analog Electronics", "Power Electronics", "Signal Conditioning", "Sensor Interfaces", "Low-Voltage Design"],
  "Programming": ["Verilog", "Embedded C", "Python", "MATLAB", "Simulink"],
  "Tools": ["Xilinx Vivado", "LTspice", "STM32CubeIDE", "Eagle PCB", "ModelSim", "Keil"],
  "Protocols": ["CAN", "UART", "I2C", "SPI", "AMBA AHB/APB"],
  "Domains": ["FPGA Design", "RTL Design", "Embedded Systems", "DSP", "Automotive Electronics", "IoT"]
};

// Interactive Oscilloscope Component
const InteractiveOscilloscope = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Grid
    ctx.strokeStyle = 'rgba(0, 247, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Glow effect
    ctx.shadowColor = '#00f7ff';
    ctx.shadowBlur = 15;
    
    // Multiple waveforms
    const colors = ['#00f7ff', '#39ff14', '#a5b4fc'];
    
    colors.forEach((color, idx) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      
      for (let x = 0; x < width; x += 1.5) {
        const y = height / 2 + 
          Math.sin((x * 0.025) + phaseRef.current + (idx * 1.3)) * (height * 0.32) +
          Math.sin((x * 0.008) + phaseRef.current * 0.7) * (height * 0.15);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    
    ctx.shadowBlur = 0;
    
    // Trigger indicators
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillRect(width * 0.75, 20, 3, height - 40);
    
    phaseRef.current += 0.08;
  }, []);

  useEffect(() => {
    const animate = () => {
      drawWaveform();
      if (isRunning) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawWaveform, isRunning]);

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="relative bg-zinc-950 border border-cyan-400/30 rounded-3xl p-6 overflow-hidden group">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-xs text-cyan-400">OSCILLOSCOPE</div>
            <div className="text-white/70 text-sm -mt-0.5">LIVE SIGNAL ANALYSIS</div>
          </div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleAnimation}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/20 px-4 py-1.5 rounded-2xl text-xs font-medium transition-colors"
        >
          <Play className={`w-3.5 h-3.5 ${isRunning ? 'text-emerald-400' : ''}`} />
          {isRunning ? 'PAUSE' : 'RUN'}
        </motion.button>
      </div>
      
      <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10">
        <canvas 
          ref={canvasRef} 
          width="620" 
          height="210" 
          className="w-full h-auto"
        />
        <div className="absolute top-3 right-3 text-[10px] font-mono bg-black/70 px-3 py-0.5 rounded text-emerald-400 flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          2.4MSPS
        </div>
      </div>
      
      <div className="text-center text-[10px] text-white/30 mt-3 font-mono tracking-widest">DC-DC • HALL SENSOR • PWM SIGNAL</div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-80px 0px -20%' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Ezhilkirthik_M_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('In a real site, this would download your resume PDF!');
  };

  return (
    <div className="bg-zinc-950 text-white overflow-hidden">
      {/* Dynamic Circuit Background */}
      <div className="fixed inset-0 circuit-bg z-0 opacity-40 pointer-events-none"></div>
      
      {/* Navbar */}
      <motion.nav 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <CircuitBoard className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <div className="font-mono text-xl font-bold tracking-tighter">EZHILKIRTHIK</div>
              <div className="text-[10px] text-emerald-400 -mt-1 font-mono">ELECTRONICS</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest font-medium">
            {[
              { label: 'ABOUT', id: 'about' },
              { label: 'EXPERIENCE', id: 'experience' },
              { label: 'PROJECTS', id: 'projects' },
              { label: 'SKILLS', id: 'skills' },
              { label: 'PUBLICATIONS', id: 'publications' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "hover:text-emerald-400 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-emerald-400 after:transition-all",
                  activeSection === item.id ? "text-emerald-400 after:w-full" : "after:w-0"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-zinc-950 rounded-2xl text-sm font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              RESUME
            </motion.button>
            
            <a href="https://linkedin.com/in/ezhilkirthikm" target="_blank" className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/Ezhilkirthik" target="_blank" className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center relative pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_0.8px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
        
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-1.5 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm mb-6"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              AVAILABLE FOR OPPORTUNITIES
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-7xl md:text-[92px] font-bold tracking-[-4px] leading-none neon-text mb-4"
            >
              EZHIL<br />KIRTHIK
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-3xl md:text-5xl font-light tracking-tight text-white/80 mb-8"
            >
              Electronics Engineer
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-md text-xl text-white/60 mb-12"
            >
              Building sustainable automotive systems through power electronics, FPGA design and embedded intelligence.
            </motion.p>

            <div className="flex items-center gap-5">
              <motion.button 
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-transparent border-2 border-white hover:bg-white hover:text-zinc-950 rounded-3xl font-semibold text-lg flex items-center gap-3 group transition-all"
              >
                VIEW PROJECTS
                <ExternalLink className="group-hover:rotate-45 transition" />
              </motion.button>
              
              <motion.a 
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="px-8 py-5 border border-white/30 hover:border-white/70 rounded-3xl font-medium flex items-center gap-2 transition-all"
              >
                LEARN MORE
              </motion.a>
            </div>
          </div>
        </div>

        {/* Floating tech icons */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-20 right-20 hidden xl:block"
        >
          <div className="w-32 h-32 border border-cyan-400/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <Cpu className="w-16 h-16 text-cyan-400" />
          </div>
        </motion.div>

        {/* Live Oscilloscope Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute top-40 left-[8%] hidden 2xl:block w-72"
        >
          <InteractiveOscilloscope />
        </motion.div>

        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute top-40 right-[15%] hidden lg:block"
        >
          <div className="px-6 py-3 border border-violet-400/30 rounded-2xl text-xs font-mono text-violet-300 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping"></div>
            FPGA LIVE
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 flex flex-col items-center">
          <div className="text-[10px] tracking-[3px] font-mono text-white/40 mb-2">SCROLL FOR SIGNAL</div>
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-10 border-2 border-white/30 rounded-3xl flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* SUMMARY / ABOUT */}
      <section id="about" className="py-24 border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="sticky top-28">
                <div className="uppercase text-xs tracking-[2px] text-emerald-400 mb-3">CHAPTER 01 — ORIGIN</div>
                <h2 className="text-6xl font-semibold tracking-tighter leading-none">THE SIGNAL STARTS HERE</h2>
                
                <div className="mt-8 flex gap-4">
                  <div className="px-5 py-3 border border-white/10 rounded-2xl text-sm">Coimbatore, India</div>
                  <div className="px-5 py-3 border border-white/10 rounded-2xl text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +91 8778459668
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-8 text-lg leading-relaxed text-white/80">
              <p>
                Motivated Electrical and Electronics-focused undergraduate with hands-on lab experience in automotive 
                low-voltage power management systems. Adept at operating lab instruments (multimeters, oscilloscopes, 
                electronic loads) to support the testing and validation of DC-DC converters and battery monitoring subsystems.
              </p>
              
              <p>
                Strong foundation in circuit schematics, wiring practices, and building prototype assemblies. 
                Detail-oriented and systematic, eager to contribute to sustainable transport solutions and learn 
                in a fast-paced, collaborative automotive engineering environment.
              </p>
              
              <div className="pt-8 border-t border-white/10 flex gap-8 text-sm">
                <div>
                  <div className="text-emerald-400 font-mono mb-1">EDUCATION</div>
                  <div className="font-semibold">Amrita Vishwa Vidyapeetham</div>
                  <div className="text-white/60">B.Tech ECE • 2027</div>
                </div>
                <div>
                  <div className="text-emerald-400 font-mono mb-1">CGPA</div>
                  <div className="font-mono text-4xl font-semibold text-white">7.8</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-8">
          <div className="uppercase text-xs tracking-[2px] text-emerald-400 mb-6">CHAPTER 02 — TRANSMISSION</div>
          <h2 className="text-6xl font-semibold tracking-tighter mb-16">PROFESSIONAL EXPERIENCE</h2>
          
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex flex-col md:flex-row gap-8 md:items-start">
                <div className="md:w-56 flex-shrink-0">
                  <div className="font-mono text-sm text-white/40">AUG 2024 — SEP 2024</div>
                  <div className="text-emerald-400 mt-1">MAVEN SILICON • Bengaluru</div>
                </div>
                
                <div className="flex-1">
                  <div className="text-3xl font-semibold mb-6 group-hover:text-emerald-300 transition-colors">
                    RTL Engineer — AMBA AHB-APB Bridge
                  </div>
                  
                  <ul className="space-y-4 text-white/70 text-[15px]">
                    <li className="flex gap-3">
                      <span className="text-emerald-400 mt-1.5">◉</span>
                      Developed RTL for AMBA AHB-APB Bridge using Verilog
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400 mt-1.5">◉</span>
                      Implemented FSM-based protocol control logic
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400 mt-1.5">◉</span>
                      Developed self-checking testbenches for verification
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400 mt-1.5">◉</span>
                      Performed waveform debugging and timing validation
                    </li>
                  </ul>
                  
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Verilog", "AMBA", "SystemVerilog", "Xilinx"].map(t => (
                      <span key={t} className="text-xs px-4 py-1 bg-white/5 rounded-3xl border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="uppercase text-xs tracking-[2px] text-emerald-400 mb-3">CHAPTER 03 — OUTPUT</div>
              <h2 className="text-6xl font-semibold tracking-tighter">FEATURED PROJECTS</h2>
            </div>
            <a href="https://github.com/Ezhilkirthik" target="_blank" className="flex items-center gap-2 text-sm group">
              ALL ON GITHUB 
              <ExternalLink className="group-hover:-rotate-45 transition" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-zinc-900 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-emerald-400/50 transition-all duration-700 glow-cyan"
              >
                <div className="flex-1">
                  <div className="font-mono text-xs tracking-widest text-emerald-400 mb-4">{project.highlight}</div>
                  <h3 className="text-2xl font-semibold mb-5 leading-tight group-hover:text-emerald-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-[15px] leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-3 py-1 bg-black border border-white/20 rounded-lg">{tech}</span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.github} 
                    target="_blank"
                    className="inline-flex items-center gap-3 text-sm group-hover:text-emerald-400 transition-colors"
                  >
                    VIEW PROJECT ON GITHUB
                    <div className="w-8 h-px bg-white/30 group-hover:bg-emerald-400 transition-colors"></div>
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-zinc-900/60 border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto px-8">
          <div className="uppercase text-xs tracking-[2px] text-emerald-400 mb-6">CHAPTER 04 — CAPABILITIES</div>
          <h2 className="text-6xl font-semibold tracking-tighter mb-16">TECHNICAL EXPERTISE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-950 border border-white/5 p-8 rounded-3xl"
              >
                <div className="uppercase text-xs text-white/40 tracking-widest mb-6 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> {category}
                </div>
                
                <div className="space-y-4">
                  {skillList.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
                      <div className="text-white/80 group-hover:text-white font-light text-lg transition-colors">{skill}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Industrial Standards */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-8">INDUSTRIAL STANDARDS &amp; PROTOCOLS</div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60 font-light">
              {["IEEE 1364", "ISO 26262", "IEC 61000", "MISRA-C", "IPC-2221", "IEEE 1149.1", "CAN", "I2C", "SPI", "AMBA"].map(s => (
                <div key={s} className="px-5 py-2 border border-white/10 hover:border-white/30 rounded-3xl transition-colors">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ELECTRONICS VISUAL LAB - INTERACTIVE SYMBOLS */}
      <section className="py-20 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="uppercase text-xs tracking-[2px] text-violet-400 mb-3">CHAPTER 04.5 — VISUAL LAB</div>
              <h2 className="text-6xl font-semibold tracking-tighter">ELECTRONICS SYMBOLS</h2>
              <p className="text-white/60 max-w-md">Hover over components to see signal flow animations</p>
            </div>
            <div className="text-xs font-mono text-white/40">INTERACTIVE • REAL-TIME</div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: <Antenna className="w-10 h-10" />, label: "ANTENNA", color: "text-violet-400" },
              { icon: <Battery className="w-10 h-10" />, label: "BATTERY", color: "text-amber-400" },
              { icon: <Gauge className="w-10 h-10" />, label: "SENSOR", color: "text-cyan-400" },
              { icon: <Radio className="w-10 h-10" />, label: "TRANSCEIVER", color: "text-rose-400" },
              { icon: <Signal className="w-10 h-10" />, label: "SIGNAL", color: "text-emerald-400" },
              { icon: <Waves className="w-10 h-10" />, label: "WAVEFORM", color: "text-sky-400" },
              { icon: <Cpu className="w-10 h-10" />, label: "FPGA", color: "text-fuchsia-400" },
              { icon: <Zap className="w-10 h-10" />, label: "POWER", color: "text-yellow-400" },
              { icon: <Activity className="w-10 h-10" />, label: "OSCILLOSCOPE", color: "text-lime-400" },
              { icon: <CircuitBoard className="w-10 h-10" />, label: "PCB", color: "text-teal-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: [0, 3, -3, 0],
                  transition: { duration: 0.4 }
                }}
                className="electronics-icon group bg-zinc-900 border border-white/10 hover:border-white/30 p-8 rounded-3xl flex flex-col items-center justify-center gap-6 cursor-pointer relative overflow-hidden"
              >
                <div className={`${item.color} transition-all group-hover:scale-110 duration-500`}>
                  {item.icon}
                </div>
                <div className="font-mono text-xs tracking-widest text-white/60 group-hover:text-white text-center">{item.label}</div>
                
                {/* Animated ring */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-3xl transition-all"></div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs px-5 py-2 bg-white/5 rounded-3xl text-white/50">
              <div className="w-px h-3 bg-white/40"></div>
              PROTOTYPING IN THE LAB • 24/7
              <div className="w-px h-3 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATION */}
      <section id="publications" className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center gap-6 mb-12">
            <BookOpen className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="uppercase text-xs tracking-[2px] text-emerald-400">CHAPTER 05 — RESEARCH</div>
              <h2 className="text-6xl font-semibold tracking-tighter">PUBLICATIONS</h2>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="border border-white/10 p-16 rounded-3xl bg-zinc-900/40"
          >
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline text-xs font-mono bg-white/5 px-6 py-2 rounded-3xl mb-6">IEEE ACCEPTED</div>
              <h3 className="text-4xl leading-tight font-medium mb-8">
                Power and Area Optimized FFT Architecture Through Multiplier-Level Hardware Design
              </h3>
              <p className="text-white/70 max-w-xs mx-auto">
                Presents a hardware-efficient FFT implementation using optimized multiplier architectures on FPGA.
              </p>
              <div className="mt-16 text-xs uppercase font-mono tracking-widest">To be published with IEEE</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-400/60 text-amber-400 rounded-3xl text-sm mb-6">
              <Award className="w-4 h-4" /> RECOGNITION
            </div>
            <h2 className="text-5xl font-semibold tracking-tight">Achievements &amp; Leadership</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Finalist",
                desc: "OneAPI Intel AI Hackathon",
                icon: <Award className="w-9 h-9" />
              },
              {
                title: "Participant",
                desc: "Smart India Hackathon",
                icon: <Award className="w-9 h-9" />
              },
              {
                title: "Team Leader",
                desc: "Smart India Hackathon & College Projects",
                icon: <Briefcase className="w-9 h-9" />
              }
            ].map((ach, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900 rounded-3xl p-10 border border-white/5 hover:border-amber-400/30 group"
              >
                <div className="text-amber-400 mb-8 transition-all group-hover:scale-110">{ach.icon}</div>
                <div className="text-4xl font-semibold mb-3 tracking-tighter">{ach.title}</div>
                <div className="text-xl text-white/70">{ach.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-emerald-400 text-sm font-mono tracking-[4px]">NEXT STEP</div>
          <h2 className="text-6xl font-semibold tracking-tighter mt-3 mb-6">Let's connect the circuits</h2>
          <p className="text-xl text-white/70 max-w-md mx-auto">Open to full-time roles, research collaborations or interesting conversations about electronics.</p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-16">
            <motion.a 
              href="mailto:ezhilkirthikm@gmail.com"
              whileHover={{ scale: 1.03 }}
              className="flex-1 max-w-xs mx-auto sm:mx-0 flex items-center justify-center gap-4 border border-white/70 hover:bg-white hover:text-black py-6 rounded-3xl text-xl font-medium transition-colors"
            >
              <Mail className="w-6 h-6" />
              SEND EMAIL
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com/in/ezhilkirthikm"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              className="flex-1 max-w-xs mx-auto sm:mx-0 flex items-center justify-center gap-4 bg-white text-black py-6 rounded-3xl text-xl font-medium transition-all"
            >
              <Linkedin className="w-6 h-6" />
              CONNECT ON LINKEDIN
            </motion.a>
          </div>
          
          <div className="mt-20 text-xs text-white/30 font-mono">© 2025 EZHILKIRTHIK M • BUILT WITH PASSION FOR ELECTRONICS</div>
        </div>
      </section>

      {/* Footer bar */}
      <div className="h-16 bg-black border-t border-white/10 flex items-center justify-center text-xs font-mono text-white/30">
        DESIGNED TO INSPIRE • ENGINEERED TO PERFORM
      </div>
    </div>
  );
}
