import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart, removeProductToCart, type TCart } from "../features/cart";
import { TbShoppingCartX } from "react-icons/tb";
import type { TReducer } from "../Store";

export default function Card() {
  
  const dispatch = useDispatch()
  const {cart} = useSelector((state: TReducer) => state.cart.data)
    
  const addProduct = ()=>{
    const test : TCart = {
      id : 1,
      name : "Harley Benton HWY-25BKS Progressive Series",
      quantity : 1,
      price : 999,
      img : "16871577_800.jpg"
    }
    dispatch(addProductToCart(test))
  }

  const removeProduct = (id:number)=>{
    dispatch(removeProductToCart(id))
  }
  const ProductInCart = ()=>{
    if(cart.find((c)=> c.id===1)){
      return true
    }
    return false
  }

  return (
    <div className="w-3xs flex flex-col gap-2">
        <div className="w-full h-90 flex items-center justify-center cursor-pointer relative">
            <img src="./assets/img/16871577_800.jpg" className="h-full" alt="j" />
            <div className="w-10 h-10 flex justify-center items-center bg-rose-500 absolute top-0 left-0"><MdFavoriteBorder className="w-5 h-5 text-white" /></div>
            {
              ProductInCart() === true 
              ?<div onClick={()=>removeProduct(1)} className={`w-10 h-10 flex justify-center items-center bg-red-500 absolute bottom-0 right-0`}><TbShoppingCartX className="w-5 h-5 text-white" /></div>
              :<div onClick={()=>addProduct()} className={`w-10 h-10 flex justify-center items-center bg-green-500 absolute bottom-0 right-0`}><MdAddShoppingCart className="w-5 h-5 text-white" /></div>
            }
        </div>
        <span className="text-2xs font-light">Guitar - guitar electrique</span>
        <Link to={"/product/1"} className="font-semibold text-lg hover:text-blue-300">Harley Benton HWY-25BKS Progressive Series</Link>
        <span className="text-2xl font-bold flex justify-end">999€</span>
    </div>
  )
}
