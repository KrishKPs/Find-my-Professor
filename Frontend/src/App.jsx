import './App.css'
import ProfessorSignup from './Pages/SignupProfessor'
import LoginUI from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AcademicFinder from './Pages/Finder'

function App() {


  return (
    <>
    
     <BrowserRouter>
     <Routes>
      <Route path='/login' element={<LoginUI/>}/>
      <Route path='/signup' element={<ProfessorSignup/>}/>
      <Route path='dashboard' element ={<AcademicFinder/>}/>  
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
