
import { useState } from "react";
import { updateCategorie, type TCategorie } from "../../../utils/guitarCaveApi";
import CategorieExemple from "../../../components/CategorieExemple";

export default function EditCategorie({changeAction, id, categorieObject} : {changeAction : (name:string)=> void, id:number, categorieObject : TCategorie}) {
  
  const [loading , setLoading] = useState<boolean>(false);

  const handleSubmit = async (e : React.FormEvent)=>{  
      e.preventDefault();
      setLoading(true);  
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      const newCategorie:TCategorie = {
        designation : formData.get("designation") as string,
        imgFile : formData.get("imgFile") as File,
        img : categorieObject.img,
      }

      console.log(newCategorie)
      try{
        const categorieEdit = await updateCategorie(newCategorie, id);
        
        if(categorieEdit.data.code === 201){
            setLoading(false)
            changeAction("index")
        }else{
          setLoading(false)
        }
      }catch(error){
            console.log(error)
      }
   }


  return (
    <div className="w-full flex flex-col gap-8">
        <span className='text-5xl font-medium'>Modifier une Catégorie</span>
        <form onSubmit={handleSubmit}  method="post" className="w-full flex justify-between" action="post">
          <div className="flex flex-col gap-6">
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Designation</span>
                  <input name="designation" type="text" defaultValue={categorieObject.designation} className="w-80 border-2 px-4 py-2 border-gray-400 rounded-lg outline-0"/>
              </span>
              <span className="flex flex-col gap-2">
                  <span className="font-medium text-lg">Image</span>
                  <input type="file" name="imgFile" className="w-70 border-2 px-4 py-2 cursor-pointer border-gray-400 rounded-lg outline-0"/>
              </span>
              <button className="w-30 text-lg py-3 cursor-pointer bg-[#B91372] rounded-lg hover:text-[#B91372] hover:bg-white hover:border-2 hover:border-[#B91372] text-white font-medium flex items-center justify-center">
                Valider
              </button>
          </div>
          <CategorieExemple img={categorieObject.img} name={categorieObject.designation}/>
        </form>
        
    </div>
  )
}
