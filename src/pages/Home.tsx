import { useEffect, useState } from "react";
import Banner from "../layouts/Banner";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { fetchProduct} from "../features/ProductSlice";
import { fetchSubCategorie } from "../features/SousCategorieSlice";
import { generateUniqueIndexes } from "../utils/function";
import SubCategorieSection from "../components/SubCategorieSection";
import { useAppDispatch } from "../hook";
import Loading from "../components/Loading";
import { fetchCategorie } from "../features/CategorieSlice";
import CategorieHomeCard from "../components/CategorieHomeCard";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";


export default function Home({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

  const {products, loading} = useSelector((state:TReducer)=> state.product.data)
  const {sousCategories, loadingSubCategorie} = useSelector((state:TReducer)=> state.sousCategorie.data)
  const {categories, loadingCategorie} = useSelector((state:TReducer)=> state.categorie.data)

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
      Appdispatch(fetchCategorie())
    }
    
    if(!loadingSubCategorie){
      window.scrollTo(0, 0);
      randomCategorie()
    }
  }, [products])


  if(loading || loadingSubCategorie || loadingCategorie){
    return (
      <>
        <Loading/>
      </>
    )
  }

  return (
    <div className="w-full px-15 py-15 flex items-center flex-col gap-10 justify-center">
        <Banner/>
        {/* <Slogan/> */}
        <section className="w-full flex flex-col gap-15 py-10">
          <h3 className="text-3xl font-semibold">Découvrez nos catégories d'instruments</h3>
          <div className="w-full flex items-center justify-around gap-4 max-lg:flex-col max-lg:gap-8">
            <CategorieHomeCard Categorie={categories[0]} />
            <CategorieHomeCard Categorie={categories[1]} />
            <CategorieHomeCard Categorie={categories[6]} />
          </div>
          <span className="w-full flex justify-end max-lg:justify-center">
            <Link className="text-2xl font-semibold flex items-center" to={"/categorie"}><span>Voir plus</span><IoIosArrowRoundForward className="w-12 h-12 block max-lg:hidden" /></Link>
          </span>
        </section>
        <section className="w-full ">
        {
          randomSub.map((index, key)=>(
            <SubCategorieSection key={key} subCategorie={sousCategories[index]} products={filterProductBySubCategorie(index)} />
          ))
        }
        </section>
    </div>
  )
}
