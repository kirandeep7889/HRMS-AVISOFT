import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NavBar from './components/common/Navbar'

function App() {
   
  return (
    <div className='w-screen h-screen flex flex-col font-inter'>
      <NavBar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  )

}

export default App
