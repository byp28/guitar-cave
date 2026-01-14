import './App.css'
import Header from './layouts/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Produit from './pages/Produit'
import Cart from './pages/Cart'


function App() {

 

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product/:id' element={<Produit/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
