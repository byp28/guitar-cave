import './App.css'
import Header from './layouts/Header'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Produit from './pages/Produit'
import Cart from './pages/Cart'
import Search from './pages/Search'
import Register from './pages/Register'
import Footer from './layouts/Footer'
import Login from './pages/Login'
import AllCategorie from './pages/AllCategorie'
import { useDispatch, useSelector } from 'react-redux'
import { fillCart, type TCart, type TInitialCart } from './features/cart'
import { useEffect, useState } from 'react'
import Admin from './pages/Admin'


function App() {

  const dispatch = useDispatch()
  const [hiddeHeader, setHiddeHeader] = useState(false)

  const toggleNavBar = (toggle:boolean)=>{
    setHiddeHeader(toggle)
  }
 
  useEffect(()=>{
    dispatch(fillCart("")) 
  }, [])
  
  return (
    <main className='bg-[#FDFFFC]'>
    <BrowserRouter>
      {hiddeHeader ? <Header /> : null}
      <Routes>
        <Route path='/' element={<Home toggleNavBar={toggleNavBar} />} />
        <Route path='/categorie' element={<AllCategorie toggleNavBar={toggleNavBar} />} />
        <Route path='/register' element={<Register toggleNavBar={toggleNavBar} />} />
        <Route path='/admin' element={<Admin toggleNavBar={toggleNavBar} />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart toggleNavBar={toggleNavBar} />} />
        <Route path='/product/:id' element={<Produit toggleNavBar={toggleNavBar} />} />
        <Route path='/search' element={<Search toggleNavBar={toggleNavBar} />} />
      </Routes>
      {hiddeHeader ? <Footer/> : null}
      
    </BrowserRouter>
      
    </main>
  )
}

export default App
