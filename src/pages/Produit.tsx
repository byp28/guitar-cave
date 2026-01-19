import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import Categorie from "../components/Categorie";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { addProductToCart, removeProductToCart, updateProductToCart, type TCart } from "../features/cart";
import { useDispatch, useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { TbShoppingCartX } from "react-icons/tb";


export default function Produit() {

    const [stars, setStars] = useState(0)
    const [quantity, SetQuantity] = useState(1)
    const {cart} = useSelector((state: TReducer) => state.cart.data)


    const ProductInCart = ()=>{
        if(cart.find((c)=> c.id===2)){
            return true
        }

        return false
    }

    const AddQuantity = ()=>{
        if(ProductInCart()){
            let prod = cart.find((c)=> c.id===2)
            SetQuantity(prod?.quantity as number)
            SetQuantity(quantity+1)
            dispatch(updateProductToCart({id : 2, value : quantity + 1}))
        }else{
            SetQuantity(quantity+1)
        }
    }
    const removeQuantity = ()=>{
        if(quantity>1){
            if(ProductInCart()){
                let prod = cart.find((c)=> c.id===2)
                SetQuantity(prod?.quantity as number)
                SetQuantity(quantity-1)
                dispatch(updateProductToCart({id : 2, value : quantity - 1}))
            }else{
                SetQuantity(quantity-1)
            }
        }
        
    }

    const dispatch = useDispatch()
    const addProduct = ()=>{
        const test : TCart = {
            id : 2,
            name : "GG",
            quantity : quantity,
            price : 99,
            img : ""
        }
        dispatch(addProductToCart(test))
    }

    useEffect(()=>{
        if(ProductInCart()){
            let prod = cart.find((c)=> c.id===2)
            SetQuantity(prod?.quantity as number)
            console.log(prod)
        }
    },[])
  return (
    <div className="w-full px-20 py-8 flex flex-col gap-15">
        <div className="w-full flex max-lg:flex-col max-lg:justify-center max-lg:items-center justify-around max-lg:gap-4">
            <div className="w-1/2 max-lg:w-full max-lg:justify-center max-lg:items-center max-lg:flex-col flex gap-3">
                <div className="w-1/8 max-lg:w-full flex max-lg:flex-row flex-col gap-4 max-lg:items-center max-lg:justify-center">
                    <div className="w-15 h-25  bg-gray-200"></div>
                    <div className="w-15 h-25  bg-gray-200"></div>
                    <div className="w-15 h-25  bg-gray-200"></div>
                    <div className="w-15 h-25  bg-gray-200"></div>
                </div>
                <div className="w-100 bg-gray-200 h-140">
                </div>
            </div>
            <div className="w-1/2 max-lg:w-full flex flex-col gap-5">
                <span className="text-sm font-light">Guitar - guitar electrique</span>
                <h3 className="font-semibold text-4xl ">Harley Benton HWY-25BKS Progressive Series</h3>
                <h3 className="font-semibold text-5xl  w-full flex items-end justify-end">999 €</h3>
                <div className="w-full flex justify-end">
                    <div className="w-14 h-14 rounded-full flex justify-center items-center cursor-pointer bg-gray-200">
                        <MdFavoriteBorder className="w-8 h-8 text-rose-500" />
                    </div>
                </div>
                <div className="w-full flex gap-5 items-center">
                    <div className=" bg-gray-200 flex items-center justify-between gap-2 px-2 py-3 rounded-xl">
                        <IoIosArrowBack onClick={()=> removeQuantity()} className="cursor-pointer hover:text-blue-400" />
                        {quantity}
                        <IoIosArrowForward onClick={()=> AddQuantity()} className="cursor-pointer hover:text-blue-400"/>
                    </div>
                    {
                        ProductInCart() 
                        ?<div onClick={()=> dispatch(removeProductToCart(2))} className="w-full cursor-pointer font-semibold bg-red-500 text-white flex items-center justify-center gap-2 px-2 py-3 rounded-xl">
                            Retirer du panier
                            <TbShoppingCartX/>
                        </div>
                        :<div onClick={()=> addProduct()} className="w-full cursor-pointer font-semibold bg-gray-200 flex items-center justify-center gap-2 px-2 py-3 rounded-xl">
                            Ajouter au panier
                            <MdAddShoppingCart/>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-5 text-justify font-medium">
            <h4 className="text-4xl font-semibold">Détails</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vel ullam iusto modi, facilis animi veniam perspiciatis ipsam voluptates tempora sapiente, tenetur cumque illum fuga nihil, consequatur impedit et? Odio.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus veritatis fugiat adipisci. Similique, blanditiis culpa. Repudiandae sit dolorem id iure enim, rem sint dignissimos! Temporibus doloremque cum non nam accusamus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita, nulla laborum fuga possimus odit ex accusantium libero laudantium nam, distinctio aut iusto ipsum repellat commodi aspernatur repudiandae quia culpa?</p>
        </div>
        <Categorie categorieName="Autres produits"/>
        <section className="flex flex-col gap-8 text-justify font-medium">
            <h4 className="text-4xl font-semibold">Laissez une évalution</h4>
            <div className="w-full flex items-center justify-center gap-4">
                <span onMouseOver={()=>setStars(1)} onMouseOut={()=>setStars(0)} className="relative max-lg:w-10 max-lg:h-10 w-20 h-20 cursor-pointer">
                    <ImStarEmpty className={stars>=1 ? "hidden" : "absolute z-2 top-0 left-0 w-full h-full hover:z-1 bg-white"} />
                    <ImStarFull className="absolute z-1 top-0 left-0 w-full h-full hover:z-2" />
                </span>
                <span onMouseOver={()=>setStars(2)} onMouseOut={()=>setStars(0)} className="relative max-lg:w-10 max-lg:h-10 w-20 h-20 cursor-pointer">
                    <ImStarEmpty className={stars>=2 ? "hidden" : "absolute z-2 top-0 left-0 w-full h-full hover:z-1 bg-white"} />
                    <ImStarFull className="absolute z-1 top-0 left-0 w-full h-full hover:z-2" />
                </span>
                <span onMouseOver={()=>setStars(3)} onMouseOut={()=>setStars(0)} className="relative max-lg:w-10 max-lg:h-10 w-20 h-20 cursor-pointer">
                    <ImStarEmpty className={stars>=3 ? "hidden" : "absolute z-2 top-0 left-0 w-full h-full hover:z-1 bg-white"} />
                    <ImStarFull className="absolute z-1 top-0 left-0 w-full h-full hover:z-2" />
                </span>
                <span onMouseOver={()=>setStars(4)} onMouseOut={()=>setStars(0)} className="relative max-lg:w-10 max-lg:h-10 w-20 h-20 cursor-pointer">
                    <ImStarEmpty className={stars>=4 ? "hidden" : "absolute z-2 top-0 left-0 w-full h-full hover:z-1 bg-white"} />
                    <ImStarFull className="absolute z-1 top-0 left-0 w-full h-full hover:z-2" />
                </span>
                <span onMouseOver={()=>setStars(5)} onMouseOut={()=>setStars(0)} className="relative max-lg:w-10 max-lg:h-10 w-20 h-20 cursor-pointer">
                    <ImStarEmpty className={stars>=5 ? "hidden" : "absolute z-2 top-0 left-0 w-full h-full hover:z-1 bg-white"} />
                    <ImStarFull className="absolute z-1 top-0 left-0 w-full h-full hover:z-2" />
                </span>    
            </div>
            <div className="w-full flex items-center justify-center text-4xl font-bold">{stars} sur 5</div>
            <h4 className="text-4xl font-semibold">Laissez un commentaire</h4>
            <textarea name="comment" id="comment" className="w-full h-40 border border-gray-600 rounded-lg p-2 outline-0" placeholder="Laissez un commentaire"></textarea>
            <button className="bg-black text-white flex justify-center items-center w-30 h-10 rounded-md cursor-pointer hover:border hover:border-black hover:text-black hover:bg-white">Poster</button>
            <h4 className="text-4xl font-semibold">Commentaire</h4>
            <div className="w-full flex flex-col gap-4 bg-gray-100">
                <Comment/>
                <Comment/>
            </div>
        </section>
        <Categorie categorieName="Autres produits"/>
    </div>
  )
}
