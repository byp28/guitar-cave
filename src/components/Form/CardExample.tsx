import type { TProduct } from "../../utils/guitarCaveApi";


export default function CardExample({product} : {product: TProduct}) {
  


  return (
    <div className="w-3xs flex flex-col gap-2">
        <div className="w-full h-90 flex items-center justify-center cursor-pointer relative">
          
            <img src={`${import.meta.env.VITE_API_ADRESS}/img/product/${product.image}`} className="h-full" alt="j" />
        </div>
        <span className="text-2xs font-light">{product.categorie} - {product.sousCategorie}</span>
        <p className="font-semibold text-lg hover:text-[#FF0022]">{product.nom}</p>
        <span className="text-2xl font-bold flex justify-end">{product.price} €</span>
    </div>
  )
}
