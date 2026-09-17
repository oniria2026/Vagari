import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Backgrounds
import fondoCard2 from '../assets/fondoCard2.webp';
import fondoMapa from '../assets/fondoMapa.webp';
import fondoFecha2 from '../assets/fondoFecha2.webp';
import fondoForm2 from '../assets/fondoForm2.webp';

// Images & SVGs
import cardImg from '../assets/card.webp';
import mapaImg from '../assets/mapa.webp';
import organicoSvg from '../assets/organico.svg';
import espiralSvg from '../assets/espiral.svg';
import puertaSvg from '../assets/puerta.svg';
import aireSvg from '../assets/aire.svg';
import diaSvg from '../assets/dia.svg';
import nocheSvg from '../assets/noche.svg';

export default function Landing() {
  const [formData, setFormData] = useState({ nombre: '', mail: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias por registrarte, ${formData.nombre || 'viajero'}!`);
  };

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: false, amount: 0.2 },
  };

  return (
    <div className="flex flex-col w-full max-w-[400px] mx-auto min-h-screen">
      {/* 1. SECCIÓN CARD: fondoCard2.webp */}
      <section
        id="card"
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6 text-center relative"
        style={{ backgroundImage: `url(${fondoCard2})` }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.h2
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="text-[#F296B6] text-2xl font-bold tracking-wide drop-shadow-md mb-8"
          >
            ¿Qué mundo te espera?
          </motion.h2>

          {/* Div cuadrado color rosa con bordes redondeados (rounded-xl) conteniendo el SVG de la flor */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            viewport={fadeUp.viewport}
            className="relative w-52 h-52 bg-[#F296B6]/90 rounded-xl shadow-2xl flex items-center justify-center p-6 overflow-hidden border border-white/40"
          >
            <img
              src={cardImg}
              alt="Card Frame"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
            />
            <img
              src={organicoSvg}
              alt="Flor"
              className="relative z-10 w-28 h-28 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. SECCIÓN MAPA: fondoMapa.webp */}
      <section
        id="mapa"
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6 text-center relative"
        style={{ backgroundImage: `url(${fondoMapa})` }}
      >
        <div className="w-full flex flex-col items-center py-6">
          <motion.h2
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="text-[#2b3a24] uppercase text-xl font-bold tracking-widest mb-4 drop-shadow-sm"
          >
            mapa de oniria
          </motion.h2>

          {/* Imagen importada mapa.webp */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            viewport={fadeUp.viewport}
            className="w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/50 mb-6 bg-white/20"
          >
            <img
              src={mapaImg}
              alt="Mapa de Oniria"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Lista vertical de 4 ítems con flexbox e iconos SVG importados a la izquierda con delay escalonado */}
          <div className="w-full max-w-[320px] flex flex-col gap-2.5">
            {[
              {
                num: '01',
                title: 'Los símbolos',
                icon: espiralSvg,
              },
              {
                num: '02',
                title: '???',
                icon: puertaSvg,
              },
              {
                num: '03',
                title: '???',
                icon: aireSvg,
              },
              {
                num: '04',
                title: '???',
                icon: diaSvg,
              },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={{ ...fadeUp.transition, delay: 0.25 + index * 0.1 }}
                viewport={fadeUp.viewport}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-sm text-left border border-white/60 text-[#2b3a24]"
              >
                <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-xs tracking-wider">{item.num}</span>
                <span className="text-sm font-medium tracking-wide">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN FECHA: fondoFecha2.webp */}
      <section
        id="fecha"
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between p-8 text-center relative overflow-hidden text-white"
        style={{ backgroundImage: `url(${fondoFecha2})` }}
      >
        <div className="w-full flex flex-col items-center pt-10">
          {/* Estrella centrada y título */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <img
                src={nocheSvg}
                alt="Estrella Oniria"
                className="w-full h-full object-contain filter drop-shadow animate-pulse"
              />
            </div>

            <h2 className="text-[#F4F1E1] text-xl font-semibold tracking-widest uppercase mb-8 drop-shadow-sm">
              Próximo Vagari
            </h2>
          </motion.div>

          {/* Contador grande */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            viewport={fadeUp.viewport}
            className="flex items-center justify-center gap-2 mb-2 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-[#F4F1E1]">14</span>
              <span className="text-[11px] uppercase tracking-wider text-white/70">días</span>
            </div>
            <span className="text-3xl font-bold -mt-3 text-white/50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-[#F4F1E1]">06</span>
              <span className="text-[11px] uppercase tracking-wider text-white/70">horas</span>
            </div>
            <span className="text-3xl font-bold -mt-3 text-white/50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-[#F4F1E1]">32</span>
              <span className="text-[11px] uppercase tracking-wider text-white/70">minutos</span>
            </div>
          </motion.div>

          {/* Texto de ubicación requerido */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            viewport={fadeUp.viewport}
            className="mt-8 text-sm text-white/90 space-y-1"
          >
            <p className="font-semibold text-[#F4F1E1] text-base drop-shadow-sm">
              Facultad de Artes Sede Fonseca
            </p>
            <p className="text-xs text-white/80">Entrada libre y gratuita</p>
          </motion.div>
        </div>

        <div className="pb-4" />
      </section>

      {/* 4. SECCIÓN FORMULARIO: fondoForm2.webp */}
      <section
        id="formulario"
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between p-8 text-center relative"
        style={{ backgroundImage: `url(${fondoForm2})` }}
      >
        <div className="w-full flex flex-col items-center pt-8">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            viewport={fadeUp.viewport}
            className="flex flex-col items-center max-w-[320px]"
          >
            <h1 className="text-3xl font-bold text-[#354854] tracking-wider mb-2">
              Vagari
            </h1>
            <p className="text-sm font-medium text-[#4b5d67] leading-relaxed mb-3">
              ¿Alguna vez te preguntaste de qué estan hechos los sueños?
            </p>
            <p className="text-xs text-[#5c6f79] leading-relaxed mb-6">
              Las primeras señales ya aprecieron. Dejanos tus datos y seguí el rastro:
            </p>
          </motion.div>

          {/* Formulario con inputs escalonados */}
          <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-4">
            <motion.input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              viewport={fadeUp.viewport}
              className="w-full bg-white/40 border border-white/60 focus:border-[#E76F8E] focus:bg-white/70 px-4 py-3 rounded-2xl outline-none text-sm text-[#2b3a24] placeholder:text-[#6b7b83] transition"
            />
            <motion.input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              placeholder="Mail"
              required
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.25 }}
              viewport={fadeUp.viewport}
              className="w-full bg-white/40 border border-white/60 focus:border-[#E76F8E] focus:bg-white/70 px-4 py-3 rounded-2xl outline-none text-sm text-[#2b3a24] placeholder:text-[#6b7b83] transition"
            />
            <motion.button
              type="submit"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={{ ...fadeUp.transition, delay: 0.35 }}
              viewport={fadeUp.viewport}
              className="w-full mt-2 bg-[#E76F8E] hover:bg-[#d85c7c] active:scale-98 transition duration-200 text-white font-medium py-3 rounded-2xl shadow-md text-sm uppercase tracking-wider cursor-pointer"
            >
              registrarme
            </motion.button>
          </form>
        </div>

        {/* Pie: Redes Sociales centradas */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          viewport={fadeUp.viewport}
          className="w-full py-6 flex flex-col items-center gap-3 border-t border-black/10 mt-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#4b5d67]">
            <a
              href="https://instagram.com/somos.oniria"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E76F8E] transition"
            >
              @somos.oniria
            </a>
            <span className="text-[#4b5d67]/50">|</span>
            <a
              href="https://instagram.com/oniria.tdm3"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E76F8E] transition"
            >
              @oniria.tdm3
            </a>
            <span className="text-[#4b5d67]/50">|</span>
            <a
              href="https://tiktok.com/@somos.oniria"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E76F8E] transition"
            >
              @somos.oniria
            </a>
          </div>
          <span className="text-[11px] text-[#6b7b83]">
            © 2026 Oniria Project • Todos los derechos reservados
          </span>
        </motion.div>
      </section>
    </div>
  );
}

