import { FaArrowRight, FaStripe } from "react-icons/fa";
import Article from "../components/Article";
import {  useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
    
    const [total, setTotal] = useState(0)
    const {cart} = useSelector((state: TReducer) => state.cart.data)
    const {user} = useSelector((state: TReducer) => state.user.data)
    const navigation = useNavigate()
    const calculatTotal = ()=>{
        let t = 0
        cart.map((p)=>{
            t += p.quantity * p.price
        })
        return t
    }

    const verifie = ()=>{
        if(!user){
            navigation('/register')
            return 
        }
        navigation('/commande')
    }

    useEffect(()=>{
        toggleNavBar(true)
        setTotal(calculatTotal())
    },[cart])
  return (
    <div className="w-full px-10 py-10 max-lg:px-5 min-h-screen flex flex-col gap-12">
        <h4 className="text-6xl max-lg:text-5xl font-semibold">Mon panier</h4>
        <div className="w-full flex gap-4  justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-12">
            <div className="w-2/3 max-lg:w-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-4">
                    {
                        cart.length === 0 
                        ? <span className="text-gray-300 text-5xl font-semibold w-full text-center">Panier vide</span>
                        : cart.map((c,key)=>(
                            <Article key={key} prod={c}/>
                        ))
                    }

                </div>
            </div>
            <div className="w-1/3 max-lg:w-full flex flex-col gap-8">
                <div className="w-full px-2 flex flex-col items-start justify-center gap-5">
                    <span className="text-5xl max-lg:text-4xl font-semibold mb-4">Total</span>
                    <span className="text-6xl font-bold w-full text-center">{total} €</span>
                    <span className="text-xs w-full text-center ">Les prix sont indiqués avec TVA comprise</span>
                    <span onClick={()=> verifie()} className={`${cart.length === 0 ? "hidden" : "flex"} my-10 w-full items-center justify-center gap-4 cursor-pointer`}>
                        <span className="font-semibold text-2xl">Passer commande</span> 
                        <FaArrowRight className="w-6 h-6" />
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
