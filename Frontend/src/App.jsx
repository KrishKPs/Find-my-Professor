import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfessorSignup from './Pages/SignupProfessor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ProfessorSignup/>
    </>
  )
}

export default App
