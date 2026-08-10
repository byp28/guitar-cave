import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useEffect, useState } from "react"
import { getAddressByUserId, getCommandeByUserId, type TAddress, type TCompleteCommande } from "../../utils/guitarCaveApi"
import Loading from "../../components/Loading"
import CommandeAndProduct from "../../components/CommandeAndProduct"


export default function HomeClient() {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const [address, setAdress] = useState<TAddress|null>(null)
    const [commandesProduct, setCommandesProduct] = useState<TCompleteCommande[]>([])
    const [loading, setLoading] = useState(true)

    const fetchAdress = async (id:number)=>{
      const fAddress = await getAddressByUserId(id)

      if(fAddress.status === 200){
        setAdress(fAddress.data as TAddress)
        setLoading(false)
      }
    }

        
    
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
      if(user?.addressId){
        fetchAdress(user.addressId)
      }
      fetchCommandes()
      //setLoading(false)
    },[])

    
    if(loading){
      return <Loading/>
    }

  return (
    <div className='w-4/5 min-h-screen  px-10 overflow-y-auto flex flex-col gap-10'>
        <span className="text-5xl font-semibold">Aperçu</span>
        <div className="flex flex-col w-full justify-start items-start gap-1">
            <span className="text-4xl font-semibold">{user?.nom}</span>
            <span className="text-2xl">{user?.email}</span>
            <span className="text-xl">{address ? `${address.number} ${address.rue} ${address.rue} ${address.code}` : "Aucune adresse enregistrer"}</span>
            <span className="text-base">{address ? `${address.ville},${address.country}` : ""}</span>
        </div>
        <span className="text-4xl font-semibold">Dernière commande</span>
        {
          commandesProduct.length === 0 
          ? 
            <span className="font-semibold w-full text-center text-2xl">Votre historique de commandes est vide</span>
          :
            <CommandeAndProduct  commande={commandesProduct[commandesProduct.length-1]}/>
        }
    </div>
  )
}
