import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div className="w-full px-6 py-4 border-b border-b-gray-900 flex flex-col gap-6 justify-center items-center">
        <div className="flex w-full justify-between items-center">
            <div className="flex gap-4 w-1/3 max-lg:hidden">
                <Link className="font-semibold hover:text-blue-300" to={'/'}>Accueil</Link>
                <Link className="font-semibold hover:text-blue-300" to={'/'}>Promo</Link>
                <Link className="font-semibold hover:text-blue-300" to={'/'}>A propos</Link>
                <Link className="font-semibold hover:text-blue-300" to={'/'}>Service</Link>
                <Link className="font-semibold hover:text-blue-300" to={'/'}>Contact</Link>
            </div>
            <h1 className="w-1/3 flex items-center justify-center text-4xl font-semibold italic">Guitar<span className="text-blue-400">Cave</span></h1>
            <div className="flex gap-8 w-1/3 justify-end items-center max-lg:hidden">
                <Link className="hidden px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600" to={'/'}>S'incrire</Link>
                <Link className="hidden px-4 py-2 font-semibold rounded-lg text-blue-500 border-2 border-blue-400" to={'/'}>Se connecter</Link>
                <Link to={"/cart"}><FaRegUserCircle className="w-7 h-7 " /></Link>
                <Link to={"/cart"}><FaRegHeart className="w-7 h-7 " /></Link>
                <Link to={"/cart"}><IoCartOutline className="w-7 h-7" /></Link>
            </div>
            <RxHamburgerMenu className="w-10 h-10 hidden max-lg:block cursor-pointer" />
        </div>
        <div className="items-center flex w-full justify-center">
            <input type="text" placeholder="Recherche" className="w-1/4 max-lg:w-full bg-blue-300 h-xs p-2 rounded-xl outline-0 text-center" />
        </div>
    </div>
  )
}
