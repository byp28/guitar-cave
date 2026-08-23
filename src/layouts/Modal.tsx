import type { ReactElement } from "react"

export type TModalData = {
    text : string,
    content? : ReactElement
    valide: {
        text : string,
        background : string,
        color : string,
    },
    close:  {
        text : string,
        background : string,
        color : string,
    },
}

export default function Modal({Data, Action, closeModal} : {Data: TModalData , Action : ()=>void, closeModal : ()=>void}) {

  return (
    <section className='w-full text-base fixed left-0 top-0 z-98 h-screen bg-black/90 flex items-center justify-center max-lg:px-8 px-20 max-lg:overflow-auto'>
        <div className="max-lg:w-full w-3xl z-99 py-8 px-6 flex flex-col gap-10 bg-white rounded-lg ">
            {
                Data.content 
                ?
                    Data.content 
                :
                <span>
                    {Data.text}
                </span>
            }
           
            <div className="w-full flex items-center justify-between">
                <button onClick={()=>closeModal()} className={`cursor-pointer px-4 py-2 rounded-md bg-${Data.close.background} text-${Data.close.color}`}>
                    {Data.close.text}
                </button>
                <button onClick={()=>Action()} className={`cursor-pointer px-4 py-2 rounded-md bg-${Data.valide.background} text-${Data.valide.color}`}>
                    {Data.valide.text}
                </button>
            </div>
        </div>
    </section>
  )
}
