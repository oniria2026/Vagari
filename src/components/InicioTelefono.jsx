import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@formspree/react';
import fondoInicio from '../assets/fondo-inicio.png';
import dsdsImg from '../assets/DSDS.png';
import diaApp from '../assets/dia-app.png';
import mapaApp from '../assets/mapa-app.png';
import juegoApp from '../assets/juego-app.png';
import logoOniria from '../assets/logo-oniria.svg';
import cardImg from '../assets/card.webp';
import fondoFormulario from '../assets/fondo-formulario.png';
import fondoMapa from '../assets/fondoMapa.webp';
import mapaImg from '../assets/mapa.webp';

// Símbolos para la card del día
import mixto from '../assets/mixto.svg';
import monocromo from '../assets/monocromo.svg';
import fuego from '../assets/fuego.svg';
import noche from '../assets/noche.svg';
import organico from '../assets/organico.svg';
import tecnologico from '../assets/tecnologico.svg';
import tierra from '../assets/tierra.svg';
import aire from '../assets/aire.svg';
import agua from '../assets/agua.svg';
import color from '../assets/color.svg';
import dia from '../assets/dia.svg';
import espiral from '../assets/espiral.svg';

const CARDS_DIA = [
  { name: 'mixto', src: mixto, texto: 'la dualidad y el equilibrio', keyword: 'dualidad y el equilibrio' },
  { name: 'monocromo', src: monocromo, texto: 'la simplicidad y la elegancia', keyword: 'simplicidad y la elegancia' },
  { name: 'fuego', src: fuego, texto: 'la energía y la pasión', keyword: 'energía y la pasión' },
  { name: 'noche', src: noche, texto: 'la calma y el misterio', keyword: 'calma y el misterio' },
  { name: 'organico', src: organico, texto: 'la vida y la naturaleza', keyword: 'vida y la naturaleza' },
  { name: 'tecnologico', src: tecnologico, texto: 'la innovación y el futuro', keyword: 'innovación y el futuro' },
  { name: 'tierra', src: tierra, texto: 'la estabilidad y el arraigo', keyword: 'estabilidad y el arraigo' },
  { name: 'aire', src: aire, texto: 'la libertad y el movimiento', keyword: 'libertad y el movimiento' },
  { name: 'agua', src: agua, texto: 'la fluidez y la calma', keyword: 'fluidez y la calma' },
  { name: 'color', src: color, texto: 'la creatividad y la diversidad', keyword: 'creatividad y la diversidad' },
  { name: 'dia', src: dia, texto: 'la luz del sol', keyword: 'luz del sol' },
  { name: 'espiral', src: espiral, texto: 'la evolución y el cambio', keyword: 'evolución y el cambio' },
];

