import { useState } from 'react'
import Portada from './components/Portada'
import InicioTelefono from './components/InicioTelefono'

function App() {
  // Inicializar en 'telefono' si la URL tiene ?screen=telefono o si se guardó en la sesión
  const [currentScreen, setCurrentScreen] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('screen') === 'telefono') {
      return 'telefono'
    }
    return 'portada'
  })

  const handleOpenApp = (appId) => {
    if (appId === 'dia') {
      // Próximamente pantalla / sección de Día
      console.log('Abrir Día')
    } else if (appId === 'mapa') {
      // Próximamente pantalla / sección de Mapa
      console.log('Abrir Mapa')
    } else if (appId === 'desafio') {
      // Redirigir al minijuego Vagari Runner
      window.location.href = './Jugar.html'
    }
  }

  return (
    <div className="max-w-[430px] mx-auto w-full min-h-screen overflow-x-hidden shadow-2xl relative bg-white">
      {currentScreen === 'portada' && (
        <Portada onExplorar={() => setCurrentScreen('telefono')} />
      )}

      {currentScreen === 'telefono' && (
        <InicioTelefono
          onOpenApp={handleOpenApp}
          onBack={() => setCurrentScreen('portada')}
        />
      )}
    </div>
  )
}

export default App


