import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfessorSignup from './Pages/SignupProfessor'
import LoginUI from './Pages/LoginProfessor'
import AcademicFinder from './Pages/Finder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <ProfessorSignup/> */}
     {/* <LoginUI/> */}
     <AcademicFinder/>
    </>
  )
}

export default App
