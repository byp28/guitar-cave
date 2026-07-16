import { Link } from "react-router-dom";
import type { TCategorie } from "../utils/guitarCaveApi";


export default function CategorieCard({categorie} : {categorie : TCategorie}) {
  return (
    <Link to={`/categorie/${categorie.id}`} className="w-3xs border-2 border-gray-100 rounded-lg flex p-4 items-center justify-center flex-col gap-4 cursor-pointer hover:border-4">
        <div className="w-full flex items-center justify-center h-60">
          <img className="h-full" src={`${import.meta.env.VITE_API_ADRESS}/img/categorie/${categorie.img}`} alt={categorie.img} />
        </div>
        <span className="text-lg text-center font-semibold">{categorie.designation}</span>
    </Link>
  )
}
