import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { ImTable2 } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { deleteCommande, editCommande, getCommande, type TCommande } from "../../../utils/guitarCaveApi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Loading from "../../../components/Loading";
import Modal, { type TModalData } from "../../../layouts/Modal";
import EditStats from "../../../components/ModalForm/EditStats";


export default function CategorieIndex() {

    const [commands, setCommands] = useState<TCommande[]>([])
    const [idSelected, setIdSelected] = useState<number|undefined>()
    const [oldStat, setOldStat] = useState<string>("")
    const [newStat, setNewStat] = useState<string>("")
    const [loadingPage, setLoadingPage] = useState(true)
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [toggleEditModal, setToggleEditModal] = useState(false)



    const formatDate=(isoString : string)=> {
        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    }

    const ModalDeleteData :TModalData = {
        text : "Êtes-vous sûr de vouloir supprimer cette commande ?",
        valide : {
            text : "Supprimer",
            color : "white",
            background : "red-400"
        } ,
        close : {
            text : "Annuler",
            color : "white",
            background : "green-400"
        } 
    }

    const ModalEditData :TModalData = {
        text : "",
        content : <EditStats setNewStat={setNewStat} baseText={oldStat}/>,
        valide : {
            text : "Supprimer",
            color : "white",
            background : "red-400"
        } ,
        close : {
            text : "Annuler",
            color : "white",
            background : "green-400"
        } 
    }

 

    const fetchCommands = async ()=> {
        setLoadingPage(true)
        try{
            const commandData = await getCommande()
            if(commandData.status === 200){
                setCommands(commandData.data as TCommande[])
                setLoadingPage(false)
            }
        }catch(e){
            console.log(e)
        }   
    }

    const deletedCommand = (prod : TCommande)=>{
        setIdSelected(prod.id)
        setToggleDeleteModal(true)
    }

    const editThisCommand = (prod : TCommande)=>{
        setIdSelected(prod.id)
        setOldStat(prod.status)
        setToggleEditModal(true)
    }

    const deleteOneCommand = async ()=>{
        if(!idSelected){
            closeModal()
        }else{
            closeModal()
            setLoadingPage(true)
            try {
                const commandDeleted = await deleteCommande(idSelected)
                if(commandDeleted.status === 200){
                    fetchCommands()
                    setLoadingPage(false)
                }else{
                    console.log(commandDeleted)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const editOneCommand = async ()=>{
        if(!idSelected){
            closeModal()
        }else{
            closeModal()
            setLoadingPage(true)
            try {
                const commandEdited = await editCommande(idSelected,{status : newStat})
                if(commandEdited.status === 200){
                    fetchCommands()
                    setLoadingPage(false)
                }else{
                    console.log(commandEdited)
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
            fetchCommands()
        }
        
        if(!loadingPage){
            window.scrollTo(0, 0);
        }
    },[commands])

    
    if(loadingPage){
        return <Loading/>
    }
        

  return (
    <>
        <div className="w-full flex items-center justify-between">
            <span className='text-5xl max-lg:text-4xl font-medium'>Commandes</span>
        </div>
        <div className="flex gap-8">
            <input className="w-70 px-4 py-2 bg-gray-200 outline-0 rounded-lg" placeholder="Nom de la categorie" type="text" />
            <button className="px-4 py-2 bg-gray-200 cursor-pointer font-medium rounded-lg hover:bg-gray-300">Go</button>
        </div>
        
        <div className="w-full flex items-center justify-between">
            <span className="flex bg-gray-100 gap-2 rounded-lg">
                <ImTable2 className="w-10 h-10 bg-gray-200 p-2 rounded-lg cursor-pointer hover:text-[#B91372]" />
                <BiCategory className=" p-2 rounded-lg w-10 h-10 cursor-pointer hover:text-[#B91372]" />
            </span>
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
                    <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Numeros</th>
                    <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Date</th>
                     <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Status</th>
                    <th scope="col" className="px-6 py-3 text-end font-medium text-muted-foreground-1">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-table-line">
                {
                    commands.map((c,key)=>(
                        <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{c.CommandeNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{formatDate(c.date_cmd)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{c.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-end gap-2 text-end text-sm font-medium">
                                <HiOutlinePencilSquare onClick={()=>editThisCommand(c)} className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                                <AiOutlineDelete onClick={()=>deletedCommand(c)} className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
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
                Action = {deleteOneCommand}
            />
        }

        {
            toggleEditModal && <Modal
                Data={ModalEditData}
                closeModal = {closeModal}
                Action = {editOneCommand}
            />
        }

    </>
  )
}
