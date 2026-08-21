
export type TModalData = {
    text : string,
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

export default function Modal({Data, Action, closeModal} : {Data: TModalData ,Action : ()=>void, closeModal : ()=>void}) {

  return (
    <section className='w-full fixed left-0 top-0 h-screen bg-black/80 flex items-center justify-center max-lg:px-8 px-20'>
        <div className="max-lg:w-full w-md py-8 px-6 flex flex-col gap-10 bg-white rounded-lg">
            <span>
                {Data.text}
            </span>
            <div className="w-full flex items-center justify-between">
                <button onClick={()=>closeModal()} className={`px-4 py-2 rounded-md bg-${Data.close.background} text-${Data.close.color}`}>
                    {Data.close.text}
                </button>
                <button onClick={()=>Action()} className={`px-4 py-2 rounded-md bg-${Data.valide.background} text-${Data.valide.color}`}>
                    {Data.valide.text}
                </button>
            </div>
        </div>
    </section>
  )
}
