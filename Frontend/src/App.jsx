import './App.css'
import ProfessorSignup from './Pages/SignupProfessor'
import LoginUI from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AcademicFinder from './Pages/Finder'
import Homepage from './Pages/Homepage'
import { OneProfessor } from './Pages/OneProfessor'
import AdminSignup from './Pages/SignupAdmin'
import { AdminDashboard } from './Pages/Admindashboard'
import LoginUser from './Pages/Loginuser'
import UserSignup from './Pages/SignupUser'
import ProfessorDetail from './Pages/ProfessorDetail'
import ProfessorDetailForm from './Pages/ProfessorDetailForm'
import ProfessorDashboard from './Pages/Professor_homepage'
import LoadingPage from './Pages/Loading'
import AdminLogin from './Pages/Adminlogin'
import ImageUpload from './Pages/Uploadimage'


function App() {


  return (
    <>
    
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LoadingPage/>}/>
      <Route path='/login' element={<LoginUI/>}/>
      <Route path='/signup' element={<ProfessorSignup/>}/>
      {/* <Route path='/dashboard' element ={<AcademicFinder/>}/> */}
      <Route path='/homepage' element ={<Homepage/>}/>
      <Route path='/homepage/:id' element ={<OneProfessor/>}/>  
      {/* <Route path='/professordetail' element ={<ProfessorDetail/>}/> */}
      <Route path='/professordash' element ={<ProfessorDashboard/>}/>
      <Route path='/professorform' element ={<ProfessorDetailForm/>}/>
      <Route path='/adminsignup' element={<AdminSignup/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/userSignup' element={<UserSignup/>}/>
      <Route path='/userlogin' element={<LoginUser/>}/> 

      <Route path='/imageupload' element={<ImageUpload/>}/>

      

      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
