import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { ImTable2 } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { getProducts, type TProduct } from "../../../utils/guitarCaveApi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function ProductIndex({changeAction} : {changeAction : (name:string)=> void}) {

    const [products, setProducts] = useState<TProduct[]>([])
    
    const fillProducts = async ()=>{
        const ProductData = await getProducts()
        console.log(ProductData.data)
        setProducts(ProductData.data)
    }

    useEffect(()=>{
        if(products.length <= 0){
            fillProducts()
        }
    }, [products])
  return (
    <>
        <div className="w-full flex items-center justify-between">
            <span className='text-5xl font-medium'>Produits</span>
            <span onClick={()=>changeAction("create")} className="w-15 h-15 flex justify-center items-center cursor-pointer text-3xl font-semibold rounded-sm bg-[#41EAD4] text-white">+</span>
        </div>
        <div className="flex gap-8">
            <input className="w-70 px-4 py-2 bg-gray-200 outline-0 rounded-lg" placeholder="Nom de l'article" type="text" />
            <button className="px-4 py-2 bg-gray-200 cursor-pointer font-medium rounded-lg hover:bg-gray-300">Go</button>
        </div>
        
        <div className="w-full flex items-center justify-between">
            <span className="flex bg-gray-100 gap-2 rounded-lg">
                <ImTable2 className="w-10 h-10 bg-gray-200 p-2 rounded-lg cursor-pointer hover:text-[#B91372]" />
                <BiCategory className=" p-2 rounded-lg w-10 h-10 cursor-pointer hover:text-[#B91372]" />
            </span>
            <span className="w-30 font-medium bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer px-4 py-2 ">
                A-Z
                <IoIosArrowDown />
            </span>
        </div>

        <div className="min-w-full">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
            <table className="min-w-full divide-y divide-table-line">
            <thead>
                <tr>
                <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Nom</th>
                <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1">Prix</th>
                <th scope="col" className="px-6 py-3 text-start  font-medium text-muted-foreground-1">Categorie</th>
                <th scope="col" className="px-6 py-3 text-start  font-medium text-muted-foreground-1">Sous-Catégorie</th>
                <th scope="col" className="px-6 py-3 text-start  font-medium text-muted-foreground-1">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-table-line">
                {
                    products.map((prod, key)=>(
                        <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{prod.nom}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{prod.price} €</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{prod.categorie}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{prod.sousCategorie}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex gap-2 text-end text-sm font-medium">
                                <HiOutlinePencilSquare  className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                                <AiOutlineDelete className="w-6 h-6 cursor-pointer hover:text-[#B91372]" />
                            </td>
                        </tr>
                    ))
                }
                

            </tbody>
            </table>
        </div>
        </div>

    </>
  )
}
