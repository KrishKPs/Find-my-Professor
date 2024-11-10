import './App.css'
import ProfessorSignup from './Pages/SignupProfessor'
import LoginUI from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AcademicFinder from './Pages/Finder'
import Homepage from './Pages/Homepage'
import ProfessorDetail from './Pages/ProfessorDetail'
import { OneProfessor } from './Pages/OneProfessor'
import AdminSignup from './Pages/SignupAdmin'
import { AdminDashboard } from './Pages/Admindashboard'

function App() {


  return (
    <>
    
     <BrowserRouter>
     <Routes>
      <Route path='/login' element={<LoginUI/>}/>
      <Route path='/signup' element={<ProfessorSignup/>}/>
      <Route path='/dashboard' element ={<AcademicFinder/>}/>
      <Route path='/homepage' element ={<Homepage/>}/>
      <Route path='/homepage/:id' element ={<OneProfessor/>}/>  

      <Route path='/adminsignup' element={<AdminSignup/>}/> 
      <Route path='/admindashboard' element={<AdminDashboard/>}/> 

      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
