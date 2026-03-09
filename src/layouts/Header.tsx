import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";



export default function Header() {

    

    const {cart} = useSelector((state : TReducer) => state.cart.data)


  return (
    <div className="w-full fixed top-0 bg-white/20 left-0 z-30 px-20 py-4  flex flex-col gap-6 justify-center items-center">
        <div className="flex w-full justify-between items-center">
            <div className="flex gap-6 w-1/3 max-lg:hidden">
                <Link className="font-semibold hover:text-[#FF0022]" to={'/'}>Accueil</Link>
                <Link className="font-semibold hover:text-[#FF0022]" to={'/categorie'}>Catégorie</Link>
                <Link className="font-semibold hover:text-[#FF0022]" to={'/'}>A propos</Link>
                <Link className="font-semibold hover:text-[#FF0022]" to={'/'}>Service</Link>
                <Link className="font-semibold hover:text-[#FF0022]" to={'/'}>Contact</Link>
            </div>
            <h1 className="w-1/3 flex items-center justify-center text-4xl font-semibold italic">Guitar<span className="text-[#FF0022]">Cave</span></h1>
            <div className="flex gap-8 w-1/3 justify-end items-center max-lg:hidden">
                <Link className="hidden px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600" to={'/'}>S'incrire</Link>
                <Link className="hidden px-4 py-2 font-semibold rounded-lg text-blue-500 border-2 border-blue-400" to={'/'}>Se connecter</Link>
                <Link to={"/register"}><FaRegUserCircle className="w-7 h-7 " /></Link>
                <Link to={"/login"}><FaRegHeart className="w-7 h-7 " /></Link>
                <span onClick={()=>console.log(cart)} className="relative">
                    {
                        cart.length === 0 ? " " 
                        : <span className="w-4 h-4 absolute flex justify-center items-center top-0 right-0 text-xs text-white bg-red-500 rounded-full">{cart.length}</span>

                    }
                    <Link to={"/cart"}><IoCartOutline className="w-7 h-7" /></Link>
                </span>
                
            </div>
            <RxHamburgerMenu className="w-10 h-10 hidden max-lg:block cursor-pointer" />
        </div>
        <div className="items-center flex w-full justify-center">
            <input type="text" placeholder="Recherche" className="w-1/4 max-lg:w-full bg-[#FF0022] h-xs p-2 rounded-xl outline-0 text-center" />
        </div>
    </div>
  )
}
