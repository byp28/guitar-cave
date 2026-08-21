import { createProduct, type TCategorie, type TProduct, type TSousCategorie } from "../../../utils/guitarCaveApi";
import { useState } from "react";
import CategorieSelecteur from "../../../components/Form/CategorieSelecteur";
import SousCategorieSelecteur from "../../../components/Form/SousCategorieSelecteur";
import MultiDescription from "../../../components/Form/MultiDescription";
import MultiTechDescription from "../../../components/Form/MultiTechDescription";
import ProductCardForm from "../../../components/Form/ProductCardForm";
import { fetchProduct } from "../../../features/ProductSlice";
import { useAppDispatch } from "../../../hook";
import Loading from "../../../components/Loading";

export type TDescription = {
    id : number,
    value : string
}

export type TTechDescription = {
    id : number,
    key : string,
    value : string
}

export default function CreateProduct({changeAction} : {changeAction : (name:string)=> void}) {

    const [categorieSelected, setCategorieSelected] = useState<TCategorie | null>(null)
    const Appdispatch = useAppDispatch()
    const [sousCategorieSelected, setSousCategorieSelected] = useState<TSousCategorie | null>(null)
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState<TDescription[]>([{
        id : 0,
        value : ""
    }])

    const [techDescription, setTechDescription] = useState<TTechDescription[]>([{
        id : 0,
        key : "",
        value : ""
    }])
    const [nproduct, setNProduct] = useState<TProduct>({
        nom : "Nouveau produit",
        price : 0, 
        description : "",
        description_technique : "",
        id_categorie : 0,
        id_sous_categorie : 0,
        image : "https://blocks.astratic.com/img/general-img-landscape.png",
    })


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
        description_technique : techDescriptionString(),
        id_categorie : categorieSelected?.id as number,
        id_sous_categorie : sousCategorieSelected?.id as number,
        imgFile : formData.get("imgFile") as File,
        image : "none",
      }
      setLoading(true)
    
      try{
        const productCreate = await createProduct(newProduct);
            
        if(productCreate.data.code === 201){
            Appdispatch(fetchProduct())
            changeAction("index")
        }else{
          setLoading(false)
        }
      }catch(error){
        console.log(error)
      }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        setNProduct({...nproduct,
            nom : text
        })
    };

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        if (!text) return;

        setNProduct({...nproduct,
            price : parseInt(text)
        })
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setNProduct({...nproduct,
      image : URL.createObjectURL(file)
    })
  };

   if(loading){
    return <Loading/>
   }

  return (
    <div className="w-full flex flex-col gap-8 max-lg:gap-20">
        <span className='text-5xl max-lg:text-4xl font-medium'>Ajouter un Produit</span>
        <form  onSubmit={handleSubmit}  method="post" className="w-full flex justify-between max-lg:items-center max-lg:flex-col-reverse max-lg:gap-10 max-lg:py-12" action="post">
          <div className="flex flex-col max-lg:w-full gap-3">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Nom</span>
                  <input type="text" onChange={handleChangeName} name="name" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Prix</span>
                  <input name="price" type="number" onChange={handleChangePrice} className="w-40 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
            <CategorieSelecteur categorieSelected={categorieSelected} setCategorieSelected={setCategorieSelected}/>
            <SousCategorieSelecteur sousCategorieSelected={sousCategorieSelected} setSousCategorieSelected={setSousCategorieSelected} filter={categorieSelected?.designation ?? null} />
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" accept="image/*"  name="imgFile" onChange={handleChange} className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Description</span>
                    <MultiDescription addDescription={addDescription} updateDescription={updateDescription} removeDescription={removeDescription}/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Description technique</span>
                  <MultiTechDescription addTechDescription={addTechDescription}  removeTechDescription={removeTechDescription} updateTechDescription={updateTechDescription}/>
              </span>
              <button className="w-40 text-lg my-10 py-3 cursor-pointer bg-[#B91372] rounded-lg hover:text-[#B91372] hover:bg-white hover:border-2 hover:border-[#B91372] text-white font-medium flex items-center justify-center">
                Valider
              </button>
          </div>
            <ProductCardForm product={nproduct}/>
        </form>
    </div>
  )
}
