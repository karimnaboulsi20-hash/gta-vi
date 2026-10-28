/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, ShieldCheck, Zap, Code, 
  Terminal, DollarSign, CheckCircle2, ChevronDown, ChevronUp, Star, 
  Users, Trophy, ArrowRight, Lock, Sparkles, HelpCircle, AlertCircle,
  Clock, Flame, Check, CreditCard, X, MessageSquare, Timer
} from 'lucide-react';

export default function App() {
  // VSL State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(342); // 5:42 video duration
  const [showTranscript, setShowTranscript] = useState(false);
  const [viewerCount, setViewerCount] = useState(1482);

  // Black Friday Countdown Timer State (e.g. 11 hours 42 mins 15 secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 15 });

  // Income Calculator State
  const [mapsPerMonth, setMapsPerMonth] = useState(4);
  const [pricePerMap, setPricePerMap] = useState(1500);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', paymentMethod: 'pix' });

  // Simulated VSL timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Randomize viewer count slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Black Friday countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor, preencha seu nome e e-mail.');
      return;
    }
    setCheckoutStep('success');
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-rose-500 selection:text-white overflow-x-hidden">
      
      {/* BLACK FRIDAY TOP BANNER */}
      <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg z-50 relative">
        <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>BLACK FRIDAY EXCLUSIVE: 80% de Desconto + Bônus Secretos por Tempo Limitado!</span>
        <div className="hidden md:flex items-center gap-1 bg-black/30 px-2.5 py-0.5 rounded-full font-mono text-amber-300 ml-4">
          <Timer className="w-3.5 h-3.5" />
          <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* TOP BAR CONTRACT (3 Zones - Nav links removed per focus request) */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-500 flex items-center justify-center font-extrabold text-white shadow-lg shadow-rose-500/20">
            GTA
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Mestres do <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400">GTA 6 RP</span>
          </span>
        </a>

        {/* Zone 2: Empty space (nav links removed) */}
        <div className="hidden md:block"></div>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-lg shadow-lg shadow-rose-600/30 transition-all transform hover:scale-105 whitespace-nowrap shrink-0"
          >
            Garantir Black Friday
          </button>
        </div>
      </header>

      {/* HERO SECTION WITH VSL */}
      <section id="vsl" className="relative pt-12 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Top Urgency Banner */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>⚡ DESCONTO DE BLACK FRIDAY: Economize R$ 800 HOJE!</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Como Faturar de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400">R$ 5.000 a R$ 20.000 por Mês</span> Programando Mapas para o GTA VI RP Usando Apenas IA
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Descubra o método inédito que permite a qualquer iniciante criar mapas, cidades e sistemas hiper-realistas para servidores FiveM e GTA 6 RP em minutos — <strong className="text-white">sem saber escrever uma única linha de código.</strong>
          </p>
        </div>

        {/* VSL VIDEO PLAYER CONTAINER */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl shadow-rose-950/40">
          
          {/* Live Viewer badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-xs font-medium text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>🔴 {viewerCount} pessoas assistindo agora</span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-rose-600/90 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
            🔥 Black Friday Ativa
          </div>

          {/* Video Screen / Poster */}
          <div className="relative aspect-video w-full bg-slate-900 group cursor-pointer overflow-hidden" onClick={() => setIsPlaying(!isPlaying)}>
            <img 
              src="/src/assets/images/gta6_hero_banner_1793160202521.jpg" 
              alt="GTA 6 RP Map Maker Preview" 
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 opacity-90' : 'group-hover:scale-105'}`}
            />
            
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col items-center justify-center">
              {!isPlaying && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white shadow-2xl shadow-rose-600/60 transform transition-transform group-hover:scale-110">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                </div>
              )}

              {!isPlaying && (
                <div className="mt-4 text-center px-4">
                  <p className="text-white font-bold text-lg sm:text-xl drop-shadow-md">CLIQUE PARA ASSISTIR À APRESENTAÇÃO SECRETA</p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">Descubra o segredo por trás do mercado bilionário do GTA RP</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Controls Bar */}
          <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 flex flex-col gap-2">
            {/* Progress bar */}
            <div className="relative w-full h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.floor(pos * duration));
            }}>
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-cyan-500 transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-rose-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-rose-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  {showTranscript ? 'Ocultar Transcrição' : 'Ver Transcrição'}
                </button>
                <button 
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) el.requestFullscreen();
                    else document.exitFullscreen();
                  }}
                  className="text-white hover:text-rose-400 transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Transcript Drawer */}
          {showTranscript && (
            <div className="bg-slate-950 p-6 border-t border-slate-800 text-sm text-slate-300 max-h-60 overflow-y-auto space-y-3 font-sans">
              <h4 className="font-bold text-white mb-2">Transcrição do Vídeo Exclusivo:</h4>
              <p><strong>[0:00]</strong> "Se você acha que precisa passar 5 anos na faculdade de Ciência da Computação para ganhar dinheiro com jogos, você está completamente errado..."</p>
              <p><strong>[1:15]</strong> "Com a chegada explosiva do ecossistema do GTA 6 RP e o avanço das IAs generativas, qualquer pessoa pode criar mapas personalizados de alto padrão em questão de minutos."</p>
              <p><strong>[2:30]</strong> "Donos de servidores estão pagando entre R$ 1.500 e R$ 5.000 por cada mapa ou sistema otimizado. Aproveite o preço de Black Friday porque essa condição vai sair do ar em breve..."</p>
            </div>
          )}
        </div>

        {/* Hero CTA Button */}
        <div className="text-center mt-10">
          <button 
            onClick={scrollToPricing}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold text-lg sm:text-xl rounded-2xl shadow-2xl shadow-rose-600/50 transform transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto"
          >
            <span>QUERO GARANTIR O DESCONTO DE BLACK FRIDAY</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-xs text-slate-400 mt-3">⚡ Oferta exclusiva de Black Friday — Desconto válido apenas hoje.</p>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+R$ 2.4 Milhões</div>
            <div className="text-xs text-slate-400 mt-1">Faturados por alunos no último ano</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+1.250</div>
            <div className="text-xs text-slate-400 mt-1">Servidores de GTA RP usando nossos mapas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Zero</div>
            <div className="text-xs text-slate-400 mt-1">Conhecimento prévio em programação necessário</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100% com IA</div>
            <div className="text-xs text-slate-400 mt-1">Metodologia 100% validada e prática</div>
          </div>
        </div>
      </section>

      {/* WHY GTA 6 RP + AI IS THE BIGGEST GOLDMINE */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O Maior Boom da História dos Games</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Por que o Mercado de GTA VI RP vai Criar os Novos Milionários Digitais?
            </h2>
            <p className="text-slate-300 mb-4 leading-relaxed">
              O lançamento do GTA VI vai movimentar bilhões de dólares em servidores de Roleplay. Donos de servidores do mundo todo estão desesperados por mapas exclusivos, ilhas paradisíacas, boates futuristas e sistemas otimizados.
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Antigamente, você precisaria de uma equipe de 10 programadores e designers 3D trabalhando por meses. <strong className="text-white">Hoje, com as técnicas avançadas de IA que ensinamos, você faz o trabalho de um mês em apenas 45 minutos.</strong>
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Demanda infinita por novos mapas e otimizações.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Margem de lucro de quase 100% (custo zero com infraestrutura).</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Trabalhe de casa, direto do seu computador, cobrando em Reais ou Dólares.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-500 to-cyan-500 opacity-30 blur-xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img 
                src="/src/assets/images/course_module_ai_1793160202557.jpg" 
                alt="AI Code Generator Dashboard" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INCOME CALCULATOR SECTION */}
      <section id="calculator" className="py-20 px-4 md:px-8 bg-slate-950/80 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-4">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Simulador de Faturamento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Quanto Você Pode Ganhar por Mês?
          </h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Simule seu potencial de ganhos criando mapas automatizados por IA para servidores de GTA RP.
          </p>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Slider 1 */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex justify-between">
                  <span>Mapas Criados por Mês:</span>
                  <span className="text-rose-400 font-mono text-lg">{mapsPerMonth} mapas</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={mapsPerMonth} 
                  onChange={(e) => setMapsPerMonth(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1 mapa</span>
                  <span>15 mapas</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex justify-between">
                  <span>Preço Médio Cobrado por Mapa:</span>
                  <span className="text-cyan-400 font-mono text-lg">R$ {pricePerMap.toLocaleString('pt-BR')}</span>
                </label>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="250"
                  value={pricePerMap} 
                  onChange={(e) => setPricePerMap(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>R$ 500</span>
                  <span>R$ 5.000</span>
                </div>
              </div>
            </div>

            {/* Total Result Box */}
            <div className="bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-cyan-950/40 border border-rose-500/30 rounded-xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Seu Faturamento Potencial Estimado:</p>
              <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 font-mono my-2">
                R$ {(mapsPerMonth * pricePerMap).toLocaleString('pt-BR')},00 <span className="text-sm text-slate-400 font-sans font-normal">/ mês</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Trabalhando poucas horas por semana com auxílio de Inteligência Artificial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & BLACK FRIDAY OFFER SECTION */}
      <section id="pricing-section" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-rose-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl shadow-rose-950/50">
          
          <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-600 to-amber-600 text-white text-xs font-extrabold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg animate-pulse">
            ⚡ BLACK FRIDAY: 80% OFF
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Garanta Sua Vaga com Preço Exclusivo de Black Friday
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Este super desconto de R$ 800 só é válido durante esta semana de Black Friday. Depois o preço volta ao normal!
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-black/40 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8 text-center">
            <div className="inline-block bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
              Economia de R$ 800,00 HOJE
            </div>
            <div className="text-slate-400 text-sm line-through mb-1 font-mono">De R$ 997,00 por apenas:</div>
            <div className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-cyan-400 font-mono mb-2">
              R$ 197 <span className="text-sm font-sans text-slate-400 font-normal">à vista</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">ou em até 12x de R$ 19,70 no cartão de crédito</p>

            <div className="space-y-3 text-left mb-8 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Acesso vitalício a todos os Módulos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Pack com +100 Prompts Prontos para IA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Comunidade VIP no Discord com Donos de Servidores</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Bônus Black Friday: Mentoria em Grupo Ao Vivo</span>
              </div>
            </div>

            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-5 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold text-lg rounded-xl shadow-xl shadow-rose-600/40 transform transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>APROVEITAR BLACK FRIDAY AGORA</span>
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center justify-center gap-4 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-white text-sm">Garantia Incondicional de 7 Dias</h4>
              <p className="text-xs text-slate-400">Se você não gostar ou achar que não é para você, devolvemos 100% do seu dinheiro sem burocracia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-300">
            Tudo o que você precisa saber antes de dar o próximo passo.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Preciso saber programar ou ter experiência anterior?",
              a: "Absolutamente não! O treinamento foi desenhado exatamente para quem é iniciante absoluto. A inteligência artificial faz todo o trabalho pesado de programação; você só precisa saber direcionar com os comandos certos que ensinamos."
            },
            {
              q: "Por que o preço está tão baixo (Black Friday)?",
              a: "Esta é nossa campanha anual de Black Friday. Decidimos liberar o treinamento completo por apenas R$ 197 para formar a maior turma de programadores de GTA RP do Brasil antes do lançamento oficial do GTA 6."
            },
            {
              q: "Como vou receber o acesso ao treinamento?",
              a: "Imediatamente após a confirmação do pagamento (via PIX ou cartão), você receberá os dados de acesso em seu e-mail cadastrado."
            },
            {
              q: "O mercado de GTA RP realmente paga bem?",
              a: "Sim. Donos de servidores de GTA RP movimentam milhares de reais mensalmente com doações e VIPs. Eles investem pesado em mapas exclusivos e otimizados para atrair jogadores."
            },
            {
              q: "E se eu não gostar do curso?",
              a: "Você tem 7 dias de garantia total. Basta nos enviar um único e-mail e devolveremos 100% do seu investimento, sem perguntas."
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-800 bg-slate-900 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base"
              >
                <span>{item.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-0 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center justify-center font-extrabold text-white text-xs">
              GTA
            </div>
            <span className="text-sm font-bold text-slate-300">Mestres do GTA 6 RP com IA — Edição Black Friday</span>
          </div>
          <p>© 2026 Mestres do GTA RP. Todos os direitos reservados. Este site não é afiliado à Rockstar Games.</p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('form'); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {checkoutStep === 'form' ? (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2">
                    <Lock className="w-3 h-3" /> Checkout Black Friday Seguro
                  </div>
                  <h3 className="text-xl font-bold text-white">Finalizar Inscrição</h3>
                  <p className="text-xs text-slate-400 mt-1">Mestres do GTA 6 RP com IA — R$ 197 (80% OFF)</p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">E-mail (para envio dos dados)</label>
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Telefone</label>
                    <input 
                      type="text" 
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Forma de Pagamento</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'pix'})}
                        className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'pix' ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'}`}
                      >
                        <Zap className="w-4 h-4 text-emerald-400" /> PIX (Aprovação Imediata)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                        className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'card' ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'}`}
                      >
                        <CreditCard className="w-4 h-4 text-cyan-400" /> Cartão 12x
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold rounded-xl shadow-lg shadow-rose-600/30 transition-all text-sm"
                    >
                      GARANTIR PREÇO DE BLACK FRIDAY (R$ 197)
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Inscrição Pré-Confirmada!</h3>
                <p className="text-slate-300 text-sm mb-6">
                  Parabéns, <strong>{formData.name}</strong>! Sua vaga de Black Friday foi garantida e as instruções foram enviadas para <span className="text-rose-400">{formData.email}</span>.
                </p>
                <button 
                  onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('form'); }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase"
                >
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
