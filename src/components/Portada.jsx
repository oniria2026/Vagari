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
      className={`relative w-full h-full flex flex-col items-center justify-center select-none bg-black overflow-hidden ${
        isPlaying ? 'cursor-pointer' : ''
      }`}
      style={{ containerType: 'size' }}
    >
      {/* Contenedor que mantiene exactamente el aspect ratio 9:16 del video y emula object-cover */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 'max(100cqw, calc(100cqh * (9 / 16)))',
          height: 'max(100cqh, calc(100cqw * (16 / 9)))'
        }}
      >
        {/* Video de fondo */}
        <video
          ref={videoRef}
          src={`${animacionBienvenida}#t=0.001`}
          preload="auto"
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-fill z-0"
        />

        {/* Elementos UI */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full z-10"
            >
              {/* Vagari text - anclado al contenedor 9:16 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                style={{ top: '40%' }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center pointer-events-none"
              >
                <h1 className="font-naiveer text-5xl sm:text-6xl md:text-7xl text-[#F1EEE7] tracking-wider drop-shadow-2xl whitespace-nowrap">
                  vagari
                </h1>
              </motion.div>

              {/* Botón Explorar - anclado al contenedor 9:16 */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                type="button"
                onClick={handleExplorar}
                style={{ 
                  top: '60%',
                  boxShadow: '0px 7px 28.3px rgba(255, 148, 218, 0.45)' 
                }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF94DA] hover:bg-[#ff7fd2] active:scale-95 transition duration-200 text-white font-semibold text-lg px-12 py-4 rounded-full cursor-pointer tracking-wider pointer-events-auto shadow-lg"
              >
                Explorar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
