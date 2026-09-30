import React from 'react';
import { motion } from 'framer-motion';
import fondoInicio from '../assets/fondo-inicio.png';
import diaApp from '../assets/dia-app.png';
import mapaApp from '../assets/mapa-app.png';
import juegoApp from '../assets/juego-app.png';

export default function InicioTelefono({ onOpenApp, onBack }) {
  const apps = [
    {
      id: 'dia',
      name: 'Día',
      icon: diaApp,
      action: () => (onOpenApp ? onOpenApp('dia') : null),
    },
    {
      id: 'mapa',
      name: 'Mapa',
      icon: mapaApp,
      action: () => (onOpenApp ? onOpenApp('mapa') : null),
    },
    {
      id: 'desafio',
      name: 'Desafío',
      icon: juegoApp,
      action: () => (onOpenApp ? onOpenApp('desafio') : null),
    },
  ];

  return (
    <div
      className="relative w-full h-[100svh] min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-between select-none"
      style={{ backgroundImage: `url(${fondoInicio})` }}
    >
      {/* Header idéntico al del minijuego */}
      <div className="relative w-full z-20">
        <div
          className="relative w-full box-border px-6 py-3 flex justify-between items-center border-b border-white/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-2px_-2px_6px_rgba(0,0,0,0.15),0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md bg-white/[0.04] overflow-hidden"
        >
          {/* Fondo texturizado #566700 con grano/ruido */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none bg-[#566700]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.303' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' fill='%23000000' opacity='0.25'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Espacio o indicador izquierdo */}
          <div className="w-[42px] h-[42px] flex items-center justify-start opacity-0 pointer-events-none">
            {/* Espaciador para balancear con el botón derecho */}
          </div>

          {/* Título Vagari centrado con estilo vidrio Figma */}
          <h1
            className="font-naiveer text-[38px] tracking-[0px] absolute left-1/2 -translate-x-1/2 m-0 select-none text-center"
            style={{
              color: 'rgba(241, 238, 231, 0.20)',
              background: 'linear-gradient(160deg, rgba(241, 238, 231, 0.45) 0%, rgba(241, 238, 231, 0.10) 45%, rgba(241, 238, 231, 0.25) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1px rgba(241, 238, 231, 0.40)',
              filter: 'drop-shadow(-2px 1px 2px rgba(241, 238, 231, 0.40)) drop-shadow(2.5px -1px 3.5px rgba(0, 0, 0, 0.45))',
              textShadow: '-2px 1px 3px rgba(241, 238, 231, 0.40), 2px -1px 4px rgba(0, 0, 0, 0.4), 0 0 4px rgba(241, 238, 231, 0.25)',
            }}
          >
            vagari
          </h1>

          {/* Botón cerrar / volver si se desea */}
          {onBack ? (
            <button
              onClick={onBack}
              title="Volver"
              aria-label="Volver"
              className="w-[42px] h-[42px] rounded-full bg-[#FF94DA] hover:bg-[#ff7cd3] active:scale-92 transition duration-200 flex items-center justify-center cursor-pointer shadow-[0_3px_10px_rgba(255,148,218,0.45)] shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-white stroke-[3.2] stroke-linecap-round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <div className="w-[42px] h-[42px] shrink-0" />
          )}
        </div>
      </div>

      {/* Contenido principal: Frase alineada a la izquierda */}
      <div className="relative z-10 px-8 pt-8 flex-1 flex flex-col justify-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="max-w-[300px] text-left mt-6"
        >
          <p className="text-white text-2xl sm:text-3xl font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] tracking-wide">
            ¿Alguna vez te preguntaste de qué están hechos los sueños?
          </p>
        </motion.div>
      </div>

      {/* 3 Botones como aplicaciones de móvil (Día, Mapa, Desafío) */}
      <div className="relative z-10 w-full px-6 pb-12 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="grid grid-cols-3 gap-4 max-w-[360px] mx-auto items-start justify-items-center"
        >
          {apps.map((app, index) => (
            <motion.button
              key={app.id}
              onClick={app.action}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none group"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-[22px] overflow-hidden drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-200">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white text-sm sm:text-base font-medium tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {app.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
