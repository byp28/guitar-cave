import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import { MdOutlineCategory } from "react-icons/md";


export default function SideMenu() {
  return (
    <div className="w-1/5 h-screen flex flex-col justify-between border-r border-r-gray-100">
        <h1 className="flex items-center justify-center text-4xl font-semibold italic px-2 p-6">Guitar<span className="text-[#FF0022]">Cave</span></h1>
        <ul className="w-full flex flex-col">
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><GiMusicalScore />Produits</span>
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><BiCategoryAlt />Catégories</span>
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><MdOutlineCategory />Sous-catégorie</span>
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><FaUsers />Utilistateur</span>
            <span className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-gray-200 font-medium hover:bg-gray-300 flex items-center"><GrServices />Paramètre</span>
        </ul>
        <button className="w-full px-8 py-4 text-lg gap-2 cursor-pointer bg-[#FF0022] text-white font-medium  flex items-center">
            <ImExit />
            Se Deconnecter
        </button>
    </div>
  )
}
