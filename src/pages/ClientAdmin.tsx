import { useEffect, useState } from 'react'
import HomeClient from './Client/HomeClient'
import ClientCommande from './Client/ClientCommande'
import ClientComment from './Client/ClientComment'
import ClientInformation from './Client/ClientInformation'
import ClientPassword from './Client/ClientPassword'
import ClientAddress from './Client/ClientAddress'
import SideMenu from '../components/ClientComposant/SideMenu'
import { AiOutlineClose } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import SideMenuMobile from '../components/ClientComposant/SideMenuMobile'

export default function ClientAdmin({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
  const [Manage, setManage] = useState("Home")
  const [toggleMenuSection , setToggleMenuSection ] = useState(false)


  const changePanel = (name : string)=>{
    setManage(name)
    setToggleMenuSection(false)
  }


  useEffect(()=>{
    toggleNavBar(true)
  },[])

  return (
    <div className="w-full px-15 py-10 max-lg:px-5 ">
        <div className='text-6xl flex w-full justify-between items-center max-lg:text-5xl font-semibold mb-5'>
            <span>Espace client</span>
            <div className="hidden max-lg:block relative z-10  translate-y-1">
                {
                    toggleMenuSection 
                    ?
                        <AiOutlineClose onClick={()=>setToggleMenuSection(false)} className="cursor-pointer" />
                    :
                        <RxHamburgerMenu onClick={()=>setToggleMenuSection(true)} className="cursor-pointer" />
                }          
            </div>
            <SideMenuMobile toggleMenuSection={toggleMenuSection} Manage={Manage} setManage={changePanel}/>
        </div>
        <section className='flex min-h-screen py-15 '>
            <SideMenu Manage={Manage} setManage={changePanel}/>
            {Manage === "Home" && <HomeClient/>}
            {Manage === "Commande" && <ClientCommande/>}
            {Manage === "Comment" && <ClientComment/>}
            {Manage === "Address" && <ClientAddress/>}
            {Manage === "Information" && <ClientInformation/>}
            {Manage === "Password" && <ClientPassword/>}
        </section>
        {/* {Manage === "Product" && <ProductManage/>}
        {Manage === "Categorie" && <CategorieManage/>}
        {Manage === "SousCategorie" && <SousCategorieManage/>} */} 
    </div>
  )
}
