import { IoIosArrowDown } from "react-icons/io";
import Card from "../../../components/Card";
import CategorieCard from "../../../components/CategorieCard";

export default function CreateSousCategorie() {
  return (
    <div className="w-full flex flex-col gap-8">
        <span className='text-5xl font-medium'>Ajouter un Produit</span>
        <form className="w-full flex justify-between" action="post">
          <div className="flex flex-col gap-6">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Designation</span>
                  <input type="text" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <button className="w-30 text-lg py-3 cursor-pointer bg-[#B91372] rounded-lg hover:text-[#B91372] hover:bg-white hover:border-2 hover:border-[#B91372] text-white font-medium flex items-center justify-center">
                Valider
              </button>
          </div>
          <CategorieCard/>
        </form>
        
    </div>
  )
}
