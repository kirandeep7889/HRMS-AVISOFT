import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/auth/PrivateRoute';
import CreateEmployee from './components/core/dashboard/AdminPanel/Employee/CreateEmployee';

function App() {
  return (
    <div className='flex flex-col font-inter'>
      <NavBar/>
      <div>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <>
              <Route path='/employee/employee-list' />
              <Route path='/employee/create-Employee' element={<CreateEmployee/>} />
              <Route path='/employee/upload-profileImage/:employeeId' />
            </>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
