import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useEffect, useState } from "react"
import { createAddress, getAddressByUserId, updateAddress, type TAddress, type TAddressPayloads} from "../../utils/guitarCaveApi"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router-dom"


export default function ClientAddress() {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const [address, setAdress] = useState<TAddress|null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)
    const navigate = useNavigate()

    const fetchAdress = async (id:number)=>{
        const fAddress = await getAddressByUserId(id)
   
        if(fAddress.status === 200){
           setAdress(fAddress.data as TAddress)
           setLoading(false)
        }
    }


    const handleSubmit = async (e : React.FormEvent)=>{
          e.preventDefault();
          const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
          const newAddress : TAddressPayloads = {
            postal : parseInt(formDataObj.get("code") as string),
            number : parseInt(formDataObj.get("numeros") as string),
            rue : formDataObj.get("rue") as string,
            ville : formDataObj.get("ville") as string,
            country : "France",
            complement : formDataObj.get("complement") as string,
          }
        
          setLoading(true)
            try{
        
                if(address){
                    const addressCreate = await updateAddress(newAddress,address.id);

                    if(addressCreate.status === 404){
                        setLoading(false)
                        setError(true)
                    }else if(addressCreate.status === 201){
                        setLoading(false)
                        navigate("/client-admin")
                        navigate(0)
                    }
                    else{
                        setLoading(false)
                    }
                }else{
                    const addressCreate = await createAddress(newAddress,user?.id as number);
                    if(addressCreate.status === 404){
                        setLoading(false)
                        setError(true)
                    }else if(addressCreate.status === 201){
                        setLoading(false)
                        navigate("/client-admin")
                        navigate(0)
                    }
                    else{
                        setLoading(false)
                    }
                }
            }catch(error){
              setLoading(false)
              setError(true)
              console.log(error, "er")
            }
        
          }

          
    useEffect(()=>{
      if(user?.addressId){
        fetchAdress(user.addressId)
      }else{
        setLoading(false)
      }
    },[])

    if(loading){
        return <Loading/>
    }
  return (
    <div className='w-4/5 max-lg:w-full max-lg:px-0 min-h-screen  px-10  flex flex-col gap-10'>
        <span className="text-5xl max-lg:text-4xl font-semibold">{address ? "Modifier mon adresse" : "Ajouter mon adresse"}</span>
        <form onSubmit={handleSubmit}  method="POST"  className="w-full flex flex-col gap-3">
            <span className="w-md font-semibold">Code Postal</span>
            <div className="w-md">
                <input className="w-25 p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="code" type="number" defaultValue={address ? address.code : undefined} required />
            </div>
            <span className="w-md max-lg:w-full font-semibold">Numéros</span>
            <div className="w-md">
                <input className="w-25 p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="numeros" type="number" defaultValue={address ? address.number : undefined} required />
            </div>
            <span className="w-md max-lg:w-full font-semibold">Rue</span>
                <input className="w-md p-2 max-lg:w-full text-md border-2 border-gray-400 outline-0 rounded-lg" name="rue" type="text" defaultValue={address ? address.rue : undefined} required />
            <span className="w-md max-lg:w-full font-semibold">Ville</span>
                <input className="w-md max-lg:w-full p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="ville" type="text" defaultValue={address ? address.ville : undefined} required />
            <span className="w-md max-lg:w-full font-semibold">Complement</span>
            <input className="w-md max-lg:w-full p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="complement" type="text" defaultValue={address ? address.complement : undefined} required />  
            
            <button className="w-30 my-4 cursor-pointer overflow-hidden py-3 text-white rounded-xl flex items-center justify-center font-semibold 
            relative before:w-full  before:h-full before:bg-black before:absolute  before:z-2 before:top-0 before:left-0
            transition delay-150 duration-300  before:transition-all  before:delay-155  before:duration-400 hover:text-black hover:before:top-15 
            ">
            <span className="text-xl z-2">{address ? "Modifier" : "Ajouter"}</span>
            </button>
        </form>
    </div>
  )
}
