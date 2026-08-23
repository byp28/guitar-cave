import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import type { TProduct, TSousCategorie } from "../utils/guitarCaveApi";
import ProductCard from "./ProductCard";


export default function SubCategorieSection({subCategorie, products} : {subCategorie : TSousCategorie, products : TProduct[]}) {
  return (
    <div className="w-full py-8 flex flex-col gap-12">
        <h3 className="text-3xl font-semibold">Nos {subCategorie.designation}</h3>
        <div className="flex justify-around py-6 flex-wrap gap-y-12">
            {
              products.map((prod,key)=>(
                <ProductCard key={key} product={prod} />
              ))
            }
        </div>
        <span className="w-full flex justify-end max-lg:justify-center">
            <Link className="text-2xl font-semibold flex items-center" to={`/categorie/sous-categorie/${subCategorie.id}`}><span>Voir plus</span>  <IoIosArrowRoundForward className="w-12 h-12 block max-lg:hidden" /></Link>
        </span>
    </div>
  )
}
