import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import animacionBienvenida from '../assets/animacion-bienvenida.mp4';

export default function Portada({ onExplorar }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleExplorar = () => {
    if (isPlaying) return;
    setIsPlaying(true);
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

  return (
    <div className="relative w-full h-[100svh] min-h-screen bg-black overflow-hidden flex flex-col items-center select-none">
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
            {/* Arriba a la izquierda: grupo oniria */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-8 left-6 sm:top-10 sm:left-8 pointer-events-auto"
            >
              <span className="font-naiveer text-xl sm:text-2xl text-[#F1EEE7] tracking-widest drop-shadow-md">
                grupo oniria
              </span>
            </motion.div>

            {/* Centro de la pantalla: vagari justo arriba del botón */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center pointer-events-none"
            >
              <h1 className="font-naiveer text-[4.25rem] sm:text-7xl md:text-8xl text-[#F1EEE7] tracking-wider drop-shadow-2xl whitespace-nowrap">
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
              style={{ boxShadow: '0px 7px 28.3px #566700' }}
              className="absolute top-[64%] -translate-y-1/2 bg-[#F1EEE7] hover:bg-[#e5e1d5] active:scale-95 transition duration-200 text-[#566700] font-semibold text-lg px-12 py-4 rounded-full cursor-pointer tracking-wider pointer-events-auto"
            >
              Explorar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
