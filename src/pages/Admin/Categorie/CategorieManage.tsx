import { useState } from "react";
import CreateCategorie from "./CreateCategorie";
import CategorieIndex from "./CategorieIndex";


export default function CategorieManage() {
  const [action, setAction] = useState("index")

  const changeAction = (newAction : string)=>{
    setAction(newAction)
  }

  return (
    <div className='w-4/5 min-h-screen py-14 px-18 overflow-y-auto flex flex-col gap-10'>
        {action ==="index" && <CategorieIndex changeAction={changeAction}/>}
        {action ==="create" && <CreateCategorie/>}
    </div>
  )
}
