import { useState, useEffect } from 'react'
import Portada from './components/Portada'
import InicioTelefono from './components/InicioTelefono'

// Precarga inmediata de assets pesados para que estén listos antes de abrirlos
import fondoFormulario from './assets/fondo-formulario.png'
import fondoMapa from './assets/fondoMapa.webp'
import mapaImg from './assets/mapa.webp'
import cardImg from './assets/card.webp'
import fondoInicio from './assets/fondo-inicio.png'

const ASSETS_TO_PRELOAD = [
  fondoFormulario,
  fondoMapa,
  mapaImg,
  cardImg,
  fondoIniciof
];

function getInitialRoute() {
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const pParam = (params.get('p') || '').toLowerCase();

  // Comprobar tanto pathname directo como parámetro p del fallback SPA (404.html) o screen
  if (path.includes('/mapa') || pParam === 'mapa') {
    return { screen: 'telefono', app: 'mapa' };
  }
  if (path.includes('/desafio') || pParam === 'desafio') {
    return { screen: 'telefono', app: 'desafio' };
  }
  if (path.includes('/simbolo') || pParam === 'simbolo') {
    return { screen: 'telefono', app: 'simbolo' };
  }
  if (path.includes('/inicio') || pParam === 'inicio' || params.get('screen') === 'telefono') {
    return { screen: 'telefono', app: null };
  }
  return { screen: 'portada', app: null };
}

function getBaseUrl() {
  return import.meta.env.BASE_URL;
}

function updateBrowserUrl(subpath) {
  const baseUrl = getBaseUrl();
  const cleanSub = subpath.replace(/^\//, '');
  const targetUrl = cleanSub ? `${baseUrl}${cleanSub}` : baseUrl;
  if (window.location.pathname !== targetUrl) {
    window.history.pushState({}, '', targetUrl);
  }
}

function App() {
  const [route, setRoute] = useState(getInitialRoute);

  // Precargar e instanciar en memoria las imágenes de fondo, mapa y card
  useEffect(() => {
    ASSETS_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  // Sincronizar ruta inicial si venía con parámetro de SPA redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('p') || params.has('screen')) {
      const sub = route.app
        ? (route.app === 'mapa' ? 'Mapa' : route.app === 'simbolo' ? 'Simbolo' : 'Desafio')
        : (route.screen === 'telefono' ? 'Inicio' : '');
      updateBrowserUrl(sub);
    }
  }, []);

  // Escuchar botón atrás/adelante del navegador
  useEffect(() => {
    const handlePopState = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Activar pantalla completa en cualquier pantalla al primer toque/interacción
  useEffect(() => {
    const triggerFullscreen = () => {
      try {
        const docEl = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(() => {});
          } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
          }
        }
      } catch (e) {
        // Ignorar si el navegador no lo soporta
      }
    };

    window.addEventListener('touchstart', triggerFullscreen, { passive: true });
    window.addEventListener('click', triggerFullscreen, { passive: true });

    return () => {
      window.removeEventListener('touchstart', triggerFullscreen);
      window.removeEventListener('click', triggerFullscreen);
    };
  }, []);

  const handleOpenApp = (appId) => {
    if (appId === 'dia' || appId === 'simbolo') {
      updateBrowserUrl('Simbolo');
    } else if (appId === 'mapa') {
      updateBrowserUrl('Mapa');
    } else if (appId === 'desafio') {
      updateBrowserUrl('Desafio');
      // Abrir el juego en la ruta /Jugar/index.html
      const baseUrl = import.meta.env.BASE_URL;
      const gameUrl = `${baseUrl}Jugar/index.html`;
      window.location.href = gameUrl;
    }
  };

  const handleCloseApp = () => {
    updateBrowserUrl('Inicio');
  };

  const handleExplorar = () => {
    updateBrowserUrl('Inicio');
    setRoute({ screen: 'telefono', app: null });
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] md:relative md:min-h-screen bg-[#0d0d0d] flex items-center justify-center overflow-hidden md:overflow-x-hidden md:p-4">
      <div className="w-full h-full max-w-[430px] md:h-[90vh] md:max-h-[880px] md:aspect-[9/16] overflow-hidden shadow-2xl relative bg-black md:rounded-[40px] md:border md:border-white/10 flex flex-col">
        {route.screen === 'portada' && (
          <Portada onExplorar={handleExplorar} />
        )}

        {route.screen === 'telefono' && (
          <InicioTelefono
            initialApp={route.app}
            onOpenApp={handleOpenApp}
            onCloseApp={handleCloseApp}
            onBack={() => {
              updateBrowserUrl('');
              setRoute({ screen: 'portada', app: null });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App


