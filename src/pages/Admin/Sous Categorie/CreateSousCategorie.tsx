import { IoIosArrowDown } from "react-icons/io";
import CategorieCard from "../../../components/CategorieCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { TReducer } from "../../../Store";
import { createSousCategorie, type TCategorie, type TSousCategorie } from "../../../utils/guitarCaveApi";
import CategorieSelecteur from "../../../components/Form/CategorieSelecteur";

export default function CreateSousCategorie({changeAction} : {changeAction : (name:string)=> void}) {

  const [categorieSelected, setCategorieSelected] = useState<TCategorie | null>(null)


const handleSubmit = async (e : React.FormEvent)=>{  
  e.preventDefault(); 
  const formData = new FormData(e.currentTarget as HTMLFormElement);
      
  const newSousCategorie:TSousCategorie = {
    designation : formData.get("designation") as string,
    id_categorie : categorieSelected?.id as number,
    imgFile : formData.get("imgFile") as File,
    img : "none",
  }

  console.log(newSousCategorie)
  try{
    const categorieCreate = await createSousCategorie(newSousCategorie);
        
    if(categorieCreate.data.code === 201){
      changeAction("index")
    }else{
      //setLoading(false)
    }
  }catch(error){
    console.log(error)
  }
  }

  return (
    <div className="w-full flex flex-col gap-8">
        <span className='text-5xl font-medium'>Ajouter une sous Produit</span>
        <form onSubmit={handleSubmit}  method="post" className="w-full flex justify-between" action="post">
          <div className="flex flex-col gap-6">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Designation</span>
                  <input name="designation" type="text" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <CategorieSelecteur categorieSelected={categorieSelected} setCategorieSelected={setCategorieSelected} />
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input name="imgFile" type="file" className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
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
