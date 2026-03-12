import { IoIosArrowDown } from "react-icons/io";
import Card from "../../../components/Card";

export default function CreateProduct({changeAction} : {changeAction : (name:string)=> void}) {

    

  return (
    <div className="w-full flex flex-col gap-8">
        <span className='text-5xl font-medium'>Ajouter un Produit</span>
        <form className="w-full flex justify-between items-center" action="post">
          <div className="flex flex-col gap-3">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Nom</span>
                  <input type="text" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Prix</span>
                  <input type="number" className="w-40 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Catégorie</span>
                  <span className="w-45  font-medium bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer px-4 py-2 ">
                    A-Z
                    <IoIosArrowDown />
                  </span>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Sous catégorie</span>
                    <span className="w-30 font-medium bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer px-4 py-2 ">
                      A-Z
                      <IoIosArrowDown />
                </span>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Description</span>
                  <textarea rows={5}  className="w-100 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Description technique</span>
                  <textarea rows={5}  className="w-100 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
          </div>
          <Card/>
        </form>
        
    </div>
  )
}
