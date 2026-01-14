import { ImStarFull } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlDislike, SlLike } from "react-icons/sl";


export default function Comment() {
  return (
    <div className='w-full py-4 flex flex-col gap-8 bg-white'>
        <div className='flex gap-4 items-center'>
            <div className='w-18 h-18 bg-blue-500 text-3xl text-white rounded-full flex items-center justify-center'>
                A
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-2xl">Amelie</span>
                <span className="flex gap-1">
                    <ImStarFull className="h-4 w-4" />
                    <ImStarFull className="h-4 w-4" />
                    <ImStarFull className="h-4 w-4" />
                </span>
            </div>
            
        </div>
        <div className="w-full">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum similique et perspiciatis ipsum officiis suscipit quas sit totam ipsam. Odit provident autem quis expedita iusto praesentium minima odio consequatur ipsam?</p>
        </div>
        <div className="w-full flex gap-6">
            <span className="flex gap-3 items-center"><SlLike  className="w-5 h-5 cursor-pointer hover:text-blue-500" />0</span>
            <span className="flex gap-3 items-center"><SlDislike  className="w-5 h-5 cursor-pointer hover:text-red-500" />0</span>
            <RiDeleteBin6Line className="w-6 h-6 cursor-pointer hover:text-red-500"/>
        </div>
    </div>
  )
}
