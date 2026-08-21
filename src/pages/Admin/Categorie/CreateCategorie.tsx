import { useState } from "react";
import { createCategorie, type TCategorie } from "../../../utils/guitarCaveApi";
import CategorieCardForm from "../../../components/CategorieCardForm";
import { useAppDispatch } from "../../../hook";
import { fetchCategorie } from "../../../features/CategorieSlice";
import Loading from "../../../components/Loading";

export default function CreateCategorie({changeAction} : {changeAction : (name:string)=> void}) {
  
  const [newCategorie,setNewCategorie] = useState<TCategorie>({
    designation : "Nouvelle Categorie",
    img : "https://blocks.astratic.com/img/general-img-landscape.png"
  })
  const Appdispatch = useAppDispatch()
  const [loading , setLoading] = useState<boolean>(false);

  const handleSubmit = async (e : React.FormEvent)=>{  
      e.preventDefault();
      setLoading(true);  
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      const newCategorie:TCategorie = {
        designation : formData.get("designation") as string,
        imgFile : formData.get("imgFile") as File,
        img : "none",
      }

      console.log(newCategorie)
      try{
        const categorieCreate = await createCategorie(newCategorie);
        
        if(categorieCreate.data.code === 201){
            Appdispatch(fetchCategorie())
            changeAction("index")
        }else{
          setLoading(false)
        }
      }catch(error){
        console.log(error)
      }
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (!text) return;

    setNewCategorie({...newCategorie,
      designation : text
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setNewCategorie({...newCategorie,
      img : URL.createObjectURL(file)
    })
  };

    if(loading){
      return <Loading/>
    }

  return (
    <div className="w-full flex flex-col gap-8 max-lg:gap-10">
        <span className='text-5xl max-lg:text-4xl font-medium'>Créer une Categorie</span>
        <form onSubmit={handleSubmit}  method="post" className="w-full flex justify-between max-lg:items-center max-lg:flex-col-reverse max-lg:gap-10 max-lg:py-12" action="post">
          <div className="flex flex-col max-lg:w-full gap-6">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Designation</span>
                  <input name="designation" onChange={handleChangeText} type="text" className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" accept="image/*"  name="imgFile" onChange={handleChange} className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <button className="w-30 text-lg py-3 cursor-pointer bg-[#B91372] rounded-lg hover:text-[#B91372] hover:bg-white hover:border-2 hover:border-[#B91372] text-white font-medium flex items-center justify-center">
                Valider
              </button>
          </div>
          <CategorieCardForm categorie={newCategorie}/>
        </form>
        
    </div>
  )
}
