import { useState } from "react";
import MutltiInput from "./MutltiInput";
import type { TDescription } from "../../pages/Admin/Products/CreateProduct";



export default function MultiDescription({addDescription, removeDescription, updateDescription,descriptionTab} : 
    {
    addDescription : (id : number)=> void, 
    removeDescription : (id : number)=> void,
    updateDescription : (newDesc : TDescription)=> void,
    descriptionTab? : TDescription[] 
    }) {

    const extratID = ()=>{
        const newID : number[] = []
        descriptionTab?.map((desc)=>{
            newID.push(desc.id)
        })
        return newID
    }    

    const getBaseValue = (id:number)=>{
        if(descriptionTab){
            if(descriptionTab[id]){
                return descriptionTab[id].value
            }
            return ""
        }
        return ""
    }

    const [components, setComponents] = useState(descriptionTab ? extratID() : [0]);

    const addComponent = () => {
        const newID = Date.now()
        setComponents([...components, newID]);
        addDescription(newID)
    };

    const removeComponent = (id : number) => {
        if(components.length > 1){
            setComponents(components.filter((c) => c !== id));
            removeDescription(id)
        } 
    };

    const updateComponent = (id : number,value : string)=>{
        const newDesc : TDescription = {
            id : id,
            value : value
        }

        updateDescription(newDesc)
    }

  
  return (
    <div className="flex flex-col gap-2">
        {components.map((id) => (
            <MutltiInput
                key={id}
                updateComponent = {updateComponent}
                id={id}
                baseValue={getBaseValue(id)}
                onDelete={() => removeComponent(id)}
            />
        ))}

        <span className="border-2 w-12 px-4 py-2 border-gray-400 rounded-lg cursor-pointer" onClick={addComponent}>+</span>
    </div>
  )
}
