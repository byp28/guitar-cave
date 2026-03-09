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
 
  useEffect(()=>{
    dispatch(fillCart("")) 
  }, [])
  
  return (
    <main className='bg-[#FDFFFC]'>
    <BrowserRouter>
      {hiddeHeader ? <Header /> : null}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/categorie' element={<AllCategorie/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product/:id' element={<Produit/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
      {hiddeHeader ? <Footer/> : null}
      
    </BrowserRouter>
      
    </main>
  )
}

export default App
