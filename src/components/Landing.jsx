import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@formspree/react';

// Backgrounds
import fondoCard from '../assets/fondoCard.webp';
import mapaCompleto from '../assets/mapaCompleto.svg';
import fondoFinal from '../assets/fondoFinal.svg';

// Images & SVGs
import cardImg from '../assets/card.webp';
import mapaImg from '../assets/mapa.webp';
import teleSvg from '../assets/tele.svg';
import espiralSvg from '../assets/espiral.svg';
import puertaSvg from '../assets/puerta.svg';
import aguaSvg from '../assets/agua.svg';
import aireSvg from '../assets/aire.svg';
import colorSvg from '../assets/color.svg';
import diaSvg from '../assets/dia.svg';
import fuegoSvg from '../assets/fuego.svg';
import mixtoSvg from '../assets/mixto.svg';
import monocromoSvg from '../assets/monocromo.svg';
import nocheSvg from '../assets/noche.svg';
import organicoSvg from '../assets/organico.svg';
import tecnologicoSvg from '../assets/tecnologico.svg';
import tierraSvg from '../assets/tierra.svg';
import ubicacionImg from '../assets/ubicacion.webp';
import nubeArriba from '../assets/NubeArriba.svg';
import nubeDerecha from '../assets/nubeDerecha.svg';
import nubeIzquierda from '../assets/NubeIzquierda.svg';
import pastoVagari from '../assets/pastoVagari.png';

const SYMBOLS = [
  { name: 'agua', src: aguaSvg },
  { name: 'aire', src: aireSvg },
  { name: 'color', src: colorSvg },
  { name: 'dia', src: diaSvg },
  { name: 'fuego', src: fuegoSvg },
  { name: 'mixto', src: mixtoSvg },
  { name: 'monocromo', src: monocromoSvg },
  { name: 'noche', src: nocheSvg },
  { name: 'organico', src: organicoSvg },
  { name: 'tecnologico', src: tecnologicoSvg },
  { name: 'tierra', src: tierraSvg }
];

