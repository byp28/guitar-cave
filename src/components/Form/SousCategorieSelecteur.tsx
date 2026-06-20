import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import type { TReducer } from "../../Store";
import { useEffect, useState } from "react";
import type {  TSousCategorie } from "../../utils/guitarCaveApi";


export default function SousCategorieSelecteur({sousCategorieSelected, setSousCategorieSelected, filter} : {sousCategorieSelected : TSousCategorie | null, setSousCategorieSelected : (newSousCat:TSousCategorie | null)=>void, filter : string | null}) {

    const {sousCategories} = useSelector((state:TReducer)=> state.sousCategorie.data)
    const [toggleSousCategorieSelect, setToggleSousCategorieSelect] = useState(false)

   
    const filterSubCategories = ():Array<TSousCategorie>=>{
        if(!filter){
            return sousCategories
        }else{
            console.log(sousCategories.filter((cat)=> cat.categorie === filter))
            return sousCategories.filter((cat)=> cat.categorie === filter)
        }
    }

    const [sousCategoriesFiltered, setSousCategoriesFiltered] =  useState<TSousCategorie[]>(filterSubCategories()) 

    const selectCategorie = (cat : TSousCategorie)=>{
        setSousCategorieSelected(cat)
        setToggleSousCategorieSelect(false)
    }
    
    useEffect(()=>{
        setSousCategorieSelected(null)
        setSousCategoriesFiltered(filterSubCategories())
    },[filter])
    
    return (
        <span className="flex flex-col gap-2">
            <span className="font-medium text-lg">Sous-Categorie</span>
            <div className="w-3xs z-10 rounded-md border-2 font-semibold border-[#5d5d5d] h-12 p-4 flex justify-between items-center cursor-pointer relative">
            <span>{sousCategorieSelected ? sousCategorieSelected.designation : "Sélectionnez une sous-catégorie" }</span>
            <IoIosArrowDown className={toggleSousCategorieSelect ? "rotate-180 cursor-pointer" : "rotate-0 cursor-pointer"}  onClick={filter ? ()=> setToggleSousCategorieSelect(!toggleSousCategorieSelect) : ()=>(null) }/>
            {
                toggleSousCategorieSelect &&
                <div className="w-3xs absolute flex flex-col z-2 -left-0.5 top-10 border-2 border-[#5d5d5d] border-t-0 rounded-t-none bg-white rounded-md ">
                {
                    sousCategoriesFiltered.map((cat,key)=>(
                    <span className={`p-4 w-full hover:bg-gray-100 ${sousCategories.length -1 === key && "rounded-b-md"}`} key={key} onClick={()=> selectCategorie(cat)} >{cat.designation}</span>
                    ))
                }
                {
                    sousCategoriesFiltered.length === 0 && <span className={`p-4 w-full hover:bg-gray-100 rounded-b-md"`}>Aucune sous-categorie</span>
                }
                </div>
            }
            </div>
        </span>
    )
}
