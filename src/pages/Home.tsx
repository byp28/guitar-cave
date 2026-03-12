import { useEffect } from "react";
import Categorie from "../components/Categorie";
import Slogan from "../components/Slogan";
import Banner from "../layouts/Banner";


export default function Home({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

  useEffect(()=>{
    toggleNavBar(true)
  },[])
  return (
    <div className="w-full">
        <Banner/>
        <Slogan/>
        <Categorie categorieName="Guitare"/>
        <Categorie categorieName="Micros"/>
        <Categorie categorieName="Basses"/>
        <Categorie categorieName="Accessoires"/>
    </div>
  )
}
