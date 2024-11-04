import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfessorSignup from './Pages/SignupProfessor'
import LoginUI from './Pages/LoginProfessor'
import AdminSignup from './Pages/SignupAdmin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <ProfessorSignup/> */}
     {/* <LoginUI/> */}
     <AdminSignup/> 
    </>
  )
}

export default App
