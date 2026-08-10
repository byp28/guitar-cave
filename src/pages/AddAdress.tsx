import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { useNavigate } from "react-router-dom"
import { createAddress, type TAddressPayloads} from "../utils/guitarCaveApi"
import { useSelector } from "react-redux"
import type { TReducer } from "../Store"


export default function AddAdress({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state : TReducer) => state.user.data)
    const [error, setError] = useState(false)

    const navigate = useNavigate()


    const handleSubmit = async (e : React.FormEvent)=>{
      e.preventDefault();
      const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
      const address : TAddressPayloads = {
        postal : parseInt(formDataObj.get("code") as string),
        number : parseInt(formDataObj.get("numeros") as string),
        rue : formDataObj.get("rue") as string,
        ville : formDataObj.get("ville") as string,
        country : "France",
        complement : formDataObj.get("complement") as string,
      }
    
      setLoading(true)
        try{
          const addressCreate = await createAddress(address,user?.id as number);
          if(addressCreate.status === 404){
            setLoading(false)
            setError(true)
            console.log(addressCreate.data.status)
          }else if(addressCreate.status === 201){
            setLoading(false)
            navigate("/")
          }
          else{
            setLoading(false)
          }
          
        }catch(error){
          setLoading(false)
          setError(true)
          console.log(error, "er")
        }
    
      }


    useEffect(()=>{
      toggleNavBar(true)
    },[])
  
  
    
    if(loading){
        return (
          <>
            <Loading/>
          </>
        )
      }
  

  return (
    <form  onSubmit={handleSubmit} method="POST"  className="w-full min-h-screen p-8 gap-2 flex items-center flex-col">
        <h4 className="py-8 w-md text-5xl">Ajouter une adresse</h4>
        <span className="w-md font-semibold">Code Postal</span>
        <div className="w-md">
          <input className="w-25 p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="code" type="number" required />
        </div>
        <span className="w-md font-semibold">Numéros</span>
        <div className="w-md">
          <input className="w-25 p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="numeros" type="number" required />
        </div>
        <span className="w-md font-semibold">Rue</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="rue" type="text" required />
        <span className="w-md font-semibold">Ville</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="ville" type="text" required />
        <span className="w-md font-semibold">Complement</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="complement" type="text" required />  
        {
          error && <span className="text-red-500 font-semibold py-4">Email ou le mot de passe est incorrect</span>
        }
        <button className="w-md my-4 cursor-pointer overflow-hidden py-3 text-white rounded-full flex items-center justify-center font-semibold 
        relative before:w-full  before:h-full before:bg-black before:absolute  before:z-2 before:top-0 before:left-0
        transition delay-150 duration-300  before:transition-all  before:delay-155  before:duration-400 hover:text-black hover:before:top-15 
        ">
          <span className="text-xl z-2">Soumettre</span>
        </button>
    </form>
  )
}
