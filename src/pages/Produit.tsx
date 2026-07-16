import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { addProductToCart, removeProductToCart, updateProductToCart, type TCart } from "../features/cart";
import { useDispatch, useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { TbShoppingCartX } from "react-icons/tb";
import { useParams } from "react-router-dom";
import type { TProduct, TSousCategorie } from "../utils/guitarCaveApi";
import SubCategorieSection from "../components/SubCategorieSection";
import Loading from "../components/Loading";
import { useAppDispatch } from "../hook";
import { fetchProduct } from "../features/ProductSlice";
import { fetchSubCategorie } from "../features/SousCategorieSlice";
import Page404 from "./Page404";
import type { TDescription, TTechDescription } from "./Admin/Products/CreateProduct";


export default function Produit({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
    const params = useParams()

    const [stars, setStars] = useState(0)
    const [quantity, SetQuantity] = useState(1)
    const {products, loading} = useSelector((state:TReducer)=> state.product.data)
    const {sousCategories, loadingSubCategorie} = useSelector((state:TReducer)=> state.sousCategorie.data)
    
    const [product, setProduct] = useState<TProduct | null>(null)
    const [productSubCat, setProductSubCat] = useState<TSousCategorie | null>(null)
    const {cart} = useSelector((state: TReducer) => state.cart.data)
    const dispatch = useDispatch()
    const AppDispatch = useAppDispatch()

    const filterProductBySubCategorie = ()=>{
        console.log(productSubCat?.designation,"cal")
        const newProducts = products.filter((prod)=> prod.sousCategorie === productSubCat?.designation)
        console.log(newProducts,'n')
        return newProducts
    }

    const fillDescription = ()=>{
        if(product){
            let newTab = product.description.split(";")
            const newDescription : TDescription[] = []
                newTab.map((desc,key)=>{
                    newDescription.push({
                        id : key,
                        value : desc
                    })
            })
            newDescription.pop()
            return newDescription
        }
        return []    
    }
    
    const fillTechDescription = ()=>{
        if(product){
            const newTab = product.description_technique.split(";")
            newTab.pop()
            const newTechDescription : TTechDescription[] = []
                newTab.map((desc,key)=>{
                    let valueDesc  = desc.split(":")
                    newTechDescription.push({
                        id : key,
                        key : valueDesc[0],
                        value : valueDesc[1]
                    })
                })
            return newTechDescription
        }
    
        return []
    }

    const ProductInCart = ()=>{
        if(cart.find((c)=> c.id===product?.id)){
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


    const addProduct = ()=>{
        const test : TCart = {
            id : product?.id as number,
            name : product?.nom as string,
            quantity : quantity,
            price : product?.price as number,
            img : product?.image as string
        }
        dispatch(addProductToCart(test))
    }

    const updateState = ()=>{
        const rproduct = products.find((prod)=> prod.id === parseInt(params.id as string))
        const rsub = sousCategories.find((sub)=> sub.designation === product?.sousCategorie)
        setProduct(rproduct as TProduct)
        setProductSubCat(rsub as TSousCategorie)
        console.log(productSubCat,'sf')
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
        toggleNavBar(true)
        if(loadingSubCategorie || loading){
            AppDispatch(fetchProduct())
            AppDispatch(fetchSubCategorie())
        }
        console.log(loading)
        if(!loadingSubCategorie || !loading){
            updateState()
        }
        if(ProductInCart()){
            let prod = cart.find((c)=> c.id===2)
            SetQuantity(prod?.quantity as number)
        }
    },[products,params])

    if(loading || loadingSubCategorie){
        return (
          <>
            <Loading/>
          </>
        )
    }else{
        if(product==null){
            return (
            <>
                <Page404/>
            </>
            )
        }
    }

  return (
    <div className="w-full px-25  py-8 pt-45 flex flex-col gap-15">
        <div className="w-full flex max-lg:flex-col max-lg:justify-center max-lg:items-center justify-around max-lg:gap-4">
            <div className="w-1/2 max-lg:w-full max-lg:justify-center max-lg:items-center max-lg:flex-col flex gap-3">
                <div className="w-1/8 max-lg:w-full flex max-lg:flex-row flex-col gap-4 max-lg:items-center max-lg:justify-center">
                    <div className="w-15 h-25  bg-gray-200"></div>
                    <div className="w-15 h-25  bg-gray-200"></div>
                    <div className="w-15 h-25  bg-gray-200"></div>
                    <div className="w-15 h-25  bg-gray-200"></div>
                </div>
                <div className="w-100 h-140">
                    <img src={`${import.meta.env.VITE_API_ADRESS}/img/product/${product?.image}`} className="h-full" alt={product?.nom} />
                </div>
            </div>
            <div className="w-1/2 max-lg:w-full flex flex-col gap-5">
                <span className="text-sm font-light">{product?.categorie} - {product?.sousCategorie}</span>
                <h3 className="font-semibold text-4xl ">{product?.nom}</h3>
                <h3 className="font-semibold text-5xl  w-full flex items-end justify-end">{product?.price} €</h3>
                <div className="w-full flex justify-end">
                    <div className="w-14 h-14 rounded-full flex justify-center items-center cursor-pointer bg-gray-200">
                        <MdFavoriteBorder className="w-8 h-8 text-rose-500" />
                    </div>
                </div>
                <div className="w-full flex gap-5 items-center">
                    <div className=" bg-[#FF0022] flex items-center justify-between gap-2 px-2 py-3 rounded-xl">
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
            <ul className="list-disc flex flex-col gap-2 pr-20">
                {
                    fillDescription().map((desc,key)=>(
                        <li key={key}>{desc.value}</li>
                    ))
                }
            </ul>
            <div className="flex h-80 flex-wrap flex-col w-full">
                <div className="py-4 flex justify-between items-center border-y-2 border-y-black w-100">
                    <span className="font-bold">Micro</span>
                    <span>HHS</span>
                </div>
                {
                    fillTechDescription().map((desc,key)=>(
                        <div key={key} className="py-4 flex justify-between items-center border-t-2 border-t-black w-100">
                            <span className="font-bold">{desc.key}</span>
                            <span>{desc.value}</span>
                        </div>
                    ))
                }
            </div>
        </div>
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
        {
            productSubCat && <SubCategorieSection products={filterProductBySubCategorie()} subCategorie={productSubCat as TSousCategorie}/>
        }
    </div>
  )
}
