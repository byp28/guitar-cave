import { Link } from 'react-router-dom'
import type { TCompleteCommande } from '../utils/guitarCaveApi'

export default function CommandeAndProduct({commande}:{commande : TCompleteCommande}) {

    const totalCommande = ()=>{
        let total = 0
        commande.product.map((p)=>{
            total+= p.price * p.quantity
        })

        return total
    }

    const formatDate=(isoString : string)=> {
        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    }

  return (
    <div className='w-full flex flex-col'>
        <div className='w-full flex flex-wrap '>
            {
                commande.product.map((p,key)=>(
                    <Link key={key} className='flex flex-col gap-2 items-center justify-center px-4 py-2 cursor-pointer hover:scale-105 relative' to={`/product/${p.productID}`}>
                        <div className="w-25 h-30 flex justify-center items-center">
                            <img src={`${import.meta.env.VITE_API_ADRESS}/img/product/${p.image}`} className="h-full" alt={p.nom} />
                        </div>
                        <span className='text-xs font-semibold'>{p.nom}</span>
                        <span className='font-semibold'>{p.price}€</span>
                        <span className='text-xl font-bold italic absolute top-0 right-0'>x{p.quantity}</span>
                    </Link>
                ))
            }
        </div>
        <div className='w-full py-8 px-6 border-b-4 border-b-blue-500 flex items-center flex-wrap gap-y-4 bg-gray-100 justify-between'>
            <div className='flex flex-col'>
                <span className='text-xs text-neutral-700'>Numéros de la commande</span>
                <span className='text-xl font-semibold'>{commande.commande.CommandeNumber}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-xs text-neutral-700'>Créé le</span>
                <span className='text-xl font-semibold'>{formatDate(commande.commande.date_cmd)}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-xs text-neutral-700'>Status</span>
                <span className='text-xl font-semibold'>{commande.commande.status}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-xs text-neutral-700'>Total</span>
                <span className='text-xl font-bold'>{totalCommande()}€</span>
            </div>
        </div>
    </div>
  )
}
