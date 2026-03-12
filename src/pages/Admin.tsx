import { useEffect, useState } from "react";
import SideMenu from "../layouts/SideMenu";
import CategorieManage from "./Admin/Categorie/CategorieManage";
import ProductManage from "./Admin/Products/ProductManage";
import SousCategorieManage from "./Admin/Sous Categorie/SousCategorieManage";


export default function Admin({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
  const [Manage, setManage] = useState("Product")

  const changePanel = (name : string)=>{
    setManage(name)
  }

  useEffect(()=>{
      toggleNavBar(false)
    },[])
  return (
    <div className="w-full flex h-screen overflow-hidden">
        <SideMenu change={changePanel}/>
        {Manage === "Product" && <ProductManage/>}
        {Manage === "Categorie" && <CategorieManage/>}
        {Manage === "SousCategorie" && <SousCategorieManage/>}
    </div>
  )
}
