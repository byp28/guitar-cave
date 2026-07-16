import { useRef } from "react"
import type { TTechDescription } from "../../pages/Admin/Products/CreateProduct"


export default function MutltiInput({onDelete, updateComponent, id,BaseValue} : 
    {
        onDelete : ()=>void,
        updateComponent : (id: number, key: string, value : string)=> void,
        id : number,
        BaseValue? : TTechDescription
    }) {

        const inputKeyRef = useRef<HTMLInputElement>(null)    
        const inputValueRef = useRef<HTMLInputElement>(null) 

        const onChangeInput = ()=>{
            updateComponent(id, inputKeyRef.current?.value as string, inputValueRef.current?.value as string)
        }

  return (
    <>
        <div>
            <input ref={inputKeyRef} onChange={onChangeInput} defaultValue={BaseValue ? BaseValue.key : ""}  type="text" className="w-35 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0" />
            <span className="mx-2 font-semibold">-</span>
            <input ref={inputValueRef} onChange={onChangeInput} defaultValue={BaseValue ? BaseValue.value : ""} type="text" className="w-35 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0" />
            <span onClick={()=>onDelete()} className="border-2 px-2 py-2 border-gray-400 rounded-lg cursor-pointer mx-4">-</span>
        </div>
        
    </>
  )
}
