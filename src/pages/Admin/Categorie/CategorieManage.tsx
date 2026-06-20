import { useState } from "react";
import CreateCategorie from "./CreateCategorie";
import CategorieIndex from "./CategorieIndex";
import type { TCategorie } from "../../../utils/guitarCaveApi";
import EditCategorie from "./EditCategorie";
//import Page404 from "../../Page404";


export default function CategorieManage() {
  const [action, setAction] = useState("index")
  const [id, setId] = useState<null|number>(null)
  const [categorieObject, setCategoriesObject] = useState<null|TCategorie>(null)

  const changeAction = (newAction : string)=>{
    setAction(newAction)
  }

  const selectCategorie = (n:number,c:TCategorie)=>{
    setId(n)
    setCategoriesObject(c)
  }

  return (
    <div className='w-4/5 min-h-screen py-14 px-18 overflow-y-auto flex flex-col gap-10'>
        {action ==="index" && <CategorieIndex selectCategorie={selectCategorie} changeAction={changeAction}/>}
        {action ==="create" && <CreateCategorie changeAction={changeAction}/>}
        {action ==="edit" &&
         id && categorieObject ?
          <EditCategorie changeAction={changeAction} id={id} categorieObject={categorieObject} />
         :""
        }
    </div>
  )
}
