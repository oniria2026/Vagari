import React from 'react';
import { motion } from 'framer-motion';
import fondoPortada from '../assets/fondoPortada.webp';

export default function Portada({ onExplorar }) {
  return (
    <div
      className="relative w-full h-[100svh] min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center select-none"
      style={{ backgroundImage: `url(${fondoPortada})` }}
    >
      {/* Arriba a la izquierda: grupo oniria */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-8 left-6 sm:top-10 sm:left-8 z-10"
      >
        <span className="font-naiveer text-xl sm:text-2xl text-[#F1EEE7] tracking-widest drop-shadow-md">
          grupo oniria
        </span>
      </motion.div>

      {/* Centro de la pantalla: vagari intermedio y más abajo, justo arriba del botón */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center z-10 pointer-events-none"
      >
        <h1 className="font-naiveer text-6xl sm:text-7xl text-[#F1EEE7] tracking-wider drop-shadow-2xl whitespace-nowrap">
          vagari
        </h1>
      </motion.div>

      {/* Botón Explorar posicionado debajo del centro geométrico, alineado con la base de la puerta */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        type="button"
        onClick={onExplorar}
        style={{ boxShadow: '0px 7px 28.3px #566700' }}
        className="absolute top-[64%] -translate-y-1/2 bg-[#F1EEE7] hover:bg-[#e5e1d5] active:scale-95 transition duration-200 text-[#566700] font-semibold text-lg px-12 py-4 rounded-full cursor-pointer tracking-wider z-10"
      >
        Explorar
      </motion.button>
    </div>
  );
}
