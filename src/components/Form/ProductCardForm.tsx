import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import type { TProduct } from "../../utils/guitarCaveApi";



export default function ProductCardForm({product} : {product: TProduct}) {


  return (
    <div className="w-3xs flex flex-col gap-2">
        <div className="w-full flex items-center justify-center cursor-pointer relative">
            <img src={product.image} className="h-full" alt={product.nom} />
            <div className="w-10 h-10 flex justify-center items-center bg-rose-500 absolute top-0 left-0"><MdFavoriteBorder className="w-5 h-5 text-white" /></div>
            
            <div  className={`w-10 h-10 flex justify-center items-center bg-green-500 absolute bottom-0 right-0`}><MdAddShoppingCart className="w-5 h-5 text-white" /></div>
            
        </div>
        <span className="text-2xs font-light">{product.categorie} - {product.sousCategorie}</span>
        <Link to={`/product/${product.id}`} className="font-semibold text-lg hover:text-[#FF0022]">{product.nom}</Link>
        <span className="text-2xl font-bold flex justify-end">{product.price}€</span>
    </div>
  )
}
