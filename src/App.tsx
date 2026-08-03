import './App.css'
import Header from './layouts/Header'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Produit from './pages/Produit'
import Cart from './pages/Cart'
import Search from './pages/Search'
import Register from './pages/Register'
import Footer from './layouts/Footer'
import Login from './pages/Login'
import AllCategorie from './pages/AllCategorie'
import { useDispatch, useSelector} from 'react-redux'
import { fillCart } from './features/cart'
import { useEffect, useState } from 'react'
import Admin from './pages/Admin'
import AllSubCategorie from './pages/AllSubCategorie'
import AllProductBySubCategorie from './pages/AllProductBySubCategorie'
import { useAppDispatch } from './hook'
import type { TReducer } from './Store'
import { verifieConnection } from './features/UserSlice'
import ClientAdmin from './pages/ClientAdmin'
import Commande from './pages/Commande'


function App() {

  const dispatch = useDispatch()
  const [isAdmin, setIsAdmin] = useState(false)
  const [hiddeHeader, setHiddeHeader] = useState(false)

  const {user,connected} = useSelector((state : TReducer) => state.user.data)
  const Appdispatch = useAppDispatch()
  const toggleNavBar = (toggle:boolean)=>{
    setHiddeHeader(toggle)
  }
 

  useEffect(()=>{
    dispatch(fillCart("")) 
    Appdispatch(verifieConnection())
    if(user){
      if(user.type === "Admin"){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    }
  }, [])
  
  return (
    <main className='bg-[#FDFFFC]'>
    <BrowserRouter>
      {hiddeHeader ? <Header /> : null}
      <Routes>
        <Route path='/' element={<Home toggleNavBar={toggleNavBar} />} />
        <Route path='/categorie' element={<AllCategorie toggleNavBar={toggleNavBar} />} />
        <Route path='/categorie/:id' element={<AllSubCategorie toggleNavBar={toggleNavBar} />} />
        <Route path='/categorie/sous-categorie/:id' element={<AllProductBySubCategorie toggleNavBar={toggleNavBar} />} />
        <Route path='/register' element={<Register toggleNavBar={toggleNavBar} />} />
        {
          user?.type === "Admin" && <Route path='/admin' element={<Admin toggleNavBar={toggleNavBar} />}/>
        }
        {
          user?.type === "Client" && <Route path='/client-admin' element={<ClientAdmin toggleNavBar={toggleNavBar} />}/>
        }
        <Route path='/login' element={<Login toggleNavBar={toggleNavBar} />} />
        <Route path='/cart' element={<Cart toggleNavBar={toggleNavBar} />} />
        {
          user?.type === "Client" && <Route path='/commande' element={<Commande toggleNavBar={toggleNavBar} />}/>
        }
        <Route path='/product/:id' element={<Produit toggleNavBar={toggleNavBar} />} />
        <Route path='/search' element={<Search toggleNavBar={toggleNavBar} />} />
      </Routes>
      {hiddeHeader ? <Footer/> : null}
      
    </BrowserRouter>
      
    </main>
  )
}

export default App
