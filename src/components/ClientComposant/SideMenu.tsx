import { useState } from "react"
import Modal, { type TModalData } from "../../layouts/Modal"
import { useDispatch, useSelector } from "react-redux"
import { deconnexion } from "../../features/UserSlice"
import { useNavigate } from "react-router-dom"
import { deleteUser } from "../../utils/guitarCaveApi"
import type { TReducer } from "../../Store"

export default function SideMenu({Manage,setManage}: {Manage:string, setManage : (value:string)=>void}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state : TReducer) => state.user.data)

    const [ToggleModal , setToggleModal] = useState(false)
    const [ToggleDelModal , setToggleDelModal] = useState(false)
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

    const DeleteModal:TModalData = {
        text : "Êtes-vous sûr de vouloir supprimer votre compte ?",
        valide : {
            text : "Oui",
            background : "red-500",
            color : "white"
        },
        close : {
            text : "Non",
            background : "green-500",
            color : "white"
            }, 
    } 

    const valideDeconnexion = ()=>{
        dispatch(deconnexion(""))
        navigate("/")
    }

    const DeleteAccount = async ()=>{
        const deleted = await deleteUser(user?.id as number)
        if(deleted.status){
            dispatch(deconnexion(""))
            navigate("/")
        }
    }

  return (
    <div className='w-1/5 flex flex-col gap-3 max-lg:hidden'>
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
                <span onClick={()=>setManage("Comment")} className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Mes Avis
                    {
                        Manage === "Comment" && <span className='w-1 h-4 bg-black'></span>
                    }
                    
                </span>
                <span onClick={()=>setManage("Address")} className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Modifier mon adresse
                    {
                        Manage === "Address" && <span className='w-1 h-4 bg-black'></span>
                    }
                    
                </span>
                <span onClick={()=>setManage("Information")} className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Modifier mes informations
                    {
                        Manage === "Information" && <span className='w-1 h-4 bg-black'></span>
                    }      
                </span>
                <span onClick={()=>setManage("Password")} className='w-fulll py-1 text-lg font-semibold flex justify-between items-center cursor-pointer hover:text-blue-500'>
                    Changer de mot de passe
                    {
                        Manage === "Password" && <span className='w-1 h-4 bg-black'></span>
                    }      
                </span>
                <span onClick={()=> setToggleDelModal(true)} className='w-fulll py-1 text-lg text-red-500 font-semibold flex justify-between items-center cursor-pointer hover:text-red-700'>
                    Supprimer mon compte
                </span>
                <span onClick={()=> setToggleModal(true)} className='w-fulll py-1 text-lg text-red-500 font-semibold flex justify-between items-center cursor-pointer hover:text-red-700'>
                    Se déconnecter
                </span>
                {
                    ToggleModal &&
                    <Modal 
                        Data={ContentModal}
                        Action={valideDeconnexion}
                        closeModal={()=>setToggleModal(false)}
                    />
                }

                {
                    ToggleDelModal &&
                    <Modal 
                        Data={DeleteModal}
                        Action={DeleteAccount}
                        closeModal={()=>setToggleDelModal(false)}
                    />
                }
            </div>

  )
}
