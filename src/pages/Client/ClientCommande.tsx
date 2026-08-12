import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useEffect, useState } from "react"
import { getCommandeByUserId, type TCompleteCommande } from "../../utils/guitarCaveApi"
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
    <div className='w-4/5 max-lg:w-full max-lg:px-0 min-h-screen  px-10  flex flex-col gap-10'>
        <span className="text-5xl max-lg:text-4xl font-semibold">Mes Commandes</span>
        <div className="w-full flex flex-col gap-10">
            {
                commandesProduct.length === 0 
                ? 
                    <span className="font-semibold w-full text-center text-2xl">Votre historique de commandes est vide</span>
                :
                    commandesProduct.map((c,key)=>(
                        <CommandeAndProduct key={key} commande={c}/>
                    ))
            }
        </div>
    </div>
  )
}
