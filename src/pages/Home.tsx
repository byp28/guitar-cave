import { useEffect, useState } from "react";
import Slogan from "../components/Slogan";
import Banner from "../layouts/Banner";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { fetchProduct} from "../features/ProductSlice";
import { fetchSubCategorie } from "../features/SousCategorieSlice";
import { generateUniqueIndexes } from "../utils/function";
import SubCategorieSection from "../components/SubCategorieSection";
import { useAppDispatch } from "../hook";
import Loading from "../components/Loading";


export default function Home({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

  const {products, loading} = useSelector((state:TReducer)=> state.product.data)
  const {sousCategories, loadingSubCategorie} = useSelector((state:TReducer)=> state.sousCategorie.data)

  const Appdispatch = useAppDispatch()
  const [randomSub, setRandomSub] = useState<number[]>([])

 

  const filterProductBySubCategorie = (index:number)=>{
    const newProducts = products.filter((prod)=> prod.sousCategorie === sousCategories[index].designation)
    return newProducts
  }

  const randomCategorie=()=>{
    if(sousCategories.length > 0){
      setRandomSub(generateUniqueIndexes(sousCategories.length))
    }
  }
  

  useEffect(()=>{
    toggleNavBar(true)
    if(loadingSubCategorie){
      Appdispatch(fetchProduct())
      Appdispatch(fetchSubCategorie())
    }
    
    if(!loadingSubCategorie){
      window.scrollTo(0, 0);
      randomCategorie()
    }
  }, [products])


  if(loading || loadingSubCategorie){
    return (
      <>
        <Loading/>
      </>
    )
  }

  return (
    <div className="w-full">
        <Banner/>
        <Slogan/>
        {
          randomSub.map((index, key)=>(
            <SubCategorieSection key={key} subCategorie={sousCategories[index]} products={filterProductBySubCategorie(index)} />
          ))
        }
    </div>
  )
}
