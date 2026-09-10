import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { deleteUser, getUser, updateUserRole, type TUser } from "../../../utils/guitarCaveApi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Loading from "../../../components/Loading";
import Modal, { type TModalData } from "../../../layouts/Modal";
import EditRole from "../../../components/ModalForm/EditRole";


export default function UserIndex() {

    const [users, setUsers] = useState<TUser[]>([])
    const [idSelected, setIdSelected] = useState<number|undefined>()
    const [newStat, setNewStat] = useState<string>("")
    const [loadingPage, setLoadingPage] = useState(true)
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [toggleEditModal, setToggleEditModal] = useState(false)


    const ModalDeleteData :TModalData = {
        text : "Êtes-vous sûr de vouloir supprimer cette commande ?",
        valide : {
            text : "Supprimer",
            color : "white",
            background : "red-500"
        } ,
        close : {
            text : "Annuler",
            color : "white",
            background : "green-500"
        } 
    }

    const ModalEditData :TModalData = {
        text : "",
        content : <EditRole setNewStat={setNewStat}/>,
        valide : {
            text : "Supprimer",
            color : "white",
            background : "red-500"
        } ,
        close : {
            text : "Annuler",
            color : "white",
            background : "green-500"
        } 
    }

 

    const fetchUsers = async ()=> {
        setLoadingPage(true)
        try{
            const userData = await getUser()
            if(userData.status === 200){
                setUsers(userData.data as TUser[])
                setLoadingPage(false)
            }
        }catch(e){
            console.log(e)
        }   
    }

    const deletedThisUser = (prod : TUser)=>{
        setIdSelected(prod.id)
        setToggleDeleteModal(true)
    }

    const editThisUser = (prod : TUser)=>{
        setIdSelected(prod.id)
        setToggleEditModal(true)
    }

    const deleteOneUser = async ()=>{
        if(!idSelected){
            closeModal()
        }else{
            closeModal()
            setLoadingPage(true)
            try {
                const userDeleted = await deleteUser(idSelected)
                if(userDeleted.status === 200){
                    fetchUsers()
                    setLoadingPage(false)
                }else{
                    console.log(userDeleted)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const editOneUser = async ()=>{
        if(!idSelected){
            closeModal()
        }else{
            closeModal()
            setLoadingPage(true)
            try {
                const userEdited = await updateUserRole({role : newStat},idSelected)
                if(userEdited.status === 200){
                    fetchUsers()
                    setLoadingPage(false)
                }else{
                    console.log(userEdited)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const closeModal = ()=>{
        setToggleDeleteModal(false)
        setToggleEditModal(false)
    }



    useEffect(()=>{
        if(loadingPage){
            fetchUsers()
        }
        
        if(!loadingPage){
            window.scrollTo(0, 0);
        }
    },[users])

    
    if(loadingPage){
        return <Loading/>
    }
        

  return (
    <>
        <div className="w-full flex items-center justify-between">
            <span className='text-5xl max-lg:text-4xl font-medium'>Utilistateurs</span>
        </div>
        <div className="flex gap-8">
            <input className="w-70 px-4 py-2 bg-gray-200 outline-0 rounded-lg" placeholder="Nom de la categorie" type="text" />
            <button className="px-4 py-2 bg-gray-200 cursor-pointer font-medium rounded-lg hover:bg-gray-300">Go</button>
        </div>
        
        <div className="w-full flex items-center justify-between">
            <span className="w-30 font-medium bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer px-4 py-2 ">
                A-Z
                <IoIosArrowDown />
            </span>
        </div>

        <div className="min-w-full">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
            <table className="min-w-full divide-y divide-table-line">
            <thead>
                <tr>
                    <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Nom</th>
                    <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Email</th>
                     <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Role</th>
                    <th scope="col" className="px-6 py-3 text-end font-medium text-muted-foreground-1">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-table-line">
                {
                    users.map((u,key)=>(
                        <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{u.nom}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{u.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{u.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-end gap-2 text-end text-sm font-medium">
                                <HiOutlinePencilSquare onClick={()=>editThisUser(u)} className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                                <AiOutlineDelete onClick={()=>deletedThisUser(u)} className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                            </td>
                        </tr>
                    ))
                }

            </tbody>
            </table>
        </div>
        </div>
        {
            toggleDeleteModal && <Modal
                Data={ModalDeleteData}
                closeModal = {closeModal}
                Action = {deleteOneUser}
            />
        }

        {
            toggleEditModal && <Modal
                Data={ModalEditData}
                closeModal = {closeModal}
                Action = {editOneUser}
            />
        }

    </>
  )
}
