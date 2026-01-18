import './App.css'
import Header from './layouts/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Produit from './pages/Produit'
import Cart from './pages/Cart'
import Search from './pages/Search'
import Register from './pages/Register'
import Footer from './layouts/Footer'
import Login from './pages/Login'
import AllCategorie from './pages/AllCategorie'


function App() {

 

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/categorie' element={<AllCategorie/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product/:id' element={<Produit/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
