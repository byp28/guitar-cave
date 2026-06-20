import { useState } from "react"
import SousCategorieIndex from "./SousCategorieIndex"
import CreateSousCategorie from "./CreateSousCategorie"
import type { TSousCategorie } from "../../../utils/guitarCaveApi"
import EditSousCategorie from "./EditSousCategorie"




export default function SousCategorieManage() {
  const [action, setAction] = useState("index")
  const [id, setId] = useState<null|number>(null)
  const [sousCategorieObject, setSousCategoriesObject] = useState<null|TSousCategorie>(null)
  
  const changeAction = (newAction : string)=>{
    setAction(newAction)
  }
  
  const selectCSousCategorie = (n:number,c:TSousCategorie)=>{
    setId(n)
    setSousCategoriesObject(c)
  }

  return (
    <div className='w-4/5 min-h-screen py-14 px-18 overflow-y-auto flex flex-col gap-10'>
      {action ==="index" && <SousCategorieIndex selectCSousCategorie={selectCSousCategorie} changeAction={changeAction}/>}
      {action ==="create" && <CreateSousCategorie changeAction={changeAction}/>}
      {action ==="edit" && <EditSousCategorie changeAction={changeAction} id={id as number} sousCategorieObject={sousCategorieObject as TSousCategorie}/>}
    </div>
  )
}
