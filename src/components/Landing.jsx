import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@formspree/react';

// Backgrounds
import fondoCard2 from '../assets/fondoCard2.webp';
import mapaCompleto from '../assets/mapaCompleto.svg';
import fondoFinal from '../assets/fondoFinal.svg';

// Images & SVGs
import cardImg from '../assets/card.webp';
import mapaImg from '../assets/mapa.webp';
import teleSvg from '../assets/tele.svg';
import espiralSvg from '../assets/espiral.svg';
import puertaSvg from '../assets/puerta.svg';
import aireSvg from '../assets/aire.svg';
import diaSvg from '../assets/dia.svg';
import nocheSvg from '../assets/noche.svg';

export default function Landing() {
  const [state, handleSubmit] = useForm('xdekovjd');

  // Contador de tiempo real hacia el 24 de octubre a las 18:00 hs
  const [timeLeft, setTimeLeft] = useState(() => {
    const target = new Date('2026-10-24T18:00:00');
    const now = new Date();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    const target = new Date('2026-10-24T18:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailInput = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value.includes('@')) {
      e.target.setCustomValidity('');
      return;
    }
    
    const domain = value.split('@')[1];
    const validDomains = [
      'gmail.com', 'hotmail.com', 'hotmail.com.ar', 'hotmail.es',
      'yahoo.com', 'yahoo.com.ar', 'yahoo.es', 'outlook.com',
      'outlook.com.ar', 'outlook.es', 'live.com', 'live.com.ar',
      'icloud.com', 'aol.com', 'protonmail.com', 'proton.me',
      'me.com', 'mac.com', 'alumnos.unlp.edu.ar', 'unlp.edu.ar',
      'fba.unlp.edu.ar', 'alumnos.info.unlp.edu.ar'
    ];

    if (domain && !validDomains.includes(domain)) {
      e.target.setCustomValidity('Por favor ingresá un dominio de correo real (ej. gmail.com, hotmail.com, yahoo.com.ar)');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: false, amount: 0.2 },
  };

  return (
    <div className="flex flex-col w-full max-w-[400px] mx-auto min-h-screen">
      {/* 1. SECCIÓN CARD: fondoCard2.webp */}
      <section
        id="card"
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6 text-center relative"
        style={{ backgroundImage: `url(${fondoCard2})` }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.h2
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="text-[#FF94DA] text-3xl md:text-4xl font-bold tracking-wide drop-shadow-md mb-8 leading-tight text-center"
          >
            ¿Qué mundo<br />te espera?
          </motion.h2>

          {/* Card conteniendo el SVG dia */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            viewport={fadeUp.viewport}
            className="relative w-56 h-56 flex items-center justify-center p-6"
          >
            <img
              src={cardImg}
              alt="Card Frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xl"
            />
            <img
              src={diaSvg}
              alt="Día"
              className="relative z-10 w-28 h-28 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* Wrapper continuo para las últimas 3 secciones: Mapa, Fecha y Formulario */}
      <div
        className="bg-[url('./assets/mapaCompleto.svg')] bg-cover bg-top bg-no-repeat w-full flex flex-col"
        style={{ backgroundImage: `url(${mapaCompleto})` }}
      >
        {/* 2. SECCIÓN MAPA: fondo transparente */}
        <section
          id="mapa"
          className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative bg-transparent"
        >
          <div className="w-full flex flex-col items-center py-6">
            <motion.h2
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={fadeUp.transition}
              viewport={fadeUp.viewport}
              className="w-full max-w-[320px] text-left font-naiveer text-[#FF94DA] text-3xl tracking-wider mb-4 drop-shadow-md"
            >
              mapa de oniria
            </motion.h2>

            {/* Imagen importada mapa.webp */}
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              viewport={fadeUp.viewport}
              className="w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-xl border border-[#F1EEE7]/50 mb-6 bg-white/10"
            >
              <img
                src={mapaImg}
                alt="Mapa de Oniria"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Lista vertical de 4 ítems: 1: dia.svg, 2: puerta.svg, 3: tele.svg, 4: espiral.svg */}
            <div className="w-full max-w-[340px] px-2 flex flex-col divide-y divide-[#FF94DA]/70">
              {[
                {
                  num: '01',
                  title: 'Los símbolos',
                  icon: diaSvg,
                },
                {
                  num: '02',
                  title: '???',
                  icon: puertaSvg,
                },
                {
                  num: '03',
                  title: '???',
                  icon: teleSvg,
                },
                {
                  num: '04',
                  title: '???',
                  icon: espiralSvg,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.num}
                  initial={fadeUp.initial}
                  whileInView={fadeUp.whileInView}
                  transition={{ ...fadeUp.transition, delay: 0.25 + index * 0.1 }}
                  viewport={fadeUp.viewport}
                  className="flex items-center gap-4 py-3.5 text-left text-[#F1EEE7]"
                >
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                  <span className="font-medium text-base tracking-wide text-[#F1EEE7]">
                    {item.num} - {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SECCIÓN FECHA: fondo transparente */}
        <section
          id="fecha"
          className="min-h-screen w-full flex flex-col items-center justify-between p-8 text-center relative overflow-hidden text-[#F1EEE7] bg-transparent"
        >
          <div className="w-full flex flex-col items-center pt-10">
            {/* Logo superior: dia.svg achicado y con separación equilibrada */}
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={fadeUp.transition}
              viewport={fadeUp.viewport}
              className="flex flex-col items-center pt-8"
            >
              <div className="w-8 h-8 mb-8 flex items-center justify-center">
                <img
                  src={diaSvg}
                  alt="Día Oniria"
                  className="w-full h-full object-contain filter drop-shadow animate-pulse"
                />
              </div>

              <h2 className="font-naiveer text-[#F1EEE7] text-3xl tracking-wider mb-2 drop-shadow-md">
                proximo vagari
              </h2>
            </motion.div>

            {/* Contador grande en tiempo real sin fondo con segundos activos */}
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              viewport={fadeUp.viewport}
              className="flex items-center justify-center gap-2 mt-8 mb-12 px-2 py-2"
            >
              <div className="flex flex-col items-center min-w-[44px]">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1EEE7]">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#F1EEE7]/80">días</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold -mt-3 text-[#F1EEE7]/50">:</span>
              <div className="flex flex-col items-center min-w-[44px]">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1EEE7]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#F1EEE7]/80">horas</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold -mt-3 text-[#F1EEE7]/50">:</span>
              <div className="flex flex-col items-center min-w-[44px]">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1EEE7]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#F1EEE7]/80">minutos</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold -mt-3 text-[#F1EEE7]/50">:</span>
              <div className="flex flex-col items-center min-w-[44px]">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1EEE7]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#F1EEE7]/80">segundos</span>
              </div>
            </motion.div>

            {/* Texto de ubicación y fecha del evento */}
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.35 }}
              viewport={fadeUp.viewport}
              className="flex flex-col items-center text-center"
            >
              <p className="font-semibold text-[#F1EEE7] text-lg leading-snug drop-shadow-sm">
                Facultad de Artes<br />Sede Fonseca
              </p>
              <p className="mt-4 text-sm font-semibold tracking-wider text-[#F1EEE7]/90 drop-shadow-sm">
                24/10 - 18:00 hs
              </p>
              <p className="mt-1 text-xs text-[#F1EEE7]/70">Entrada libre y gratuita</p>
            </motion.div>
          </div>

          <div className="pb-4" />
        </section>

        {/* 4. SECCIÓN FORMULARIO: fondo transparente */}
        <section
          id="formulario"
          className="min-h-screen w-full flex flex-col justify-between p-8 text-center relative bg-transparent overflow-hidden"
        >
        <div className="w-full flex flex-col items-center pt-8 relative z-10">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="flex flex-col items-start w-full max-w-[300px] text-left"
          >
            <h1 className="font-naiveer text-4xl text-[#F1EEE7] tracking-wider mb-2 drop-shadow-md">
              vagari
            </h1>
            <p className="text-sm text-[#24251E] leading-relaxed mb-3 drop-shadow-sm">
              ¿Alguna vez te preguntaste <span className="font-bold">de qué estan hechos los sueños</span>?
            </p>
            <p className="text-xs text-[#24251E]/90 leading-relaxed mb-6">
              <span className="font-bold">Las primeras señales ya aprecieron.</span> Dejanos tus datos y seguí el rastro:
            </p>
          </motion.div>

          {/* Formulario siempre visible */}
          <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-4 relative z-10">
            <motion.input
              type="text"
              name="nombre"
              placeholder="Nombre"
              required
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              viewport={fadeUp.viewport}
              className="w-full bg-[#F1EEE7]/60 border border-[#F1EEE7] focus:border-[#FF94DA] focus:bg-[#F1EEE7]/80 px-4 py-3 rounded-2xl outline-none text-sm text-[#24251E] placeholder:text-[#24251E]/60 transition"
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Mail"
              required
              onInput={handleEmailInput}
              title="Por favor, ingresá un correo electrónico válido (ejemplo: nombre@dominio.com)"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.25 }}
              viewport={fadeUp.viewport}
              className="w-full bg-[#F1EEE7]/60 border border-[#F1EEE7] focus:border-[#FF94DA] focus:bg-[#F1EEE7]/80 px-4 py-3 rounded-2xl outline-none text-sm text-[#24251E] placeholder:text-[#24251E]/60 transition invalid:focus:border-red-400"
            />
            <motion.button
              type="submit"
              disabled={state.submitting}
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.35 }}
              viewport={fadeUp.viewport}
              className="w-full mt-2 bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-98 transition duration-200 text-[#24251E] font-semibold py-3 rounded-2xl shadow-md text-sm lowercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? 'enviando...' : 'registrarme'}
            </motion.button>
          </form>

          {/* Popup de éxito */}
          {state.succeeded && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#24251E]/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[320px] bg-[#F1EEE7] border border-[#FF94DA] rounded-3xl p-8 shadow-2xl text-center relative"
              >
                <h3 className="font-naiveer text-[#FF94DA] text-3xl mb-4 drop-shadow-sm">¡gracias!</h3>
                <p className="text-sm font-medium text-[#24251E] leading-relaxed mb-8">
                  Tus datos fueron enviados correctamente. Mantenete alerta a las señales.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full bg-[#FF94DA] hover:bg-[#ff7fd2] transition text-[#24251E] font-semibold py-3 rounded-xl text-sm uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Cerrar
                </button>
              </motion.div>
            </div>
          )}
        </div>

        {/* Fondo final: sobre mapaCompleto, detrás de las redes */}
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0">
          <img
            src={fondoFinal}
            alt=""
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        {/* Pie: Redes Sociales centradas */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          viewport={fadeUp.viewport}
          className="w-full py-6 flex flex-col items-center gap-3 mt-6 relative z-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#24251E]">
            <a
              href="https://instagram.com/somos.oniria"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF94DA] transition"
            >
              @somos.oniria
            </a>
            <span className="text-[#24251E]/40">|</span>
            <a
              href="https://instagram.com/oniria.tdm3"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF94DA] transition"
            >
              @oniria.tdm3
            </a>
            <span className="text-[#24251E]/40">|</span>
            <a
              href="https://tiktok.com/@somos.oniria"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF94DA] transition"
            >
              @somos.oniria
            </a>
          </div>
          <span className="text-[11px] text-[#24251E]/70">
            © 2026 Oniria Project • Todos los derechos reservados
          </span>
        </motion.div>
      </section>
      </div>
    </div>
  );
}

