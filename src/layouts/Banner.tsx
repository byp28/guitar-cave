import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function Banner() {

    const [sliderIndex, setSliderIndex] = useState(1)

    function toggleImage(indexPayload : number){

        setSliderIndex(state=>{
            if(indexPayload+state>5){
                return 1;
            }else if(indexPayload+state<1){
                return 5;
            }else{
                return indexPayload+state;
            }
        })

    }

    useEffect(()=>{

        const intervalID = setInterval(()=> toggleImage(1), 6000);
        return ()=>clearInterval(intervalID)
    },[])
    
  return (
    <div className="w-full h-120 flex items-center relative">
        <div className="flex w-full justify-between items-center z-2">
            <IoIosArrowBack onClick={()=>toggleImage(-1)} className="w-15 h-15 p-2 cursor-pointer" />
            <IoIosArrowForward onClick={()=>toggleImage(1)} className="w-15 h-15 p-2 cursor-pointer" />
        </div>
        <div className="w-full flex items-center justify-center absolute bottom-0 pb-4 z-2">
            <div className="p-2 bg-gray-300 rounded-xl flex justify-between gap-2 items-center">
                <span onClick={()=>setSliderIndex(1)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 1 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(2)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 2 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(3)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 3 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(4)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 4 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(5)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 5 ? "w-6" : "w-3"}` }></span>

            </div>
        </div>
        <div className={sliderIndex === 1 ? "bg-red-200 w-full h-full absolute z-1 top-0 left-0" : "hidden"}>

        </div>
        <div className={sliderIndex === 2 ? "bg-neutral-200 w-full h-full absolute z-1 top-0 left-0" : "hidden"}>

        </div>
        <div className={sliderIndex === 3 ? "bg-blue-200 w-full h-full absolute z-1 top-0 left-0" : "hidden"}>

        </div>
        <div className={sliderIndex === 4 ? "bg-yellow-200 w-full h-full absolute z-1 top-0 left-0" : "hidden"}>

        </div>
        <div className={sliderIndex === 5 ? "bg-amber-200 w-full h-full absolute z-1 top-0 left-0" : "hidden"}>

        </div>
        
    </div>
  )
}
