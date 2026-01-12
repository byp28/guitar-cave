import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Card from "./Card";


export default function Categorie({categorieName} : {categorieName : string}) {
  return (
    <div className="w-full px-10 py-8 flex flex-col gap-3">
        <h3 className="text-3xl font-semibold">Nos {categorieName}</h3>
        <div className="flex justify-around py-6 flex-wrap gap-y-12">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <span className="w-full flex justify-end">
            <Link className="text-2xl font-semibold flex items-center" to={"/"}><span>Voir plus</span>  <IoIosArrowRoundForward className="w-12 h-12 block" /></Link>
        </span>
    </div>
  )
}
