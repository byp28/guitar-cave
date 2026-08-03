import { type TCart } from "../features/cart";



export default function ProductCommandeCard({prod}: {prod : TCart}) {



  return (
    <div className="w-full flex items-center justify-between ">
        <div className="w-30 h-30 flex justify-center items-center">
            <img src={`${import.meta.env.VITE_API_ADRESS}/img/product/${prod?.img}`} className="h-full" alt={prod.name} />
        </div>
        <div className="w-full flex flex-col gap-2">
            <span className="text-lg w-full font-bold flex justify-between items-center">
                {prod.name}
            </span>
            <div className="w-full flex justify-between items-center">
                <span className="text-xl font-semibold">{prod.price} €</span>
            </div>
        </div>
        <span className="text-4xl font-bold italic">
            x{prod.quantity}
        </span>
    </div>
  )
}
