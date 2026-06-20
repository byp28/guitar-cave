import { useRef } from "react"


export default function MutltiInput({onDelete, updateComponent, id} : 
    {
        onDelete : ()=>void,
        updateComponent : (id: number, value : string)=> void,
        id : number

    }) {

        const inputRef = useRef<HTMLInputElement>(null)    
        const onChangeInput = ()=>{
            updateComponent(id, inputRef.current?.value as string)
        }

  return (
    <>
        <div>
            <input ref={inputRef} onChange={onChangeInput} type="text" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0" />
            <span onClick={()=>onDelete()} className="border-2 px-4 py-2 border-gray-400 rounded-lg cursor-pointer mx-4">-</span>
        </div>
        
    </>
  )
}