export default function InicioTelefono({ onOpenApp, initialApp, onCloseApp, onBack }) {
  const containerRef = useRef(null);

  // Símbolo asignado
  const [simboloDia] = useState(() => {
    return CARDS_DIA[Math.floor(Math.random() * CARDS_DIA.length)];
  });

  // Guarda el id y las coordenadas del icono pulsado para expandirse desde ahí
  const [activeApp, setActiveApp] = useState(() => {
    if (initialApp === 'mapa') {
      return { id: 'mapa', name: 'Mapa', icon: mapaApp, rect: { top: 0, left: 0, width: '100%', height: '100%' } };
    }
    if (initialApp === 'simbolo' || initialApp === 'dia') {
      return { id: 'dia', name: 'Símbolo', icon: cardImg, rect: { top: 0, left: 0, width: '100%', height: '100%' } };
    }
    return null;
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isFlippedCard, setIsFlippedCard] = useState(false);

  // Formulario deslizable desde abajo estilo cajón de apps
  const [showDrawer, setShowDrawer] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  // Formspree y modal de éxito
  const [state, handleSubmit] = useForm('xdekovjd');
  const [showModal, setShowModal] = useState(false);

  // Contador para el próximo Vagari (días, horas, minutos, segundos)
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // Fecha objetivo del próximo Vagari (ej: 7 días dinámicos o fecha específica)
    // Usamos una fecha consistente que se renueva o apunta al próximo evento
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 12);
    targetDate.setHours(20, 0, 0, 0);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setShowModal(true);
    }
  }, [state.succeeded]);

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

  // Detección de scroll con la rueda del ratón
  const handleWheel = (e) => {
    if (activeApp) return;
    if (e.deltaY > 25 && !showDrawer) {
      setShowDrawer(true);
    }
  };

  const handleDrawerWheel = (e) => {
    // Si scrollea hacia arriba (deltaY < -25) desde el formulario, cerrar drawer
    if (e.deltaY < -25 && showDrawer) {
      setShowDrawer(false);
    }
  };

  // Detección de swipe en pantallas táctiles
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (activeApp) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    // Si desliza hacia arriba (scroll hacia abajo en el móvil)
    if (diff > 45 && !showDrawer) {
      setShowDrawer(true);
    }
  };

  const drawerRef = useRef(null);

  const handleDrawerTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleDrawerTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchEndY - touchStartY;
    // Si arrastra hacia abajo (al menos 40px) y el scroll del drawer está arriba del todo
    const isAtTop = !drawerRef.current || drawerRef.current.scrollTop <= 5;
    if (diff > 40 && isAtTop && showDrawer) {
      setShowDrawer(false);
    }
  };


  const handleAppClick = (id, name, icon, e) => {
    const iconRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current
      ? containerRef.current.getBoundingClientRect()
      : { top: 0, left: 0 };

    const appData = {
      id,
      name,
      icon,
      rect: {
        top: iconRect.top - containerRect.top,
        left: iconRect.left - containerRect.left,
        width: iconRect.width,
        height: iconRect.height,
      },
    };
    setActiveApp(appData);

    if (id === 'dia') {
      if (onOpenApp) onOpenApp('simbolo');
    } else if (id === 'mapa') {
      if (onOpenApp) onOpenApp('mapa');
    } else if (id === 'desafio') {
      setTimeout(() => {
        if (onOpenApp) onOpenApp('desafio');
      }, 450);
    }
  };

  const handleCloseApp = () => {
    setIsClosing(true);
    if (onCloseApp) onCloseApp();
    setTimeout(() => {
      setActiveApp(null);
      setIsClosing(false);
    }, 400);
  };

  useEffect(() => {
    // Evita el pull-to-refresh predeterminado del navegador en móviles
    const preventPullToRefresh = (e) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      // Si el drawer está abierto y en el tope, o en el inicio
      if (showDrawer && drawerRef.current) {
        if (drawerRef.current.scrollTop <= 0 && touch.clientY > touchStartY) {
          // Si intenta arrastrar hacia abajo para refrescar
          if (e.cancelable) e.preventDefault();
        }
      } else if (!showDrawer) {
        if (window.scrollY <= 0 && touch.clientY > touchStartY) {
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    window.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    return () => {
      window.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, [showDrawer, touchStartY]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col select-none overscroll-none touch-none"
      style={{ backgroundImage: `url(${fondoInicio})`, overscrollBehavior: 'none' }}
    >
      {/* Header sutil y traslúcido con efecto vidrio fino */}
      <div className="relative w-full z-20">
        <div
          className="relative w-full box-border px-6 py-3 flex justify-center items-center overflow-hidden border-b border-white/15"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.06) 100%)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 4px 16px rgba(0, 0, 0, 0.12)',
          }}
        >
          {/* Texto vagari: transparente en el interior con contorno blanco fino y brillo vítreo */}
          <h1
            className="font-naiveer text-[38px] tracking-[0px] m-0 select-none text-center relative z-10"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.85)',
              background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
              WebkitBackgroundClip: 'text',
              filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
            }}
          >
            vagari
          </h1>
        </div>
      </div>

      {/* Contenedor principal centrado a altura media con espaciado vertical +25% */}
      <div className="relative z-10 flex-1 w-full px-8 pt-6 pb-20 flex flex-col justify-center gap-9 sm:gap-11">
        {/* Bloque Texto (alineado con Día y Mapa) + DSDS.png a la derecha */}
        <div className="relative w-full flex items-center justify-between">
          {/* Texto a la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="w-[52%] max-w-[210px] text-left z-10"
          >
            <p className="text-white text-base sm:text-lg font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              ¿Alguna vez te preguntaste de qué están hechos los sueños?
            </p>
          </motion.div>

          {/* Imagen DSDS.png a la derecha del texto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="absolute -top-10 right-0 w-[55%] max-w-[230px] pointer-events-none select-none z-0"
          >
            <img
              src={dsdsImg}
              alt=""
              className="w-full h-auto object-contain opacity-90 drop-shadow-sm"
            />
          </motion.div>
        </div>

        {/* Fila 1: App Card/Símbolo alineada a la izquierda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col items-start w-fit"
        >
          <button
            onClick={(e) => handleAppClick('dia', simboloDia.name, cardImg, e)}
            className="flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none group active:scale-95 transition-transform"
          >
            <div className="relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={cardImg} alt="Card" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
              <img src={simboloDia.src} alt={simboloDia.name} className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow" />
            </div>
            <span className="text-white text-xs sm:text-sm font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] capitalize">
              {simboloDia.name}
            </span>
          </button>
        </motion.div>

        {/* Fila 2: App Mapa a la izquierda y App Desafío a la derecha */}
        <div className="flex justify-between items-center w-full">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col items-start"
          >
            <button
              onClick={(e) => handleAppClick('mapa', 'Mapa', mapaApp, e)}
              className="flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none group active:scale-95 transition-transform"
            >
              <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <img src={mapaApp} alt="Mapa" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                Mapa
              </span>
            </button>
          </motion.div>

          {/* Desafío */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col items-end"
          >
            <button
              onClick={(e) => handleAppClick('desafio', 'Desafío', juegoApp, e)}
              className="flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none group active:scale-95 transition-transform"
            >
              <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <img src={juegoApp} alt="Desafío" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                Desafío
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animación de apertura y cierre estilo app de móvil (Zoom desde/hacia el icono) */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{
              opacity: 0.8,
              top: activeApp.rect.top,
              left: activeApp.rect.left,
              width: activeApp.rect.width,
              height: activeApp.rect.height,
              borderRadius: '24px',
            }}
            animate={
              isClosing
                ? {
                    opacity: 0,
                    top: activeApp.rect.top,
                    left: activeApp.rect.left,
                    width: activeApp.rect.width,
                    height: activeApp.rect.height,
                    borderRadius: '24px',
                  }
                : {
                    opacity: 1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px',
                  }
            }
            exit={{
              opacity: 0,
              top: activeApp.rect.top,
              left: activeApp.rect.left,
              width: activeApp.rect.width,
              height: activeApp.rect.height,
              borderRadius: '24px',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 z-50 overflow-hidden shadow-2xl flex flex-col ${
              activeApp.id === 'desafio' ? 'bg-[#0d0d0d]' : (activeApp.id === 'mapa' || activeApp.id === 'dia') ? 'bg-transparent' : 'bg-[#24251E]'
            }`}
          >
            {activeApp.id === 'desafio' ? (
              /* Pantalla de carga con la misma estética exacta que la del juego */
              <div className="relative w-full h-full flex flex-col justify-between bg-black text-white overflow-hidden select-none">
                {/* Header idéntico al del Home */}
                <div
                  className="w-full box-border px-6 py-3 flex justify-between items-center relative z-20 shrink-0 border-b border-white/15"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.06) 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 4px 16px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <div className="text-left font-bold text-xs sm:text-sm text-white drop-shadow">
                    Puntos: 0<br />
                    <span className="text-xs opacity-85">Mundo 1</span>
                  </div>
                  <h1
                    className="font-naiveer text-[38px] tracking-[0px] m-0 select-none text-center absolute left-1/2 -translate-x-1/2"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.85)',
                      background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
                    }}
                  >
                    vagari
                  </h1>
                  <button
                    onClick={handleCloseApp}
                    className="w-10 h-10 rounded-full bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-92 transition shadow-[0_3px_10px_rgba(255,148,218,0.45)] flex items-center justify-center cursor-pointer text-white"
                    title="Volver"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-white stroke-[3.2] stroke-linecap-round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Centro idéntico a la pantalla de inicio del juego, sin botón comenzar y diciendo cargando */}
                <div className="flex-1 flex flex-col justify-center items-center p-6 text-center z-10 bg-black/70">
                  <h1
                    className="font-naiveer text-3xl sm:text-4xl mb-3 tracking-wide select-none text-center"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.9)',
                      background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
                    }}
                  >
                    portales oníricos
                  </h1>
                  <p className="text-base sm:text-lg text-[#F1EEE7] font-medium max-w-[320px] mb-6 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    Cargando...
                  </p>
                </div>
              </div>
            ) : activeApp.id === 'mapa' ? (
              /* Pantalla de Mapa Onírico con fondo fondo-mapa.png cubriendo toda la pantalla, mapa y contador */
              <div
                className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat select-none"
                style={{
                  backgroundImage: `url(${fondoMapa})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Header de vagari con una X blanca sobre un círculo rosa a la derecha para volver */}
                <div
                  className="w-full box-border px-6 py-3 flex justify-between items-center relative z-20 shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.06) 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 4px 16px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  {/* Espaciador izquierdo para centrar el título */}
                  <div className="w-10 h-10 pointer-events-none opacity-0" />

                  {/* Título vagari idéntico al header general */}
                  <h1
                    className="font-naiveer text-[36px] sm:text-[38px] tracking-[0px] m-0 select-none text-center absolute left-1/2 -translate-x-1/2"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.85)',
                      background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
                    }}
                  >
                    vagari
                  </h1>

                  {/* X blanca sobre círculo rosa para volver */}
                  <button
                    onClick={handleCloseApp}
                    className="w-10 h-10 rounded-full bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-92 transition shadow-[0_3px_10px_rgba(255,148,218,0.45)] flex items-center justify-center cursor-pointer text-white"
                    title="Volver"
                    aria-label="Volver"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-white stroke-[3.2] stroke-linecap-round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contenido principal: Título, Mapa y Contador distribuidos uniformemente con safe padding */}
                <div className="flex-1 flex flex-col items-center justify-evenly w-full select-none z-10 min-h-0 py-1 px-2">
                  {/* Título mapa onírico */}
                  <div className="w-full px-4 flex justify-center shrink-0">
                    <motion.h2
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="font-naiveer text-[#FF94DA] text-xl sm:text-2xl md:text-3xl tracking-wide drop-shadow-[0_2px_8px_rgba(255,148,218,0.35)] m-0"
                    >
                      mapa onírico
                    </motion.h2>
                  </div>

                  {/* Mapa clickeable que redirige a Google Maps */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="w-full max-w-[320px] sm:max-w-[360px] px-4 flex flex-col items-center justify-center shrink-0"
                  >
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer active:scale-95 transition-transform flex flex-col items-center group"
                      title="Abrir en Google Maps"
                    >
                      <img
                        src={mapaImg}
                        alt="Mapa Onírico"
                        className="w-full h-auto max-h-[175px] sm:max-h-[220px] md:max-h-[250px] object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-200"
                      />
                    </a>
                    <span className="text-white/70 text-xs mt-2 uppercase tracking-wider font-medium drop-shadow">
                      toca el mapa para viajar
                    </span>
                  </motion.div>

                  {/* Próximo Vagari con contador */}
                  <div className="w-full max-w-[340px] sm:max-w-[380px] px-4 flex justify-center shrink-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.2 }}
                      className="w-full flex flex-col items-center"
                    >
                      <span className="font-naiveer text-white text-base sm:text-lg md:text-xl tracking-wider mb-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                        próximo vagari en
                      </span>

                      {/* Bloques de días, horas, minutos y segundos */}
                      <div className="grid grid-cols-4 gap-2 w-full">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-1.5 px-1 flex flex-col items-center shadow-lg">
                          <span className="font-bold text-base sm:text-lg md:text-xl text-[#FF94DA] drop-shadow">
                            {String(timeLeft.dias).padStart(2, '0')}
                          </span>
                          <span className="text-[9px] sm:text-[10px] md:text-xs text-[#F1EEE7]/80 uppercase tracking-wider">
                            días
                          </span>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-1.5 px-1 flex flex-col items-center shadow-lg">
                          <span className="font-bold text-base sm:text-lg md:text-xl text-[#FF94DA] drop-shadow">
                            {String(timeLeft.horas).padStart(2, '0')}
                          </span>
                          <span className="text-[9px] sm:text-[10px] md:text-xs text-[#F1EEE7]/80 uppercase tracking-wider">
                            horas
                          </span>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-1.5 px-1 flex flex-col items-center shadow-lg">
                          <span className="font-bold text-base sm:text-lg md:text-xl text-[#FF94DA] drop-shadow">
                            {String(timeLeft.minutos).padStart(2, '0')}
                          </span>
                          <span className="text-[9px] sm:text-[10px] md:text-xs text-[#F1EEE7]/80 uppercase tracking-wider">
                            min
                          </span>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-1.5 px-1 flex flex-col items-center shadow-lg">
                          <span className="font-bold text-base sm:text-lg md:text-xl text-[#FF94DA] drop-shadow">
                            {String(timeLeft.segundos).padStart(2, '0')}
                          </span>
                          <span className="text-[9px] sm:text-[10px] md:text-xs text-[#F1EEE7]/80 uppercase tracking-wider">
                            seg
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Footer exactamente igual al del formulario (con fondo #566700, logo Oniria a la izq y redes a la der) */}
                <div 
                  className="w-full bg-[#566700] px-6 py-2.5 sm:py-3.5 flex items-center justify-between shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] z-20"
                  style={{ paddingBottom: 'calc(0.65rem + env(safe-area-inset-bottom, 0px))' }}
                >
                  {/* Logo Oniria a la izquierda */}
                  <div className="flex items-center">
                    <img
                      src={logoOniria}
                      alt="Oniria"
                      className="w-11 h-11 object-contain drop-shadow"
                    />
                  </div>

                  {/* A la derecha: "seguinos en:" y los logos de Instagram y TikTok centrados */}
                  <div className="flex flex-col items-center gap-1.5 text-[#F1EEE7]">
                    <span className="text-xs font-semibold tracking-wider text-[#F1EEE7]/90 uppercase text-center">
                      seguinos en:
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      {/* Instagram */}
                      <a
                        href="https://instagram.com/somos.oniria"
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 flex items-center justify-center text-[#F1EEE7] hover:text-[#FF94DA] active:scale-95 transition"
                        title="Instagram @somos.oniria"
                        aria-label="Instagram somos.oniria"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>

                      {/* TikTok */}
                      <a
                        href="https://tiktok.com/@somos.oniria"
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 flex items-center justify-center text-[#F1EEE7] hover:text-[#FF94DA] active:scale-95 transition"
                        title="TikTok @somos.oniria"
                        aria-label="TikTok somos.oniria"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.32 0 .62.06.9.16V9.45a6.37 6.37 0 0 0-.9-.07A6.34 6.34 0 0 0 3 15.72a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.28 8.28 0 0 0 3.91 1.05v-3.41z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeApp.id === 'dia' ? (
              /* Popup pantalla de Símbolo con efecto teléfono, mismo fondo y header que Mapa */
              <div
                className="relative w-full h-full flex flex-col justify-between overflow-y-auto bg-cover bg-no-repeat bg-top select-none touch-pan-y"
                style={{
                  backgroundImage: `url(${fondoMapa})`,
                  backgroundSize: '100% 100%',
                }}
              >
                {/* Header de vagari con botón X idéntico al del mapa */}
                <div
                  className="w-full box-border px-6 py-3 flex justify-between items-center relative z-20 shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.06) 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 4px 16px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <div className="w-10 h-10 pointer-events-none opacity-0" />
                  <h1
                    className="font-naiveer text-[36px] sm:text-[38px] tracking-[0px] m-0 select-none text-center absolute left-1/2 -translate-x-1/2"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.85)',
                      background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
                    }}
                  >
                    vagari
                  </h1>
                  <button
                    onClick={handleCloseApp}
                    className="w-10 h-10 rounded-full bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-92 transition shadow-[0_3px_10px_rgba(255,148,218,0.45)] flex items-center justify-center cursor-pointer text-white"
                    title="Volver"
                    aria-label="Volver"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-white stroke-[3.2] stroke-linecap-round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Centro: Card volteable 3D al hacer click */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 my-auto">
                  <div
                    className="relative w-full max-w-[340px] aspect-square cursor-pointer select-none"
                    style={{ perspective: 1200 }}
                    onClick={() => setIsFlippedCard(prev => !prev)}
                  >
                    <motion.div
                      className="w-full h-full relative"
                      style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
                      animate={{ rotateY: isFlippedCard ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Cara A (Dorso con texto según diseño Figma) */}
                      <div
                        className="absolute inset-0 w-full h-full p-8 flex flex-col items-center justify-between text-center"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(0deg)'
                        }}
                      >
                        <img
                          src={cardImg}
                          alt="Card Frame"
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                        />

                        {/* Parte superior: Nombre del símbolo en tipografía Naiveer achicado */}
                        <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                          <span className="font-naiveer text-[#F1EEE7] text-4xl sm:text-5xl tracking-wide select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                            {simboloDia.name}
                          </span>
                        </div>

                        {/* Guión / Línea separadora a lo largo */}
                        <div className="relative z-10 w-[88%] h-[2px] bg-white/60 my-2 rounded-full shadow-sm" />

                        {/* Parte inferior: Texto descriptivo alineado a la izquierda */}
                        <div className="relative z-10 flex-1 flex items-center justify-start w-full px-5 text-left">
                          {simboloDia.name === 'dia' ? (
                            <p className="text-white text-base sm:text-lg font-normal leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                              Este es tu símbolo y representa la <strong className="font-bold text-white">luz del sol</strong> en todas sus formas.
                            </p>
                          ) : (
                            <p className="text-white text-base sm:text-lg font-normal leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                              Este es tu símbolo y representa
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Cara B (Frente con el Logo del Símbolo) */}
                      <div
                        className="absolute inset-0 w-full h-full p-8 flex flex-col items-center justify-center text-center"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <img
                          src={cardImg}
                          alt="Card Frame"
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                        />

                        {/* Logo del símbolo en el centro */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                          <img
                            src={simboloDia.src}
                            alt={simboloDia.name}
                            className="w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-white/70 text-xs mt-3 uppercase tracking-wider font-medium drop-shadow">
                    toca la carta para girar
                  </span>
                </div>

                {/* Espaciador inferior */}
                <div className="h-4" />
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador inferior sutil de deslizar para el formulario */}
      {!activeApp && !showDrawer && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            onClick={() => setShowDrawer(true)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer pointer-events-auto"
          >
            <div className="w-10 h-1 rounded-full bg-white/60 mb-1" />
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-white/70 stroke-[2.5] stroke-linecap-round">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>

          {/* Botón con flechita abajo a la derecha para abrir el formulario */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowDrawer(true)}
            className="absolute bottom-4 right-5 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center cursor-pointer text-white shadow-lg backdrop-blur-md border border-white/20"
            title="Abrir formulario"
            aria-label="Abrir formulario"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-white stroke-[2.5] stroke-linecap-round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </>
      )}

      {/* Cajón / Pantalla de Formulario deslizable desde abajo estilo todas las aplicaciones */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onWheel={handleDrawerWheel}
            onTouchStart={handleDrawerTouchStart}
            onTouchEnd={handleDrawerTouchEnd}
            ref={drawerRef}
            className="absolute inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain touch-pan-y bg-cover bg-no-repeat bg-top"
            style={{
              backgroundImage: `url(${fondoFormulario})`,
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Header del cajón con barra de agarre y botón cerrar */}
            <div className="w-full pt-3 pb-2 px-6 flex flex-col items-center relative shrink-0">
              {/* Barra de agarre estilo cajón de apps */}
              <div
                onClick={() => setShowDrawer(false)}
                className="w-12 h-1.5 rounded-full bg-white/40 hover:bg-white/60 transition cursor-pointer mb-3"
              />

              <div className="w-full flex items-center justify-between">
                <span className="font-naiveer text-3xl text-[#F1EEE7] tracking-wider drop-shadow-md">
                  vagari
                </span>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition flex items-center justify-center cursor-pointer text-white"
                  title="Cerrar"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-white stroke-[2.5] stroke-linecap-round">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del Formulario estructurado exactamente según el diseño de Figma */}
            <div className="w-full flex-1 flex flex-col items-center justify-center px-6 py-4 my-auto">
              <div className="w-full max-w-[340px] text-left mb-6">
                {/* Título principal: 5px más grande que el subtítulo (en Figma 40px vs 35px, adaptado proporcionalmente) */}
                <h2
                  className="text-white text-left font-normal leading-[1.18] drop-shadow-md mb-6"
                  style={{ fontSize: 'clamp(24px, 6.2vw, 30px)' }}
                >
                  Un <span className="font-bold">portal</span>,<br />
                  doce <span className="font-bold">símbolos</span><br />
                  e <span className="font-bold">infinitos lugares</span><br />
                  para conocer.
                </h2>

                {/* Subtítulo: 5px menor que el título (en Figma 35px vs 40px) */}
                <p
                  className="text-left leading-[1.25] drop-shadow-sm"
                  style={{ fontSize: 'clamp(19px, 5vw, 25px)' }}
                >
                  <span className="text-[#FF94DA] font-bold block mb-1">
                    Las primeras señales ya aprecieron.
                  </span>
                  <span className="text-[#F1EEE7] font-medium block">
                    Dejanos tus datos y seguí el rastro:
                  </span>
                </p>
              </div>

              {/* Formulario con casillas transparentes, border radius 22px y texto blanco */}
              <form onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                  style={{ borderRadius: '22px' }}
                  className="w-full bg-transparent border-2 border-white/50 focus:border-[#FF94DA] px-5 py-3 outline-none text-base text-white placeholder:text-white/70 transition shadow-sm"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Mail"
                  required
                  onInput={handleEmailInput}
                  title="Por favor, ingresá un correo electrónico válido"
                  style={{ borderRadius: '22px' }}
                  className="w-full bg-transparent border-2 border-white/50 focus:border-[#FF94DA] px-5 py-3 outline-none text-base text-white placeholder:text-white/70 transition shadow-sm"
                />

                {/* Botón con texto blanco */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  style={{ borderRadius: '22px' }}
                  className="w-[190px] self-center mt-3 bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-95 transition duration-200 text-white font-semibold py-3 shadow-lg text-base tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? 'Enviando...' : 'Registrarme'}
                </button>
              </form>
            </div>

            {/* Footer con fondo #566700: logo a la izquierda, a la derecha "seguinos en:" y los logos de Instagram y TikTok centrados con respecto al texto */}
            <div className="w-full bg-[#566700] px-6 py-4 flex items-center justify-between shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
              {/* Logo Oniria a la izquierda */}
              <div className="flex items-center">
                <img
                  src={logoOniria}
                  alt="Oniria"
                  className="w-11 h-11 object-contain drop-shadow"
                />
              </div>

              {/* A la derecha: "seguinos en:" y abajo los logos de Instagram y TikTok centrados horizontalmente entre sí */}
              <div className="flex flex-col items-center gap-1.5 text-[#F1EEE7]">
                <span className="text-xs font-semibold tracking-wider text-[#F1EEE7]/90 uppercase text-center">
                  seguinos en:
                </span>
                <div className="flex items-center justify-center gap-3">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/somos.oniria"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 flex items-center justify-center text-[#F1EEE7] hover:text-[#FF94DA] active:scale-95 transition"
                    title="Instagram @somos.oniria"
                    aria-label="Instagram somos.oniria"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@somos.oniria"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 flex items-center justify-center text-[#F1EEE7] hover:text-[#FF94DA] active:scale-95 transition"
                    title="TikTok @somos.oniria"
                    aria-label="TikTok somos.oniria"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.32 0 .62.06.9.16V9.45a6.37 6.37 0 0 0-.9-.07A6.34 6.34 0 0 0 3 15.72a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.28 8.28 0 0 0 3.91 1.05v-3.41z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal de Agradecimiento */}
            {showModal && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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
                    onClick={() => {
                      setShowModal(false);
                      setShowDrawer(false);
                    }}
                    className="w-full bg-[#FF94DA] hover:bg-[#ff7fd2] transition text-[#24251E] font-semibold py-3 rounded-xl text-sm uppercase tracking-wider shadow-sm cursor-pointer"
                  >
                    Cerrar
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
