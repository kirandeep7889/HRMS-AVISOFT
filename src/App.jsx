import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NavBar from './components/common/Navbar'
import Dashboard from './pages/Dashboard'
import EmployeeList from './components/core/dashboard/AdminPanel/Employee/EmployeeList'
// import UploadEmployeeImage from './components/core/dashboard/AdminPanel/Employee/UploadEmployeeImage'
import PrivateRoute from './components/core/auth/PrivateRoute'
import CreateEmployee from './components/core/dashboard/AdminPanel/Employee/CreateEmployee'
import EmployeeInfo from './pages/EmployeeInfo'

function App() {
   
  return (
    <div className=' flex flex-col   bg-slate-200'>
      <NavBar/>
      <div>
        <Routes>
        <Route path="/employee-info/:employeeName" element={<PrivateRoute><EmployeeInfo/></PrivateRoute>}/>
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
              <Route  path='/employee/employee-list' element={<EmployeeList/>} />
              <Route  path='/employee/create-Employee' element={<CreateEmployee/>} />
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  )

}

export default App
