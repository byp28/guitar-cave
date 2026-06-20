import { useEffect, useState } from "react";
import SideMenu from "../layouts/SideMenu";
import CategorieManage from "./Admin/Categorie/CategorieManage";
import ProductManage from "./Admin/Products/ProductManage";
import SousCategorieManage from "./Admin/Sous Categorie/SousCategorieManage";
import { getCategorie, getSousCategorie, type TCategorie, type TSousCategorie } from "../utils/guitarCaveApi";
import { useDispatch } from "react-redux";
import { fillCategorie } from "../features/CategorieSlice";
import { fillSousCategorie } from "../features/SousCategorieSlice";


export default function Admin({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
  const [Manage, setManage] = useState("Product")
  const dispatch = useDispatch()
  const [categories, setCategories] = useState<TCategorie[]>([])
  const [sousCategories, setSousCategories] = useState<TSousCategorie[]>([])
  
  const fillState = async ()=>{
    if(categories.length == 0)
      setCategories(
        await getCategorie()
        .then((res)=>{
          const data = res.data
          return data
        }) 
      )

  dispatch(fillCategorie(categories))

    if(sousCategories.length == 0)
      setSousCategories(
        await getSousCategorie()
        .then((res)=>{
          const data = res.data
          dispatch(fillSousCategorie(data))
          console.log(data)
          return data
        }) 
      )
    
    
    
  }

  const changePanel = (name : string)=>{
    setManage(name)
  }

  useEffect(()=>{
    if(categories.length == 0 || sousCategories.length == 0){
      fillState() 
    }
    
    toggleNavBar(false)
  },[categories])

  return (
    <div className="w-full flex h-screen overflow-hidden">
        <SideMenu change={changePanel}/>
        {Manage === "Product" && <ProductManage/>}
        {Manage === "Categorie" && <CategorieManage/>}
        {Manage === "SousCategorie" && <SousCategorieManage/>}
    </div>
  )
}
