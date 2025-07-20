import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Options from './components/Options'
import Home from './components/Home'
import AluLogin from './components/AluLogin'
import StaffRegister from './components/StaffRegister'
import AluRegister from './components/AluRegister'
import AluDashBoard from './components/AluDashBoard'
import AddPost from './components/AddPost'
import AluProfile from './components/AluProfile'
import Posts from './components/Posts'
import EditPost from './components/EditPost'
import Options2 from './components/Options2'
import StudRegister from './components/StudRegister'
import StudLogin from './components/StudLogin'
import StudDashBoard from './components/StudDashBoard'
import AluPortal from './components/AluPortal'
import Profile from './components/Profile'
import Post1 from './components/Post1'
import Post from './components/Post'
import Cate from './components/Cate'
import StaffLogin from './components/StaffLogin'
import DonationForm from './components/DonationForm'
import TransactionTable from './components/TransactionTable'
import AdminEvent from './components/AdminEvent'
import AllEvents from './components/AllEvents'
import AdminDash from './components/AdminDash'
import StudAluPortal from './components/StudAluPoratal'
import StudAluProfile from './components/StudAluProfile'
import StudAluPost from './components/StudAluPost'
import StudAluEvents from './components/StudAluEvents'
import StudentPost from './components/StudentPost'





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/option' element={<Options/>}/>
        <Route path='/Loginoption' element={<Options2/>} />
        <Route path='/alumniregister' element={<AluRegister/>}></Route>
        <Route path='/StaffRegister' element={<StaffRegister/>}></Route>
        <Route path='/StaffLogin' element={<StaffLogin/>}></Route>
        <Route path='/studentregister' element={<StudRegister/>} />
        <Route path='/alumnilogin' element={<AluLogin/>}/>
        <Route path='/alumnidashboard' element={<AluDashBoard/>}/>
        <Route path='/alumniaddpost' element={<AddPost/>}/>
        <Route path='/alumniprofile' element={<AluProfile/>}/>
        <Route path='/alumniposts' element={<Posts/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='/edit/:id' element={<EditPost/>} />
        <Route path='/studentLogin' element={<StudLogin/>}/>
        <Route path='/studentDashBoard' element={<StudDashBoard/>}/>
        <Route path='/alumniportal' element={<AluPortal/>} />
        <Route path='/profile/:id' element={<Profile/>} />
        <Route path='/post1/:id' element={<Post1/>}/>
        <Route path='/cate' element={<Cate/>} />
        <Route path='/donation' element={<DonationForm/>} />
        <Route path='/donationHistory' element={<TransactionTable/>} />
        <Route path='/addEvents' element={<AdminEvent/>} />
        <Route path='/allEvents' element={<AllEvents/>} />
        <Route path='/AdmindashBoard' element={<AdminDash/>} />
        <Route path='/StudAluPortal' element={<StudAluPortal/>} />
        <Route path='/StudAluProfile/:id' element={<StudAluProfile/>} />
        <Route path='/StudAluPost/:id' element={<StudAluPost/>}/>
        <Route path='/StudAluEvents' element={<StudAluEvents/>} />
        <Route path='/studentposts' element={<StudentPost/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
