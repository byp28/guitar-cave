import { Link } from "react-router-dom";
import type { TCategorie } from "../utils/guitarCaveApi";


export default function CategorieHomeCard({Categorie} : {Categorie : TCategorie}) {
  return (
    <Link to={`/categorie/${Categorie.id}`} className="w-md max-lg:w-full overflow-hidden border-r-8 border-r-blue-500 shadow-lg rounded-lg  flex p-4 items-center gap-15 cursor-pointer">
        <div className="flex items-center justify-center h-18">
          <img className="h-full scale-200" src={`${import.meta.env.VITE_API_ADRESS}/img/categorie/${Categorie.img}`} alt={Categorie.img} />
        </div>
        <span className="text-lg text-center font-semibold">{Categorie.designation}</span>
    </Link>
  )
}