export default function Landing() {
  const [state, handleSubmit] = useForm('xdekovjd');
  const [showModal, setShowModal] = useState(false);
  
  const [randomSymbol] = useState(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowModal(true);
    }
  }, [state.succeeded]);

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
    <div className="flex flex-col w-full max-w-[430px] mx-auto min-h-screen">
      {/* 1. SECCIÓN CARD: fondoCard.webp */}
      <section
        id="card"
        className="min-h-[100svh] min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        style={{ backgroundImage: `url(${fondoCard})` }}
      >
        {/* Nube superior apareciendo desde arriba */}
        <motion.img
          src={nubeArriba}
          alt=""
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0 }}
          className="absolute -top-20 right-0 w-64 md:w-80 object-contain pointer-events-none z-0"
        />

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

          {/* Card interactiva */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            viewport={fadeUp.viewport}
            className="relative w-56 h-56 cursor-pointer"
            style={{ perspective: 1000 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Frente */}
              <div 
                className="absolute inset-0 flex items-center justify-center p-6" 
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={cardImg}
                  alt="Card Frame"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xl"
                />
                <img
                  src={randomSymbol.src}
                  alt={randomSymbol.name}
                  className="relative z-10 w-28 h-28 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Dorso */}
              <div 
                className="absolute inset-0 flex items-center justify-center p-6" 
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <img
                  src={cardImg}
                  alt="Card Frame Dorso"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xl"
                />
                <div className="relative z-10 font-naiveer text-[#F1EEE7] text-4xl tracking-widest drop-shadow-md text-center">
                  {randomSymbol.name}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wrapper continuo para las últimas 3 secciones: Mapa, Fecha y Formulario */}
      <div
        className="w-full flex flex-col relative bg-no-repeat bg-top"
        style={{
          backgroundImage: `url(${mapaCompleto})`,
          backgroundSize: '100% 100%',
        }}
      >
        {/* Nubes laterales (entre la primera y segunda sección, deslizando desde los bordes) */}
        <motion.img
          src={nubeIzquierda}
          alt=""
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0, margin: "100px" }}
          className="absolute -top-32 -left-20 md:-left-32 w-48 md:w-64 object-contain pointer-events-none z-0"
        />
        <motion.img
          src={nubeDerecha}
          alt=""
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0, margin: "100px" }}
          className="absolute -top-56 right-0 w-48 md:w-64 object-contain pointer-events-none z-0"
        />
        {/* 2. SECCIÓN MAPA: fondo transparente */}
        <section
          id="mapa"
          className="w-full flex flex-col items-center justify-center p-6 text-center relative bg-transparent"
          style={{ height: 'calc(min(100vw, 430px) * 1.966)' }}
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

            {/* Lista vertical de 4 ítems */}
            <div className="w-full max-w-[340px] px-2 flex flex-col divide-y divide-[#FF94DA]/70">
              {[
                {
                  num: '01',
                  title: 'Los símbolos',
                  icon: randomSymbol.src,
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

        {/* 3. SECCIÓN FECHA: fondo transparente - distribuye los 3 bloques en todo el alto */}
        <section
          id="fecha"
          className="w-full flex flex-col items-center justify-between px-6 pt-10 pb-20 text-center relative overflow-visible text-[#F1EEE7] bg-transparent"
          style={{ height: 'calc(min(100vw, 430px) * 1.966)' }}
        >
          {/* 1. Uno arriba junto al logo */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="flex flex-col items-center relative z-10"
          >
            <div className="w-8 h-8 mb-10 flex items-center justify-center">
              <img
                src={randomSymbol.src}
                alt={randomSymbol.name}
                className="w-full h-full object-contain filter drop-shadow animate-pulse"
              />
            </div>

            <h2 className="font-naiveer text-[#F1EEE7] text-3xl md:text-4xl tracking-wider drop-shadow-md">
              proximo vagari
            </h2>
          </motion.div>

          {/* 2. El contador en el medio */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            viewport={fadeUp.viewport}
            className="flex items-center justify-center gap-2 my-auto py-10 px-2 relative z-10"
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

          {/* 3. Facultad de artes abajo con espacio reservado al borde inferior */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            viewport={fadeUp.viewport}
            className="flex flex-col items-center text-center relative z-10 mb-20"
          >
            <p className="font-semibold text-[#F1EEE7] text-lg leading-snug drop-shadow-sm">
              Facultad de Artes<br />Sede Fonseca
            </p>
            <p className="mt-4 text-sm font-semibold tracking-wider text-[#F1EEE7]/90 drop-shadow-sm">
              24/10 - 18:00 hs
            </p>
          </motion.div>

          {/* Decoraciones Vagari: Imagen unificada animada desde la derecha */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Imagen unificada: restaurada a bottom-0 y movida a right-0 para asomar la puerta. Sin animación. */}
            <img
              src={pastoVagari}
              alt=""
              className="absolute bottom-0 right-0 w-[150%] max-w-[800px] object-contain z-[1]"
            />
          </div>
        </section>

        {/* 4. SECCIÓN FORMULARIO: fondo transparente */}
        <section
          id="formulario"
          className="w-full flex flex-col justify-between items-center px-6 pt-6 pb-4 text-center relative bg-transparent overflow-hidden"
          style={{ height: 'calc(min(100vw, 430px) * 1.966)' }}
        >
          {/* Bloque superior: Título vagari y primer subtítulo */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="flex flex-col w-full max-w-[320px] relative z-10 mt-24"
          >
            <h1 className="font-naiveer text-6xl text-[#F1EEE7] tracking-wider mb-6 drop-shadow-md text-left">
              vagari
            </h1>
            <p className="text-lg md:text-xl text-[#24251E] leading-snug drop-shadow-sm text-left font-medium">
              ¿Alguna vez te preguntaste<br />
              <span className="font-bold">de qué estan hechos los<br />sueños?</span>
            </p>
          </motion.div>

          {/* Bloque central: Segundo subtítulo y Formulario centrados verticalmente */}
          <div className="w-full flex flex-col items-center relative z-10 my-auto py-4">
            {/* Contenedor relativo del subtítulo con la señal 1 (arriba a la derecha) */}
            <div className="relative w-full max-w-[340px] flex flex-col items-center">
              {/* Señal 1: Por encima del subtítulo a la derecha */}
              <motion.img
                src={ubicacionImg}
                alt=""
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                viewport={fadeUp.viewport}
                className="absolute -top-6 right-6 w-9 h-9 object-contain pointer-events-none z-0 filter drop-shadow-sm select-none"
              />

              <motion.p
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                viewport={fadeUp.viewport}
                className="text-base md:text-lg text-[#24251E]/90 leading-snug mb-5 text-center w-full px-1 relative z-10"
              >
                <span className="font-bold">Las primeras señales ya<br />aprecieron.</span><br />
                Dejanos tus datos y<br />seguí el rastro:
              </motion.p>
            </div>

            {/* Formulario siempre visible con señales detrás de los campos */}
            <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-4 relative z-10">
              {/* Campo Nombre con Señal 2 detrás a la izquierda */}
              <div className="relative w-full">
                <motion.img
                  src={ubicacionImg}
                  alt=""
                  initial={fadeUp.initial}
                  whileInView={fadeUp.whileInView}
                  transition={{ ...fadeUp.transition, delay: 0.2 }}
                  viewport={fadeUp.viewport}
                  className="absolute -top-4 left-6 w-9 h-9 object-contain pointer-events-none z-0 filter drop-shadow-sm select-none"
                />
                <motion.input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                  initial={fadeUp.initial}
                  whileInView={fadeUp.whileInView}
                  transition={{ ...fadeUp.transition, delay: 0.15 }}
                  viewport={fadeUp.viewport}
                  className="w-full bg-[#F1EEE7] border border-[#F1EEE7] focus:border-[#FF94DA] px-4 py-3 rounded-2xl outline-none text-sm text-[#24251E] placeholder:text-[#24251E]/60 transition relative z-10 shadow-sm"
                />
              </div>

              {/* Campo Mail con Señal 3 detrás a la derecha */}
              <div className="relative w-full">
                <motion.img
                  src={ubicacionImg}
                  alt=""
                  initial={fadeUp.initial}
                  whileInView={fadeUp.whileInView}
                  transition={{ ...fadeUp.transition, delay: 0.3 }}
                  viewport={fadeUp.viewport}
                  className="absolute -bottom-4 right-5 w-9 h-9 object-contain pointer-events-none z-0 filter drop-shadow-sm select-none"
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
                  className="w-full bg-[#F1EEE7] border border-[#F1EEE7] focus:border-[#FF94DA] px-4 py-3 rounded-2xl outline-none text-sm text-[#24251E] placeholder:text-[#24251E]/60 transition invalid:focus:border-red-400 relative z-10 shadow-sm"
                />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={{ ...fadeUp.transition, delay: 0.35 }}
                viewport={fadeUp.viewport}
                className="w-[170px] self-center mt-4 bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-98 transition duration-200 text-[#24251E] font-semibold py-2.5 rounded-full shadow-md text-sm tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
              >
                {state.submitting ? 'Enviando...' : 'Registrarme'}
              </motion.button>
            </form>
          </div>

          {/* Bloque inferior: Redes Sociales al pie */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            viewport={fadeUp.viewport}
            className="w-full pt-2 pb-6 flex justify-center items-center relative z-20"
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
          </motion.div>

          {/* Popup de éxito */}
          {showModal && (
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
                  onClick={() => setShowModal(false)} 
                  className="w-full bg-[#FF94DA] hover:bg-[#ff7fd2] transition text-[#24251E] font-semibold py-3 rounded-xl text-sm uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Cerrar
                </button>
              </motion.div>
            </div>
          )}

          {/* Señal 4: Detrás de la nube del final a la izquierda, asomando un poquito */}
          <motion.img
            src={ubicacionImg}
            alt=""
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            viewport={fadeUp.viewport}
            className="absolute bottom-16 left-1/2 -translate-x-[110px] w-9 h-9 object-contain pointer-events-none z-[5] filter drop-shadow-sm select-none"
          />

          {/* Fondo final: sobre mapaCompleto, detrás de las redes y delante de la señal 4 */}
          <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10">
            <img
              src={fondoFinal}
              alt=""
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

