import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { fetchCategorie } from "../features/CategorieSlice";
import { fetchSubCategorie } from "../features/SousCategorieSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type {  TProduct, TSousCategorie } from "../utils/guitarCaveApi";
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
    const [filterProduct, setFilterProduct] = useState<TProduct[]>(products)
    const filterSelect = useRef<HTMLSelectElement>(null)
    const minPrice = useRef<HTMLInputElement>(null)
    const maxPrice = useRef<HTMLInputElement>(null)


    const updateState = ()=>{
        setSousCategorie(sousCategories.find((cat)=> cat.id === parseInt(params.id as string)))
    }

    const filterAllProduct = ()=>{
        switch (filterSelect.current?.value){
            case "asc" : 
                setFilterProduct([...products].sort((a, b) => a.nom.localeCompare(b.nom)))
                break;
                
            case "desc" : 
                setFilterProduct([...products].sort((a, b) => b.nom.localeCompare(a.nom)))
                break;

            case "price-asc" : 
                setFilterProduct([...products].sort((a, b) => a.price - b.price))
                break;
                
            case "price-desc" : 
                setFilterProduct([...products].sort((a, b) => b.price - a.price))
                break;

            default : 
                setFilterProduct([...products].sort((a, b) => a.nom.localeCompare(b.nom)))
                break;
        }

        if(minPrice.current?.value !== "" && maxPrice.current?.value === ""){
            setFilterProduct((filterProduct)=> filterProduct.filter((produit) => produit.price >= parseInt(minPrice.current?.value as string)))
        }else if(minPrice.current?.value === "" && maxPrice.current?.value !== ""){
            setFilterProduct((filterProduct)=> filterProduct.filter((produit) => produit.price <= parseInt(maxPrice.current?.value as string)))
        }else if(minPrice.current?.value !== "" && maxPrice.current?.value !== ""){
            setFilterProduct((filterProduct)=> filterProduct.filter((produit) => produit.price >= parseInt(minPrice.current?.value as string) && produit.price <= parseInt(maxPrice.current?.value as string)))
        }
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
    <div className="w-full py-10 flex flex-col gap-12">
        <h2 className="px-10 py-5 max-lg:px-5 font-semibold text-5xl max-lg:text-4xl">{categories.find((cat)=> cat.designation === sousCategorie?.categorie)?.designation} - {sousCategorie?.designation}</h2>
        <div className="w-full px-10 max-lg:px-5  py-10 flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-1/5 max-lg:w-full  flex flex-col gap-2">
                <span className="text-lg font-semibold">Filtrer par :</span>
                <select ref={filterSelect} name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="asc">Ordre alphabétique(A-Z)</option>
                    <option value="desc">Ordre alphabétique(Z-A)</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                </select>
                <span className="text-lg font-semibold">Echelle de prix :</span>
                <span className="w-full flex items-center justify-between gap-2">
                    <input ref={minPrice}  name="min" className="p-2  w-1/2 border-2 text-base rounded-sm outline-0 border-gray-500" type="number" />
                    <span className="w-5 text-center">-</span>
                    <input ref={maxPrice} name="max" className="p-2 w-1/2 border-2 text-base rounded-sm outline-0 border-gray-500" type="number" />
                </span>
                <span onClick={()=>filterAllProduct()} className="w-full flex text-lg my-10 items-center justify-center py-2 rounded-full font-semibold text-white bg-black cursor-pointer hover:bg-white hover:text-black">Filtre</span>
            </div>
            <div className="w-4/5 max-lg:w-full flex justify-between max-lg:justify-center flex-wrap gap-y-8">
                {filterProduct.filter((prod)=> prod.sousCategorie === sousCategorie?.designation).map((prod,key)=>(
                    <ProductCard key={key} product={prod} />
                ))}
            </div>
        </div>
    </div>
  )
}
