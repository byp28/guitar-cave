import { FaStripe } from "react-icons/fa";
import Article from "../components/Article";

export default function Cart() {
  return (
    <div className="w-full px-20 py-8 flex flex-col gap-12">
        <h4 className="text-6xl font-semibold">Mon panier</h4>
        <div className="w-full flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-2/3 max-lg:w-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-4">
                    <Article/>
                    <Article/>
                    <Article/>
                </div>
            </div>
            <div className="w-1/3 max-lg:w-full flex flex-col gap-8">
                <div className="w-full px-2 py-4 rounded-xl bg-gray-200 flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl font-semibold">Montant total</span>
                    <span className="text-4xl font-bold">999 €</span>
                    <span className="text-lg font-semibold">Les prix sont indiqués avec TVA comprise</span>
                    <button className="px-15 py-1 rounded-full bg-black text-white font-semibold text-2xl flex items-center justify-center gap-4 cursor-pointer hover:bg-gray-900">Aller sur <FaStripe className="text-violet-500 w-12 h-12 flex items-center justify-center" /></button>
                </div>
            </div>
        </div>
    </div>
  )
}
