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
    <div className="w-290 h-125 max-lg:w-100 mx-lg:h-80  flex rounded-xl items-center relative">
        <div className="flex w-full justify-between items-center z-2">
            <IoIosArrowBack onClick={()=>toggleImage(-1)} className="w-15 h-15 p-2 cursor-pointer" />
            <IoIosArrowForward onClick={()=>toggleImage(1)} className="w-15 h-15 p-2 cursor-pointer" />
        </div>
        <div className="w-full flex items-center justify-center absolute bottom-0 pb-4 z-2">
            <div className="p-2 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-xl backdrop-blur-3xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex justify-between gap-2 items-center">
                <span onClick={()=>setSliderIndex(1)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 1 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(2)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 2 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(3)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 3 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(4)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 4 ? "w-6" : "w-3"}` }></span>
                <span onClick={()=>setSliderIndex(5)} className={`bg-gray-50 rounded-full h-3 cursor-pointer ${sliderIndex === 5 ? "w-6" : "w-3"}` }></span>
            </div>
        </div>
        <div className={sliderIndex === 1 ? "w-full h-full absolute z-1 top-0 left-0" : "hidden"}>
            <img className="absolute rounded-xl top-0 left-0 w-full h-full object-cover" src="/assets/img/cover1.jpg"  alt="cover" />
        </div>
        <div className={sliderIndex === 2 ? "w-full h-full absolute z-1 top-0 left-0" : "hidden"}>
            <img className="absolute rounded-xl top-0 left-0 w-full h-full object-cover" src="/assets/img/cover2.jpg"  alt="cover" />
        </div>
        <div className={sliderIndex === 3 ? "w-full h-full absolute z-1 top-0 left-0" : "hidden"}>
            <img className="absolute rounded-xl top-0 left-0 w-full h-full object-cover" src="/assets/img/cover3.jpg"  alt="cover" />
        </div>
        <div className={sliderIndex === 4 ? " w-full h-full absolute z-1 top-0 left-0" : "hidden"}>
            <img className="absolute rounded-xl top-0 left-0 w-full h-full object-cover" src="/assets/img/cover4.jpg"  alt="cover" />
        </div>
        <div className={sliderIndex === 5 ? "w-full h-full absolute z-1 top-0 left-0" : "hidden"}>
            <img className="absolute rounded-xl top-0 left-0 w-full h-full object-cover" src="/assets/img/cover5.jpg"  alt="cover" />
        </div>
        
    </div>
  )
}
