import {  useDispatch, useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCommandeCard from "../components/ProductCommandeCard";
import { addProductInCommande, createCommande, getAddressByUserId, type TAddress, type TCommandePayloads, type TCommandeProductPayloads } from "../utils/guitarCaveApi";
import { cleanProductToCart } from "../features/cart";
import Loading from "../components/Loading";

export default function Commande({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
    
    const [total, setTotal] = useState(0)
    const {cart} = useSelector((state: TReducer) => state.cart.data)
    const {user} = useSelector((state: TReducer) => state.user.data)
    const [address, setAdress] = useState<TAddress|null>(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const calculatTotal = ()=>{
        let t = 0
        cart.map((p)=>{
            t += p.quantity * p.price
        })
        return t
    }

    const createThisCommande = async ()=>{
        const commandePayloads : TCommandePayloads = {user_id : user?.id as number}
        try{
            const newCommande = await createCommande(commandePayloads)

            if(newCommande.status === 201){
                addMyProductInCommande(newCommande.data.id_cmd)
                dispatch(cleanProductToCart(""))
                navigation('/')
            }

        }catch(e){
            console.log(e)
        }
    }

    const fetchAdress = async (id:number)=>{
        const fAddress = await getAddressByUserId(id)
    
        if(fAddress.status === 200){
            setAdress(fAddress.data as TAddress)
            setLoading(false)
        }
    }

    const addMyProductInCommande = async (id : number)=>{

        cart.map(async (prod)=>{
            const productPayloads : TCommandeProductPayloads = {
                product_id : prod.id,
                qte : prod.quantity
            }
            await addProductInCommande(productPayloads,id)
        })
    }


    useEffect(()=>{
        toggleNavBar(true)
        setTotal(calculatTotal())
        if(user?.addressId){
            fetchAdress(user.addressId)
        }
    },[])


    if(loading){
        return <Loading/>
    }

  return (
    <div className="w-full px-10 max-lg:px-5 py-15 min-h-screen flex flex-col gap-12">
        <h4 className="text-6xl max-lg:text-5xl font-semibold">Valider la commande</h4>
        <div className="w-full flex flex-col gap-4 py-6">
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <div className="w-140 max-lg:w-full flex flex-col gap-4">
                    <span className="text-4xl max-lg:text-3xl py-5 font-semibold text-center w-full border-b-3 border-b-gray-200">Détail de la commande</span>
                    {
                        cart.length === 0 
                        ? <span className="text-gray-300 text-5xl font-semibold w-full text-center">Panier vide</span>
                        : cart.map((c,key)=>(
                            <ProductCommandeCard key={key} prod={c}/>
                        ))
                    }
                    <span className="text-6xl font-bold w-full text-center py-2">{total} €</span>
                    <span className="text-xs w-full text-center ">Les prix sont indiqués avec TVA comprise</span>
                    <Link to={'/cart'} className="font-semibold text-2xl w-full text-center py-2 cursor-pointer hover:text-blue-500">Modifier</Link>
                    <span className="text-4xl py-5 font-semibold text-center w-full border-b-3 border-b-gray-200">Lieu de livraison</span>
                    <p className="w-full text-center text-lg font-semibold">
                        {address?.number} rue {address?.rue}, {address?.complement}, {address?.code} {address?.ville}, {address?.country}
                    </p>
                    <Link to={'/cart'} className="font-semibold text-2xl w-full text-center py-2 cursor-pointer hover:text-blue-500">Modifier</Link>
                </div>
            </div>
            <div className="w-full flex py-12 items-center justify-center gap-8">
                <button onClick={()=>createThisCommande()} className="w-xs my-4 cursor-pointer overflow-hidden py-3 text-white rounded-full flex items-center justify-center font-semibold 
                    relative before:w-full  before:h-full before:bg-black before:absolute  before:z-2 before:top-0 before:left-0
                    transition delay-150 duration-300  before:transition-all  before:delay-155  before:duration-400 hover:text-black hover:before:top-15 
                ">
                <span className="text-xl z-2">Payer</span>
                </button>
            </div>
        </div>
    </div>
  )
}
