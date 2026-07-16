
import { useEffect } from "react";
import CategorieCard from "../components/CategorieCard";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { useAppDispatch } from "../hook";
import Loading from "../components/Loading";
import { fetchCategorie } from "../features/CategorieSlice";


export default function AllCategorie({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

    const {categories, loadingCategorie} = useSelector((state:TReducer)=> state.categorie.data)
    const Appdispatch = useAppDispatch()
    



    useEffect(()=>{
        toggleNavBar(true)
        if(loadingCategorie){
            Appdispatch(fetchCategorie())
        }
        
        if(!loadingCategorie){
            window.scrollTo(0, 0);
      
        }
    },[categories])
    
    if(loadingCategorie){
        return (
            <>
                <Loading/>
            </>
        )
    }

  return (
    <div className="w-full  flex flex-col pt-45 min-h-screen gap-12">
        <h2 className="px-20 py-5 font-semibold text-5xl">Toute nos categories</h2>
        <div className="w-full px-20 py-10  flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-full max-lg:w-full flex justify-start gap-6 flex-wrap gap-y-8">
                {
                    categories.map((cat,key)=>(
                        <CategorieCard key={key} categorie={cat}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
