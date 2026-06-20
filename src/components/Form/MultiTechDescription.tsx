import { useState } from "react";
import type { TDescription, TTechDescription } from "../../pages/Admin/Products/CreateProduct";
import MutltiInputWithKey from "./MutltiInputWithKey";


export default function MultiTechDescription({addTechDescription, removeTechDescription, updateTechDescription} : 
    {addTechDescription : (id : number)=> void, 
    removeTechDescription : (id : number)=> void,
    updateTechDescription : (newDesc : TTechDescription)=> void
    }) {
    const [components, setComponents] = useState([0]);

    const addComponent = () => {
        const newID = Date.now()
        setComponents([...components, newID]);
        addTechDescription(newID)
    };

    const removeComponent = (id : number) => {
        if(components.length > 1){
            setComponents(components.filter((c) => c !== id));
            removeTechDescription(id)
        } 
    };

    const updateComponent = (id : number, key : string,value : string,)=>{
        const newDesc : TTechDescription = {
            id : id,
            key : key,
            value : value
        }

        updateTechDescription(newDesc)
    }

  return (
    <div className="flex flex-col gap-2">
        {components.map((id) => (
            <MutltiInputWithKey
                key={id}
                updateComponent = {updateComponent}
                id={id}
                onDelete={() => removeComponent(id)}
            />
        ))}

        <span className="border-2 w-12 px-4 py-2 border-gray-400 rounded-lg cursor-pointer" onClick={addComponent}>+</span>
    </div>
  )
}
