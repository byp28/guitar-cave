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
  const [randomCat, setRandomCat] = useState<number[]>([])

 

  const filterProductBySubCategorie = (index:number)=>{
    const newProducts = products.filter((prod)=> prod.sousCategorie === sousCategories[index].designation)
    return newProducts
  }

  const randomSubCategorie=()=>{
    if(sousCategories.length > 0){
      setRandomSub(generateUniqueIndexes(sousCategories.length, 5))
    }

  }

  const randomCategorie=()=>{
    if(categories.length > 0){
      setRandomCat(generateUniqueIndexes(categories.length, 3))
      console.log(randomCat)
    }
  }
  

  useEffect(()=>{
    toggleNavBar(true)
    if(loadingSubCategorie || loadingCategorie){
      Appdispatch(fetchProduct())
      Appdispatch(fetchSubCategorie())
      Appdispatch(fetchCategorie())
    }
    
    if(!loadingSubCategorie && !loadingCategorie){
      window.scrollTo(0, 0);
      randomCategorie()
      randomSubCategorie()
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
    <div className="w-full px-15 py-15 max-lg:px-5 flex items-center flex-col gap-10 justify-center">
        <Banner/>
        {/* <Slogan/> */}
        <section className="w-full flex flex-col gap-15 py-10">
          <h3 className="text-3xl max-lg:text-2xl font-semibold">Découvrez nos catégories d'instruments</h3>
          <div className="w-full flex items-center justify-around gap-4 max-lg:flex-col max-lg:gap-8">
            {
              randomCat.map((index,key)=>(
                  <CategorieHomeCard key={key} Categorie={categories[index]} />
              ))
            }
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
