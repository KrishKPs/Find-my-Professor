import './App.css'

import AdminSignup from './Pages/SignupAdmin'
import ProfessorSignup from './Pages/SignupProfessor'
import LoginUI from './Pages/LoginProfessor'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'lucide-react'

function App() {


  return (
    <>
     <AdminSignup/> 
     <BrowserRouter>
     <Routes>
      <Route path='/login' element={<LoginUI/>}/>
      <Route path='/signup' element={<ProfessorSignup/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
