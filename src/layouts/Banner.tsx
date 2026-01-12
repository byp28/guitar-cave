import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function Banner() {
  return (
    <div className="w-full h-120 flex items-center bg-amber-200 relative">
        <div className="flex w-full justify-between items-center z-2">
            <IoIosArrowBack className="w-15 h-15 p-2 cursor-pointer" />
            <IoIosArrowForward className="w-15 h-15 p-2 cursor-pointer" />
        </div>
        <div className="w-full flex items-center justify-center absolute bottom-0 pb-4 z-2">
            <div className="p-2 bg-gray-300 rounded-xl flex justify-between gap-2 items-center">
                <span className="bg-gray-50 rounded-full w-6 h-3 cursor-pointer"></span>
                <span className="bg-gray-50 rounded-full w-3 h-3 cursor-pointer"></span>
                <span className="bg-gray-50 rounded-full w-3 h-3 cursor-pointer"></span>
                <span className="bg-gray-50 rounded-full w-3 h-3 cursor-pointer"></span>
                <span className="bg-gray-50 rounded-full w-3 h-3 cursor-pointer"></span>
            </div>
        </div>
        <div className="bg-red-200 w-full h-full absolute z-1 top-0 left-0">

        </div>
        <div className="bg-yellow-200 w-full h-full absolute z-1 top-0 left-0">

        </div>
        <div className="bg-gray-200 w-full h-full absolute z-1 top-0 left-0">

        </div>
        <div className="bg-neutral-200 w-full h-full absolute z-1 top-0 left-0">

        </div>
        <div className="bg-blue-200 w-full h-full absolute z-1 top-0 left-0">

        </div>
    </div>
  )
}
