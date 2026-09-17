import React from 'react';
import fondoPortada from '../assets/fondoPortada.webp';

export default function Portada({ onExplorar }) {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center"
      style={{ backgroundImage: `url(${fondoPortada})` }}
    >
      {/* Botón Explorar posicionado debajo del centro geométrico, alineado con la base de la puerta */}
      <button
        type="button"
        onClick={onExplorar}
        className="absolute top-[64%] -translate-y-1/2 bg-[#F1EEE7] hover:bg-[#e5e1d5] active:scale-95 transition duration-200 text-[#24251E] font-semibold px-8 py-3 rounded-full shadow-md cursor-pointer tracking-wider text-sm uppercase"
      >
        Explorar
      </button>
    </div>
  );
}
