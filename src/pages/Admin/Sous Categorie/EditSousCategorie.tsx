import { useState } from "react";
import {  updateSousCategorie, type TCategorie, type TSousCategorie } from "../../../utils/guitarCaveApi";
import CategorieExemple from "../../../components/CategorieExemple";
import CategorieSelecteur from "../../../components/Form/CategorieSelecteur";
import { useSelector } from "react-redux";
import type { TReducer } from "../../../Store";
import Loading from "../../../components/Loading";
import { fetchSubCategorie } from "../../../features/SousCategorieSlice";
import { useAppDispatch } from "../../../hook";

export default function EditSousCategorie({changeAction, id, sousCategorieObject} : {changeAction : (name:string)=> void, id:number, sousCategorieObject : TSousCategorie}) {
  
  const {categories} = useSelector((state:TReducer)=> state.categorie.data)
  const [categorieSelected, setCategorieSelected] = useState<TCategorie | null>(
    categories[categories.findIndex((element)=> element.designation === sousCategorieObject.categorie)] ?? null
  )
  const [loading , setLoading] = useState<boolean>(false);
  const Appdispatch = useAppDispatch()

  const handleSubmit = async (e : React.FormEvent)=>{  
      e.preventDefault();
      setLoading(true);  
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      const editSousCategorie:TSousCategorie = {
        designation : formData.get("designation") as string,
        id_categorie : categorieSelected?.id as number,
        imgFile : formData.get("imgFile") as File,
        img : sousCategorieObject.img,
      }

      console.log(editSousCategorie)
      try{
        const sousCategorieEdit = await updateSousCategorie(editSousCategorie, id);
        
        if(sousCategorieEdit.data.code === 201){
          Appdispatch(fetchSubCategorie())
          changeAction("index")
        }else{
          setLoading(false)
        }
      }catch(error){
        console.log(error)
      }
   }

  if(loading){
    return <Loading/>
  }

  return (
    <div className="w-full flex flex-col gap-8 max-lg:gap-10">
        <span className='text-5xl max-lg:text-4xl font-medium'>Modifier</span>
        <form onSubmit={handleSubmit}  method="post" className="w-full flex justify-between max-lg:items-center max-lg:flex-col-reverse max-lg:gap-10 max-lg:py-12" action="post">
          <div className="flex max-lg:w-full flex-col gap-6">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Designation</span>
                  <input name="designation" type="text" defaultValue={sousCategorieObject.designation} className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <CategorieSelecteur categorieSelected={categorieSelected} setCategorieSelected={setCategorieSelected} />
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" name="imgFile" className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <button className="w-30 text-lg py-3 cursor-pointer bg-[#B91372] rounded-lg hover:text-[#B91372] hover:bg-white hover:border-2 hover:border-[#B91372] text-white font-medium flex items-center justify-center">
                Valider
              </button>
          </div>
          <CategorieExemple img={sousCategorieObject.img} name={sousCategorieObject.designation}/>
        </form>
        
    </div>
  )
}
