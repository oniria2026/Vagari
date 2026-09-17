import { useState } from 'react'
import Portada from './components/Portada'
import Landing from './components/Landing'

function App() {
  const [explorando, setExplorando] = useState(false)

  return (
    <div className="max-w-[400px] mx-auto w-full min-h-screen overflow-x-hidden shadow-2xl relative bg-black">
      {!explorando ? (
        <Portada onExplorar={() => setExplorando(true)} />
      ) : (
        <Landing />
      )}
    </div>
  )
}

export default App

