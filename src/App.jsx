import { useState, useEffect } from 'react'
import Portada from './components/Portada'
import InicioTelefono from './components/InicioTelefono'

function getInitialRoute() {
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const pParam = (params.get('p') || '').toLowerCase();

  // Comprobar tanto pathname directo como parámetro p del fallback SPA (404.html) o screen
  if (path.includes('/mapa') || pParam === 'mapa') {
    return { screen: 'telefono', app: 'mapa' };
  }
  if (path.includes('/desafio') || pParam === 'desafio' || path.includes('/jugar')) {
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
  const isGhPages = window.location.hostname.includes('github.io');
  return isGhPages ? '/Vagari/' : '/';
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
      // Abrir el juego en la ruta /Jugar/
      const isGhPages = window.location.hostname.includes('github.io');
      const gameUrl = isGhPages ? '/Vagari/Jugar/' : '/Jugar/';
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
    <div className="max-w-[430px] mx-auto w-full min-h-screen overflow-x-hidden shadow-2xl relative bg-white">
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
  );
}

export default App


