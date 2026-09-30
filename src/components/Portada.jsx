import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import animacionBienvenida from '../assets/animacion-bienvenida.mp4';

export default function Portada({ onExplorar }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleExplorar = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Intentar activar pantalla completa nativa para ocultar barras del navegador en el móvil
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      }
    } catch (e) {
      // Ignorar si el navegador bloquea fullscreen automático
    }

    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error('Error al reproducir el video:', err);
        onExplorar();
      });
    } else {
      onExplorar();
    }
  };

  const handleVideoEnded = () => {
    onExplorar();
  };

  const handleScreenClick = () => {
    // Si ya arrancó la animación, al volver a tocar la pantalla se saltea directo a la siguiente
    if (isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      onExplorar();
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`relative w-full h-full flex flex-col items-center select-none bg-black overflow-hidden ${
        isPlaying ? 'cursor-pointer' : ''
      }`}
    >
      {/* Video de fondo: pausado en el primer frame hasta hacer clic en Explorar */}
      <video
        ref={videoRef}
        src={animacionBienvenida}
        preload="auto"
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Elementos UI que se desvanecen cuando comienza la animación */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full flex flex-col items-center pointer-events-none z-10"
          >
            {/* Centro de la pantalla: vagari un poco más arriba y tamaño moderado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center pointer-events-none"
            >
              <h1 className="font-naiveer text-5xl sm:text-6xl md:text-7xl text-[#F1EEE7] tracking-wider drop-shadow-2xl whitespace-nowrap">
                vagari
              </h1>
            </motion.div>

            {/* Botón Explorar posicionado debajo del centro geométrico */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              type="button"
              onClick={handleExplorar}
              style={{ boxShadow: '0px 7px 28.3px rgba(255, 148, 218, 0.45)' }}
              className="absolute top-[64%] -translate-y-1/2 bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-95 transition duration-200 text-white font-semibold text-lg px-12 py-4 rounded-full cursor-pointer tracking-wider pointer-events-auto shadow-lg"
            >
              Explorar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
