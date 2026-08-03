import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import HomeClient from './Client/HomeClient'
import ClientCommande from './Client/ClientCommande'

export default function ClientAdmin({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
  const [Manage, setManage] = useState("Home")
  const dispatch = useDispatch()


  const changePanel = (name : string)=>{
    setManage(name)
  }


  useEffect(()=>{
    toggleNavBar(true)
  },[])

  return (
    <div className="w-full px-15 py-10">
        <span className='text-6xl font-semibold mb-10'>Espace client</span>
        <section className='flex min-h-screen py-15 '>
            <div className='w-1/5 flex flex-col gap-3'>
                <span onClick={()=>setManage("Home")} className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Aperçu
                    {
                        Manage === "Home" && <span className='w-1 h-4 bg-black'></span>
                    }
                    
                </span>
                <span onClick={()=>setManage("Commande")} className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Mes commandes
                    {
                        Manage === "Commande" && <span className='w-1 h-4 bg-black'></span>
                    }
                    
                </span>
                <span className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Mes Avis
                    {
                        Manage === "avis" && <span className='w-1 h-4 bg-black'></span>
                    }
                    
                </span>
                <span className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Modifier mes informations
                    {
                        Manage === "information" && <span className='w-1 h-4 bg-black'></span>
                    }      
                </span>
                <span className='w-fulll py-1 text-lg text-red-500 font-semibold flex justify-between items-center cursor-pointer hover:text-red-700'>
                    Se déconnecter
                </span>
            </div>
            {Manage === "Home" && <HomeClient/>}
            {Manage === "Commande" && <ClientCommande/>}
        </section>
        
        {/* {Manage === "Product" && <ProductManage/>}
        {Manage === "Categorie" && <CategorieManage/>}
        {Manage === "SousCategorie" && <SousCategorieManage/>} */} 
    </div>
  )
}
