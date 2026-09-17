import React, { useState } from 'react';

export default function Landing() {
  const [formData, setFormData] = useState({ nombre: '', mail: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias por registrarte, ${formData.nombre || 'viajero'}!`);
  };

  return (
    <div className="flex flex-col w-full max-w-[400px] mx-auto min-h-screen">
      {/* 1. SECCIÓN CARD: Fondo cielo con nubes */}
      <section
        id="card"
        className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center p-6 text-center relative"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, #bce0fd 0%, #7db9e8 50%, #4a75a0 100%)",
        }}
      >
        {/* Decoración sutil de nubes de fondo */}
        <div className="absolute inset-0 bg-white/15 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-[#E76F8E] text-2xl font-bold tracking-wide drop-shadow-sm mb-8">
            ¿Qué mundo te espera?
          </h2>

          <div className="w-48 h-48 bg-[#E76F8E]/90 hover:bg-[#E76F8E] transition-transform duration-300 hover:scale-105 rounded-3xl shadow-xl flex items-center justify-center p-8 border border-white/40">
            {/* Ícono de flor */}
            <svg
              className="w-24 h-24 text-white drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V3m4.5 9a4.5 4.5 0 1 1-4.5 4.5M16.5 12H21m-9 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V21m-4.5-9A4.5 4.5 0 1 1 12 7.5M7.5 12H3" />
              <circle cx="12" cy="12" r="3" fill="#FCE7F3" stroke="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN MAPA: Fondo rosado/verdoso */}
      <section
        id="mapa"
        className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center p-6 text-center relative"
        style={{
          background:
            "linear-gradient(175deg, #e8b4b8 0%, #d1c7bd 40%, #859b82 100%)",
        }}
      >
        <div className="w-full flex flex-col items-center">
          <h2 className="text-[#2b3a24] uppercase text-xl font-bold tracking-widest mb-6">
            mapa de oniria
          </h2>

          {/* Imagen ilustrativa del mapa */}
          <div className="w-full max-w-[320px] h-52 rounded-2xl overflow-hidden shadow-lg border border-white/30 mb-8 bg-black/10 relative flex items-center justify-center">
            <svg
              className="w-full h-full text-white/80 p-6"
              viewBox="0 0 300 180"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M30 40 Q 90 20 150 50 T 270 30 Q 250 120 180 140 T 50 130 Z"
                fill="#F4F1E1"
                fillOpacity="0.4"
                strokeWidth="2"
              />
              <path
                d="M60 70 Q 120 90 180 80 T 240 100"
                strokeDasharray="4 4"
                strokeWidth="2"
                stroke="#5d6b49"
              />
              <circle cx="60" cy="70" r="5" fill="#E76F8E" />
              <circle cx="180" cy="80" r="5" fill="#E76F8E" />
              <circle cx="240" cy="100" r="6" fill="#2b3a24" />
            </svg>
            <span className="absolute bottom-3 right-4 text-xs font-semibold uppercase tracking-wider text-[#2b3a24]/80 bg-white/70 px-2 py-1 rounded">
              Territorio Oniria
            </span>
          </div>

          {/* Lista vertical con 4 ítems */}
          <div className="w-full max-w-[320px] flex flex-col gap-3">
            {[
              {
                num: '01',
                title: 'Los símbolos',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Las puertas del umbral',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3v18m0-18h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8m0-18H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2m4-9h.01" />
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'El valle flotante',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
              },
              {
                num: '04',
                title: 'El despertar',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm text-left border border-white/50 text-[#2b3a24]"
              >
                <div className="text-[#E76F8E] shrink-0">{item.icon}</div>
                <span className="font-semibold text-xs tracking-wider">{item.num}</span>
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN FECHA: Fondo verde oscuro */}
      <section
        id="fecha"
        className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-between p-8 text-center relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #1b2f23 0%, #15251b 50%, #0d1a12 100%)",
        }}
      >
        <div className="w-full flex flex-col items-center pt-8">
          {/* Icono de estrella centrado */}
          <div className="mb-3 text-[#f7d070]">
            <svg
              className="w-10 h-10 mx-auto fill-current animate-pulse"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          <h2 className="text-[#f4f1e1] text-xl font-medium tracking-widest uppercase mb-8">
            Próximo Vagari
          </h2>

          {/* Contador grande */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-[#f4f1e1]">14</span>
              <span className="text-[11px] uppercase tracking-wider text-white/60">días</span>
            </div>
            <span className="text-3xl font-bold -mt-3 text-white/50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-[#f4f1e1]">06</span>
              <span className="text-[11px] uppercase tracking-wider text-white/60">horas</span>
            </div>
            <span className="text-3xl font-bold -mt-3 text-white/50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-[#f4f1e1]">32</span>
              <span className="text-[11px] uppercase tracking-wider text-white/60">minutos</span>
            </div>
          </div>

          {/* Textos de la Facultad */}
          <div className="mt-8 text-sm text-white/80 space-y-1">
            <p className="font-semibold text-[#f4f1e1]">Facultad de Arquitectura, Diseño y Urbanismo</p>
            <p className="text-xs text-white/70">Pabellón 3 - Ciudad Universitaria, UBA</p>
            <p className="text-xs text-[#f7d070]/90">Entrada libre y gratuita</p>
          </div>
        </div>

        {/* Imagen de la puerta abierta en la esquina inferior derecha */}
        <div className="absolute bottom-0 right-0 w-28 h-44 pointer-events-none opacity-85 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}fondoPortada.webp`}
            alt="Puerta Oniria"
            className="w-full h-full object-cover object-[25%_42%] scale-[2.2] translate-x-2 translate-y-3"
          />
        </div>
      </section>

      {/* 4. SECCIÓN FORMULARIO: Fondo degradado celeste/rosa */}
      <section
        id="formulario"
        className="min-h-screen w-full bg-cover bg-center flex flex-col justify-between p-8 text-center relative"
        style={{
          background:
            "linear-gradient(160deg, #b9d7ea 0%, #d6e4f0 35%, #f7d6e0 70%, #f2b5d4 100%)",
        }}
      >
        <div className="w-full flex flex-col items-center pt-6">
          <h1 className="text-3xl font-bold text-[#354854] tracking-wider mb-2">
            Vagari
          </h1>
          <p className="text-xs text-[#4b5d67] max-w-[280px] leading-relaxed mb-8">
            Adentrate en los senderos de Oniria. Dejanos tus datos para recibir las coordenadas de ingreso y novedades del próximo portal.
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-4">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full bg-white/40 border border-white/60 focus:border-[#E76F8E] focus:bg-white/70 px-4 py-3 rounded-2xl outline-none text-sm text-[#2b3a24] placeholder:text-[#6b7b83] transition"
            />
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              placeholder="Mail"
              required
              className="w-full bg-white/40 border border-white/60 focus:border-[#E76F8E] focus:bg-white/70 px-4 py-3 rounded-2xl outline-none text-sm text-[#2b3a24] placeholder:text-[#6b7b83] transition"
            />
            <button
              type="submit"
              className="w-full mt-2 bg-[#E76F8E] hover:bg-[#d85c7c] active:scale-98 transition duration-200 text-white font-medium py-3 rounded-2xl shadow-md text-sm uppercase tracking-wider cursor-pointer"
            >
              registrarme
            </button>
          </form>
        </div>

        {/* Pie: Redes Sociales */}
        <div className="w-full py-6 flex flex-col items-center gap-3 border-t border-black/10 mt-6">
          <div className="flex gap-5 text-sm font-medium text-[#4b5d67]">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E76F8E] transition">
              Instagram
            </a>
            <span>•</span>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#E76F8E] transition">
              TikTok
            </a>
            <span>•</span>
            <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-[#E76F8E] transition">
              Spotify
            </a>
          </div>
          <span className="text-[11px] text-[#6b7b83]">
            © 2026 Oniria Project • Todos los derechos reservados
          </span>
        </div>
      </section>
    </div>
  );
}
