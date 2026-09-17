import React from 'react';

export default function Portada({ onExplorar }) {
  return (
    <div className="relative w-full h-screen bg-[url('/fondoPortada.webp')] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center">
      {/* Botón Explorar posicionado debajo del centro geométrico, alineado con la base de la puerta */}
      <button
        type="button"
        onClick={onExplorar}
        className="absolute top-[64%] -translate-y-1/2 bg-[#F4F1E1] hover:bg-[#eae6d2] active:scale-95 transition duration-200 text-[#2D3A24] font-medium px-8 py-3 rounded-full shadow-md cursor-pointer tracking-wider text-sm uppercase"
      >
        Explorar
      </button>
    </div>
  );
}
