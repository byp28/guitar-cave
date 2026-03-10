import { BiCategory } from "react-icons/bi";
import { ImTable2 } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

export default function ProductIndex() {
  return (
    <>
        <div className="w-full flex items-center justify-between">
            <span className='text-5xl font-medium'>Produits</span>
            <span className="w-15 h-15 flex justify-center items-center cursor-pointer text-3xl font-semibold rounded-sm bg-[#41EAD4] text-white">+</span>
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
                <th scope="col" className="px-6 py-3 text-end font-medium text-muted-foreground-1">Sous-Catégorie</th>
                <th scope="col" className="px-6 py-3 text-end font-medium text-muted-foreground-1">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-table-line">
                <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">John Brown</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">New York No. 1 Lake Park</td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-primary hover:text-primary-hover focus:outline-hidden focus:text-primary-focus disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                </td>
                </tr>

            </tbody>
            </table>
        </div>
        </div>

    </>
  )
}
