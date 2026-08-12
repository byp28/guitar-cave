import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
      useEffect(()=>{
        toggleNavBar(true)
      },[])
  return (
    <div className="w-full min-h-screen  flex items-center justify-center flex-col gap-4">
        <span className="text-3xl text-gray-500">404</span>
        <p className="">La page que vous recherchez n'existe pas</p>
        <Link to="/" className="text-xl font-semibold hover:text-blue-400 cursor-pointer">Retour à l'accueil</Link>
    </div>
  )
}
