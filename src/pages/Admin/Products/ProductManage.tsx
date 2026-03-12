import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductIndex from "./ProductIndex";


export default function ProductManage() {
  const [action, setAction] = useState("index")
  
    const changeAction = (newAction : string)=>{
      setAction(newAction)
    }
  return (
    <div className='w-4/5 min-h-screen py-14 px-18 overflow-y-auto flex flex-col gap-10'>
        {action ==="index" && <ProductIndex changeAction={changeAction}/>}
        {action ==="create" && <CreateProduct changeAction={changeAction}/>}
    </div>
  )
}
