import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";



export default function Article() {



  return (
    <div className="w-full flex gap-4 border-t-2 border-t-gray-200">
        <div className="w-25 h-30 bg-gray-300">

        </div>
        <div className="w-full flex flex-col gap-6 py-2">
            <span className="text-lg w-full font-semibold flex justify-between items-center">
                Harley Benton HWY-25BKS Progressive Series
                <div className=" bg-gray-200 flex items-center text-sm justify-between gap-2 px-2 py-3 rounded-xl">
                    <IoIosArrowBack className="cursor-pointer hover:text-blue-400" />
                        1
                    <IoIosArrowForward className="cursor-pointer hover:text-blue-400"/>
                </div>
            </span>
            <div className="w-full flex justify-between items-center">
                <span className="flex gap-8">
                    <RiDeleteBin6Line className="w-6 h-6 cursor-pointer hover:text-red-500"/>
                    <MdFavoriteBorder className="w-6 h-6 cursor-pointer hover:text-red-500"/>
                </span>
                <span className="text-2xl font-semibold">999 €</span>
            </div>
        </div>
    </div>
  )
}
