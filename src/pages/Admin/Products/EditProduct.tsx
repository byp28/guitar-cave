import Card from "../../../components/Card";
import { createProduct, type TCategorie, type TProduct, type TSousCategorie } from "../../../utils/guitarCaveApi";
import { useState } from "react";
import CategorieSelecteur from "../../../components/Form/CategorieSelecteur";
import SousCategorieSelecteur from "../../../components/Form/SousCategorieSelecteur";
import MultiDescription from "../../../components/Form/MultiDescription";
import MultiTechDescription from "../../../components/Form/MultiTechDescription";
import type { TDescription, TTechDescription } from "./CreateProduct";


export default function EditProduct({changeAction} : {changeAction : (name:string)=> void}) {

    const [categorieSelected, setCategorieSelected] = useState<TCategorie | null>(null)
    const [sousCategorieSelected, setSousCategorieSelected] = useState<TSousCategorie | null>(null)
    const [description, setDescription] = useState<TDescription[]>([{
        id : 0,
        value : ""
    }])

    const [techDescription, setTechDescription] = useState<TTechDescription[]>([{
        id : 0,
        key : "",
        value : ""
    }])


    const addDescription = (id : number)=>{
        setDescription([
            ...description,
            {id : id, value : ""}
        ])
    }

    const removeDescription = (id : number)=>{
        const newDescription  = description.filter((desc)=> desc.id !== id)
        setDescription(newDescription)
    }

    const updateDescription = (newDescription : TDescription)=>{
        const newID = description.findIndex((desc)=> desc.id === newDescription.id)
        const newTab = description
        newTab[newID].value = newDescription.value,
        setDescription(newTab)
    }

    
    const addTechDescription = (id : number)=>{
        setTechDescription([
            ...techDescription,
            {id : id, key: "", value : ""}
        ])
    }

    const removeTechDescription = (id : number)=>{
        const newTechDescription  = techDescription.filter((desc)=> desc.id !== id)
        setTechDescription(newTechDescription)
    }

    const updateTechDescription = (newTechDescription : TTechDescription)=>{
        const newID = techDescription.findIndex((desc)=> desc.id === newTechDescription.id)
        const newTab = techDescription
        newTab[newID].value = newTechDescription.value,
        newTab[newID].key = newTechDescription.key,
        setTechDescription(newTab)
    }

    const handleSubmit = async (e : React.FormEvent)=>{  
      e.preventDefault(); 
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const descriptionString = ()=> {
        let newString = ""
        description.map((desc)=>{
            newString+=desc.value
            newString+=";"
        })
        return newString
      } 

      const techDescriptionString = ()=>{
        let newString = ""
        techDescription.map((techDesc)=>{
            newString += techDesc.key
            newString += ":"
            newString += techDesc.value
            newString +=";"
        })
        return newString
      }
      
      const newProduct:TProduct = {
        nom : formData.get("name") as string,
        price : parseFloat(formData.get("price") as string), 
        description : descriptionString(),
        Techdescription : techDescriptionString(),
        id_categorie : categorieSelected?.id as number,
        id_sous_categorie : sousCategorieSelected?.id as number,
        imgFile : formData.get("imgFile") as File,
        image : "none",
      }
    
      console.log(newProduct)
      try{
        const productCreate = await createProduct(newProduct);
            
        if(productCreate.data.code === 201){
          changeAction("index")
        }else{
          //setLoading(false)
        }
      }catch(error){
        console.log(error)
      }
      }
   

  return (
    <div className="w-full flex flex-col gap-8">
        <span className='text-5xl font-medium'>Ajouter un Produit</span>
        <form  onSubmit={handleSubmit}  method="post" className="w-full flex justify-between" action="post">
          <div className="flex flex-col gap-3">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Nom</span>
                  <input type="text" name="name" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Prix</span>
                  <input name="price" type="number" className="w-40 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
            <CategorieSelecteur categorieSelected={categorieSelected} setCategorieSelected={setCategorieSelected}/>
            <SousCategorieSelecteur sousCategorieSelected={sousCategorieSelected} setSousCategorieSelected={setSousCategorieSelected} filter={categorieSelected?.designation ?? null} />
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" name="imgFile" className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Description</span>
                    <MultiDescription addDescription={addDescription} updateDescription={updateDescription} removeDescription={removeDescription}/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Description technique</span>
                  <MultiTechDescription addTechDescription={addTechDescription}  removeTechDescription={removeTechDescription} updateTechDescription={updateTechDescription}/>
              </span>
              <button className="w-30 text-lg py-3 cursor-pointer bg-[#B91372] rounded-lg hover:text-[#B91372] hover:bg-white hover:border-2 hover:border-[#B91372] text-white font-medium flex items-center justify-center">
                Valider
              </button>
          </div>
          <Card/>
        </form>
    </div>
  )
}
