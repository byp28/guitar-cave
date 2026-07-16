import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { fetchCategorie } from "../features/CategorieSlice";
import { fetchSubCategorie } from "../features/SousCategorieSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type {  TSousCategorie } from "../utils/guitarCaveApi";
import { useAppDispatch } from "../hook";
import type { TReducer } from "../Store";
import { fetchProduct } from "../features/ProductSlice";
import ProductCard from "../components/ProductCard";


export default function AllProductBySubCategorie({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

    const params = useParams()
    const {products, loading} = useSelector((state:TReducer)=> state.product.data)
    const {categories, loadingCategorie} = useSelector((state:TReducer)=> state.categorie.data)
    const {sousCategories, loadingSubCategorie} = useSelector((state:TReducer)=> state.sousCategorie.data)
    const Appdispatch = useAppDispatch()
    const [sousCategorie, setSousCategorie] = useState<TSousCategorie|undefined>()

    const updateState = ()=>{
        setSousCategorie(sousCategories.find((cat)=> cat.id === parseInt(params.id as string)))
    }


    useEffect(()=>{
        toggleNavBar(true)
        if(loadingCategorie || loadingSubCategorie || loading){
            Appdispatch(fetchCategorie())
            Appdispatch(fetchSubCategorie())
            Appdispatch(fetchProduct())
        }
        
        if(!loadingCategorie || !loadingSubCategorie || !loading){
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
    <div className="w-full pt-45 pb-40 flex flex-col gap-12">
        <h2 className="px-20 py-5 font-semibold text-5xl">{categories.find((cat)=> cat.designation === sousCategorie?.categorie)?.designation} - {sousCategorie?.designation}</h2>
        <div className="w-full px-20  py-10 flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-1/4 max-lg:hidden max-lg:w-full pr-5  flex flex-col gap-2">
                <span className="text-lg font-semibold">Filtrer par :</span>
                <select name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="name">Nom de A-Z</option>
                </select>
                <span className="text-lg font-semibold">Echelle de prix :</span>
                <span className="w-full flex items-center justify-between gap-2">
                    <input name="min" className="p-2  w-1/2 border-2 text-md outline-0 border-gray-400" type="number" />
                    <hr className="w-5" />
                    <input name="max" className="p-2 w-1/2 border-2 text-md outline-0 border-gray-400" type="number" />
                </span>
                <span className="text-lg font-semibold">Categorie :</span>
                <select name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="name">Nom de A-Z</option>
                </select>
                <span className="text-lg font-semibold">Sous - categorie :</span>
                <select name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="name">Nom de A-Z</option>
                </select>
            </div>
            <div className="w-3/4 max-lg:w-full flex justify-between flex-wrap gap-y-8">
                {products.filter((prod)=> prod.sousCategorie === sousCategorie?.designation).map((prod,key)=>(
                    <ProductCard key={key} product={prod} />
                ))}
            </div>
        </div>
    </div>
  )
}
