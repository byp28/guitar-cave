import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import type { TReducer } from "../../Store";
import { useState } from "react";
import type { TCategorie } from "../../utils/guitarCaveApi";


export default function CategorieSelecteur({categorieSelected, setCategorieSelected} : {categorieSelected : TCategorie | null, setCategorieSelected : (newSousCat:TCategorie)=>void}) {

    const {categories} = useSelector((state:TReducer)=> state.categorie.data)
    const [toggleCategorieSelect, setToggleCategorieSelect] = useState(false)

    const selectCategorie = (cat : TCategorie)=>{
        setCategorieSelected(cat)
        setToggleCategorieSelect(false)
    }
    
    return (
        <span className="flex flex-col gap-2">
            <span className="font-medium text-lg">Categorie</span>
            <div className="w-3xs z-11 rounded-md border-2 font-semibold border-[#5d5d5d] h-12 p-4 flex justify-between items-center cursor-pointer relative">
            <span>{categorieSelected ? categorieSelected.designation : "Sélectionnez une Catégorie" }</span>
            <IoIosArrowDown className={toggleCategorieSelect ? "rotate-180 cursor-pointer" : "rotate-0 cursor-pointer"}  onClick={()=> setToggleCategorieSelect(!toggleCategorieSelect)}/>
            {
                toggleCategorieSelect &&
                <div className="w-3xs absolute flex flex-col z-9 -left-0.5 top-10 border-2 border-[#5d5d5d] border-t-0 rounded-t-none bg-white rounded-md ">
                {
                    categories.map((cat,key)=>(
                    <span className={`p-4 w-full hover:bg-gray-100 ${categories.length -1 === key && "rounded-b-md"}`} key={key} onClick={()=> selectCategorie(cat)} >{cat.designation}</span>
                    ))
                }
                </div>
            }
            </div>
        </span>
    )
}
