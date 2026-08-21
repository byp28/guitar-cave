import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { getProductsByName, type TProductEconomy } from "../utils/guitarCaveApi";



export default function Header() {

    const [nameProduct,setNameProduct] = useState("")
    const [products, setProducts] = useState<TProductEconomy[]>([])
    const [toggleSubSection, setToggleSubSection] = useState(false)
    const [toggleSearchSection, setToggleSearchSection] = useState(false)
    const [toggleMenuSection, setToggleMenuSection] = useState(false)
    const {cart} = useSelector((state : TReducer) => state.cart.data)
    const {user,connected} = useSelector((state : TReducer) => state.user.data)
    const navigate = useNavigate()

    const SearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setNameProduct(text)
        if(nameProduct !== ""){
            fetchProduct(nameProduct)
            CloseAllSection()
            setToggleSubSection(true)
            setToggleSearchSection(true)
        }else{
            CloseAllSection()
            setToggleSubSection(false)
        }

        if (!text) {
            CloseAllSection()
            setToggleSubSection(false)
        }
    };

    const fetchProduct = async (name : string)=>{
        const productData = await getProductsByName(name)
        if(productData.status === 200){
            setProducts(productData.data)
        }else{
            setProducts([])
        }
    }

    const CloseAllSection = ()=>{
        setToggleSearchSection(false)
        setToggleMenuSection(false)
    }

    const OpenMenu = ()=>{
        CloseAllSection()
        setToggleMenuSection(true)
        setToggleSubSection(true)
    }

    const CloseMenu = ()=>{
        CloseAllSection()
        setToggleSubSection(false)
    }


    const productClicked = (id:number)=>{
        CloseAllSection()
        setToggleSubSection(false)
        setNameProduct("")
        navigate(`/product/${id}`)
    }


    const typeUser  = ()=>{
        if(user?.type == "Admin"){
            return "Admin"
        }
        return "Client"

    }

  return (
    <div className="w-full relative z-20 px-10 max-lg:px-5 py-4 text-black  flex flex-col gap-6 justify-center items-center">
        <div className="flex w-full justify-between items-center">
            <div className="hidden max-lg:block w-1/3">
                {
                    toggleMenuSection 
                    ?
                        <AiOutlineClose onClick={()=>CloseMenu()} className="w-10 h-10  cursor-pointer" />
                    :
                        <RxHamburgerMenu onClick={()=>OpenMenu()} className="w-10 h-10  cursor-pointer" />
                }
            </div>
            <div className="w-1/3 max-lg:hidden flex gap-6">
                <Link className="font-semibold hover:text-[#FF0022]" to={'/'}>Service</Link>
                <Link className="font-semibold hover:text-[#FF0022]" to={'/'}>Contact</Link>
            </div>
            <Link to={"/"} className="w-1/3 flex items-center justify-center text-4xl font-semibold italic">Guitar<span className="text-[#FF0022]">Cave</span></Link>
            <div className="flex gap-8 w-1/3 justify-end items-center max-lg:hidden">
                {
                    connected 
                    ?
                    <>
                        {
                            typeUser() == "Admin" 
                            ?
                            <Link to={"/admin"}><FaRegUserCircle className="w-7 h-7 " /></Link>
                            :
                            <Link to={"/client-admin"}><FaRegUserCircle className="w-7 h-7 " /></Link>
                        }
                        
                        <Link to={"/"}><FaRegHeart className="w-7 h-7 " /></Link>
                    </>
                    :
                    <>
                        <Link className="py-2 font-semibold text-blue-500" to={"/login"}>Se connecter</Link>
                        <Link className="py-2 font-semibold text-blue-500" to={"/register"}>Créer un compte</Link>
                    </> 
                    
                } 
            </div>
            <div className="hidden max-lg:w-1/3 max-lg:flex justify-end">
                <span className="w-7 h-7">
                    <Link className="relative" to={"/cart"}>
                        <IoCartOutline className="w-7 h-7" />
                        {
                            cart.length === 0 ? " " 
                            : <span className="w-4 h-4 absolute flex justify-center items-center top-0 right-0 text-xs text-white bg-red-500 rounded-full">{cart.length}</span>
                        }
                    </Link>
                </span>
            </div>
        </div>
        <div className="items-center flex w-full justify-center">
            <div className="flex gap-6 w-1/3 max-lg:hidden">
                <Link className="font-semibold text-lg hover:text-[#FF0022]" to={'/'}>Accueil</Link>
                <Link className="font-semibold text-lg hover:text-[#FF0022]" to={'/categorie'}>Catégorie</Link>
            </div>
            <div className="w-1/3 max-lg:w-full flex justify-between items-center px-4 h-xs gap-5 py-2 rounded-full border border-neutral-900">
                <input type="text" value={nameProduct} onChange={SearchProduct} placeholder="Recherche" className="w-full   outline-0 " />
                <AiOutlineSearch className="w-5 h-5" />
            </div>
            
            <div className="w-1/3 max-lg:hidden flex justify-end">
                <span className="w-7 h-7">
                    <Link className="relative" to={"/cart"}>
                        <IoCartOutline className="w-7 h-7" />
                        {
                            cart.length === 0 ? " " 
                            : <span className="w-4 h-4 absolute flex justify-center items-center top-0 right-0 text-xs text-white bg-red-500 rounded-full">{cart.length}</span>
                        }
                    </Link>
                </span>
            </div>

        </div>

        <section className={toggleSubSection ? "w-full  min-h-20 border-b-4 border-b-blue-500 absolute z-21 top-34 bg-white" : "hidden"}>
           <div className={toggleSearchSection ? "w-full px-6 py-4 flex flex-col" : "hidden"}>
                <span className="text-4xl mb-4 font-semibold">
                    <span>Résultats : </span>
                    <span>"{nameProduct}"</span>
                </span>
                {
                    products.length === 0 
                    ? 
                    <span className="text-lg font-semibold">Aucun résultat pour cette recherche</span>
                    :
                    products.map((p,key)=>(
                        <span onClick={()=>productClicked(p.id)} key={key} className="w-full p-1 flex items-center gap-3 cursor-pointer hover:bg-gray-200"><span className="font-bold">{p.nom}</span><span>{p.categorie} - {p.sousCategorie}</span></span>
                    ))
                }
           </div>

           <div className={toggleMenuSection ? "w-full px-8 py-4 flex flex-col gap-4" : "hidden"}>
                <Link className="font-semibold " to={'/'}>Accueil</Link>
                <Link className="font-semibold " to={'/categorie'}>Catégorie</Link>
                <Link className="font-semibold " to={'/'}>Service</Link>
                <Link className="font-semibold " to={'/'}>Contact</Link>
                {
                    connected 
                    ?
                    <>
                        {
                            typeUser() == "Admin" 
                            ?
                            <Link className="font-semibold text-blue-500" to={"/admin"}>Administration</Link>
                            :
                            <Link className="font-semibold text-blue-500" to={"/client-admin"}>Espace client</Link>
                        }
                    </>
                    :
                    <>
                        <Link className="font-semibold text-blue-500" to={"/login"}>Se connecter</Link>
                        <Link className="font-semibold text-blue-500" to={"/register"}>Créer un compte</Link>
                    </> 
                    
                } 
                
           </div>
        </section>

    </div>
  )
}
