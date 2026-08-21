
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { useAppDispatch } from "../hook";
import Loading from "../components/Loading";
import { fetchCategorie } from "../features/CategorieSlice";
import { fetchSubCategorie } from "../features/SousCategorieSlice";
import { useParams } from "react-router-dom";
import SubCategorieCard from "../components/SubCategorieCard";
import type { TCategorie } from "../utils/guitarCaveApi";


export default function AllSubCategorie({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

    const params = useParams()
    const {categories, loadingCategorie} = useSelector((state:TReducer)=> state.categorie.data)
    const {sousCategories, loadingSubCategorie} = useSelector((state:TReducer)=> state.sousCategorie.data)
    const Appdispatch = useAppDispatch()
    const [categorie, SetCategorie] = useState<TCategorie|undefined>()

    const updateState = ()=>{
        SetCategorie(categories.find((cat)=> cat.id === parseInt(params.id as string)))
        console.log(categorie)
    }


    useEffect(()=>{
        toggleNavBar(true)
        if(loadingCategorie || loadingSubCategorie){
            Appdispatch(fetchCategorie())
            Appdispatch(fetchSubCategorie())
        }
        
        if(!loadingCategorie || !loadingSubCategorie){
            window.scrollTo(0, 0);
            updateState()
        }
    },[sousCategories])
    
    if(loadingCategorie || loadingSubCategorie){
        return (
            <>
                <Loading/>
            </>
        )
    }

  return (
    <div className="w-full  flex flex-col py-10 min-h-screen gap-12">
        <h2 className="px-10 max-lg:px-5 py-5 font-semibold text-5xl max-lg:text-4xl">{categorie?.designation}</h2>
        <div className="w-full px-10 max-lg:px-5 py-10  flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-full max-lg:w-full flex justify-start max-lg:justify-center gap-6 flex-wrap gap-y-8">
                {
                    sousCategories.filter((subCat)=> subCat.categorie === categorie?.designation).map((subCat,key)=>(
                        <SubCategorieCard key={key} subCategorie={subCat}/>
                    ))
                }
                {
                    sousCategories.filter((subCat)=> subCat.categorie === categorie?.designation).length === 0 && 
                    <span className="w-full flex items-center justify-center text-3xl">Aucune sous-catégorie pour l'instant</span>
                }
            </div>
        </div>
    </div>
  )
}
