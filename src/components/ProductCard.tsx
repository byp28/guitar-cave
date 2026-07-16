import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart, removeProductToCart, type TCart } from "../features/cart";
import { TbShoppingCartX } from "react-icons/tb";
import type { TReducer } from "../Store";
import type { TProduct } from "../utils/guitarCaveApi";

export default function ProductCard({product} : {product: TProduct}) {
  
  const dispatch = useDispatch()
  const {cart} = useSelector((state: TReducer) => state.cart.data)
    
  const addProduct = ()=>{
    const test : TCart = {
      id : product.id as number,
      name : product.nom,
      quantity : 1,
      price : product.price,
      img : product.image
    }
    dispatch(addProductToCart(test))
  }

  const removeProduct = (id:number)=>{
    dispatch(removeProductToCart(id))
  }
  
  const ProductInCart = ()=>{
    if(cart.find((c)=> c.id===product.id)){
      return true
    }
    return false
  }

  return (
    <div className="w-3xs flex flex-col gap-2">
        <div className="w-full flex items-center justify-center cursor-pointer relative">
            <img src={`${import.meta.env.VITE_API_ADRESS}/img/product/${product.image}`} className="h-full" alt={product.nom} />
            <div className="w-10 h-10 flex justify-center items-center bg-rose-500 absolute top-0 left-0"><MdFavoriteBorder className="w-5 h-5 text-white" /></div>
            {
              ProductInCart() === true 
              ?<div onClick={()=>removeProduct(1)} className={`w-10 h-10 flex justify-center items-center bg-red-500 absolute bottom-0 right-0`}><TbShoppingCartX className="w-5 h-5 text-white" /></div>
              :<div onClick={()=>addProduct()} className={`w-10 h-10 flex justify-center items-center bg-green-500 absolute bottom-0 right-0`}><MdAddShoppingCart className="w-5 h-5 text-white" /></div>
            }
        </div>
        <span className="text-2xs font-light">{product.categorie} - {product.sousCategorie}</span>
        <Link to={`/product/${product.id}`} className="font-semibold text-lg hover:text-[#FF0022]">{product.nom}</Link>
        <span className="text-2xl font-bold flex justify-end">{product.price}€</span>
    </div>
  )
}
