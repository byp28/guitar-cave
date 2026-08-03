import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useEffect, useState } from "react"
import { getCommandeByUserId, type TCompleteCommande, type TProductInCommande } from "../../utils/guitarCaveApi"
import Loading from "../../components/Loading"
import CommandeAndProduct from "../../components/CommandeAndProduct"


export default function ClientCommande() {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const [commandesProduct, setCommandesProduct] = useState<TCompleteCommande[]>([])
    const [loading, setLoading] = useState(false)

    const fetchCommandes = async ()=>{
        setLoading(true)
        try{
            const commandeData = await getCommandeByUserId(user?.id as number)

            if(commandeData.status === 200){
                setCommandesProduct(commandeData.data as TCompleteCommande[])
                setLoading(false)
            }
        }catch(e){
            console.log(e)
        }
    }



    useEffect(()=>{
        fetchCommandes()
    },[])

    if(loading){
        return <Loading/>
    }
  return (
    <div className='w-4/5 min-h-screen  px-10  flex flex-col gap-10'>
        <span className="text-5xl font-semibold">Mes Commandes</span>
        <div className="w-full flex flex-col gap-10">
            {
                commandesProduct.map((c,key)=>(
                    <CommandeAndProduct key={key} commande={c}/>
                ))
            }
        </div>
    </div>
  )
}
