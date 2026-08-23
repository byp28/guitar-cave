import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import { MdOutlineCategory } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deconnexion } from "../features/UserSlice";
import type { TModalData } from "./Modal";
import Modal from "./Modal";
import { SiHomeassistantcommunitystore } from "react-icons/si";


export default function SideMenu({change} : {change : (name:string)=> void}) {
  const [toggleMenuSection, setToggleMenuSection] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ToggleModal , setToggleModal] = useState(false)
  const ContentModal:TModalData = {
        text : "Êtes-vous sûr de vouloir vous déconnecter ?",
        valide : {
            text : "Se déconnecter",
            background : "red-500",
            color : "white"
        },
        close : {
            text : "Annuler",
            background : "green-500",
            color : "white"
            }, 
    } 

  const valideDeconnexion = ()=>{
        dispatch(deconnexion(""))
        navigate("/")
  }




  const changeSection = (name:string)=>{
    change(name)
    setToggleMenuSection(false)
  }

  return (
    <div className="w-1/5 max-lg:relative max-lg:z-20 max-lg:w-full h-screen flex flex-col justify-between border-r border-r-gray-100">
        <div className="w-full max-lg:px-5 flex max-lg:justify-between  justify-center items-center">
          <div className="hidden max-lg:block w-1/3">
            {
              toggleMenuSection 
              ?
                <AiOutlineClose onClick={()=>setToggleMenuSection(!toggleMenuSection)} className="w-10 h-10  cursor-pointer" />
              :
                <RxHamburgerMenu onClick={()=>setToggleMenuSection(!toggleMenuSection)} className="w-10 h-10  cursor-pointer" />
            }
          </div>
          <h1 className="flex max-lg:w-1/3 flex-col  items-center justify-center text-4xl font-semibold italic px-2 p-6">
            <span>Guitar<span className="text-[#FF0022]">Cave</span></span>
            <span className="text-xs font-base  tracking-wide">Admin</span>
          </h1>
          <div className="hidden max-lg:flex items-center justify-end w-1/3 translate-y-1">
            <ImExit className="w-8 h-8  cursor-pointer" />
          </div>
        </div>
        
        <ul className={`w-full flex flex-col max-lg:absolute max-lg:z-21 max-lg:top-25 ${toggleMenuSection ? "max-lg:flex" : "max-lg:hidden"}`}>
            <span onClick={()=>changeSection("Product")} className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><GiMusicalScore />Produits</span>
            <span onClick={()=>changeSection("Categorie")} className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><BiCategoryAlt />Catégories</span>
            <span onClick={()=>changeSection("SousCategorie")} className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><MdOutlineCategory />Sous-catégorie</span>
            <span onClick={()=>changeSection("SousCategorie")} className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><SiHomeassistantcommunitystore />Commande</span>
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><FaUsers />Utilistateur</span>
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><GrServices />Paramètre</span>
        </ul>

        <button onClick={()=>setToggleModal(true)} className="w-full max-lg:hidden px-8 py-4 text-lg gap-2 cursor-pointer bg-[#FF0022] text-white font-medium  flex items-center">
            <ImExit />
            Se Deconnecter
        </button>
        {
          ToggleModal &&
          <Modal 
            Data={ContentModal}
            Action={valideDeconnexion}
            closeModal={()=>setToggleModal(false)}
          />
        }
    </div>
  )
}
