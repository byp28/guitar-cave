import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { ImTable2 } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { deleteProduct, type TProduct } from "../../../utils/guitarCaveApi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useSelector } from "react-redux";
import type { TReducer } from "../../../Store";
import { useAppDispatch } from "../../../hook";
import { fetchProduct } from "../../../features/ProductSlice";
import Modal, { type TModalData } from "../../../layouts/Modal";
import Loading from "../../../components/Loading";

export default function ProductIndex({changeAction,selectProductID} : {changeAction : (name:string)=> void, selectProductID : (prod : TProduct)=>void}) {

    const {products, loading} = useSelector((state:TReducer)=> state.product.data)
    const [idSelected, setIdSelected] = useState<number|undefined>()
    const [toggleModal, setToggleModal] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const Appdispatch = useAppDispatch()

    const ModalData :TModalData = {
        text : "Êtes-vous sûr de vouloir supprimer ce produit ?",
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

    const editProduct = (prod : TProduct)=>{
        selectProductID(prod),
        changeAction("edit")
    }

    const deletedProduct = (prod : TProduct)=>{
        setIdSelected(prod.id)
        setToggleModal(true)
    }

    const deleteOneProduct  = async ()=>{
        if(!idSelected){
            closeModal()
        }else{
            closeModal()
            setLoadingPage(true)
            try {
                const productDeleted = await deleteProduct(idSelected)
                if(productDeleted.status === 200){
                    Appdispatch(fetchProduct())
                    setLoadingPage(false)
                }else{
                    console.log(productDeleted)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const closeModal = ()=>{
        setToggleModal(false)
    }

    useEffect(()=>{
        if(loading){
            Appdispatch(fetchProduct())
        }
    }, [products])

    if(loadingPage || loading){
        return <Loading/>
    }
    
  return (
    <>
        <div className="w-full flex items-center justify-between">
            <span className='text-5xl max-lg:text-4xl font-medium'>Produits</span>
            <span onClick={()=>changeAction("create")} className="w-15 h-15 flex justify-center items-center cursor-pointer text-3xl font-semibold rounded-sm bg-[#41EAD4] text-white">+</span>
        </div>
        <div className="flex gap-8">
            <input className="w-70 px-4 py-2 bg-gray-200 outline-0 rounded-lg" placeholder="Nom de l'article" type="text" />
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
                <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Nom</th>
                <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Prix</th>
                <th scope="col" className="px-6 py-3 text-start  font-medium text-muted-foreground-1">Categorie</th>
                <th scope="col" className="px-6 py-3 text-start  font-medium text-muted-foreground-1">Sous-Catégorie</th>
                <th scope="col" className="px-6 py-3 text-start  font-medium text-muted-foreground-1">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-table-line">
                {
                    products.map((prod, key)=>(
                        <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{prod.nom}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{prod.price} €</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{prod.categorie}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{prod.sousCategorie}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex gap-2 text-end text-sm font-medium">
                                <HiOutlinePencilSquare onClick={()=> editProduct(prod)} className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                                <AiOutlineDelete onClick={()=> deletedProduct(prod)} className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
        </div>
        {
            toggleModal && <Modal
            Data={ModalData}
            closeModal = {closeModal}
            Action = {deleteOneProduct}
        />
        }
        
    </>
  )
}
