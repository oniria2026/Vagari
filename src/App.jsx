import { useState } from 'react'
import Portada from './components/Portada'
import Landing from './components/Landing'

function App() {
  const [isExploring, setIsExploring] = useState(false)

  return (
    <div className="max-w-[400px] mx-auto w-full min-h-screen overflow-x-hidden shadow-2xl relative bg-black">
      {!isExploring ? (
        <Portada onExplorar={() => setIsExploring(true)} />
      ) : (
        <Landing />
      )}
    </div>
  )
}

export default App

