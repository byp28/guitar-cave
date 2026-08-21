import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useState } from "react"
import { updateUser, type TUserPayloads} from "../../utils/guitarCaveApi"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router-dom"
import { checkName } from "../../features/CheckFormValue"
import { useAppDispatch } from "../../hook"
import { verifieConnection } from "../../features/UserSlice"


export default function ClientInformation() {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const Appdispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        pseudo : "",
        email : "",
        mdp : "",
        cmdp : "",
    })
    const navigate = useNavigate()


    const handleSubmit = async (e : React.FormEvent)=>{
        e.preventDefault();
        const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
        const newInformation : TUserPayloads = {
            nom : formDataObj.get("nom") as string,
            email : formDataObj.get("email") as string,
        }

        setLoading(true)

        if(!checkName(newInformation.nom)?.check){
            setError({...error,
                pseudo : checkName(newInformation.nom)?.error as string
            })
            setLoading(false)
                return
            }else{
                setError({...error,
                  pseudo : ""
            })
        }
        
        
        try{
            const updateU = await updateUser(newInformation,user?.id as number);

            if(updateU.status === 404){
                setLoading(false)
                        
            }else if(updateU.status === 200){
                await Appdispatch(verifieConnection())
                navigate(0)
            }
            else{
                setLoading(false)
            }

            }catch(error){
              setLoading(false)
              console.log(error, "er")
            }
        
        }

          


    if(loading){
        return <Loading/>
    }

  return (
    <div className='w-4/5 max-lg:w-full max-lg:px-0 min-h-screen  px-10  flex flex-col gap-10'>
        <span className="text-5xl max-lg:text-4xl font-semibold">Modifier mes informations</span>
        <form onSubmit={handleSubmit}  method="POST"  className="w-full flex flex-col gap-3">
            <span className="w-md max-lg:w-full font-semibold">Email</span>
            <input className="w-md max-lg:w-full p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="email" type="email" defaultValue={user ? user.email : undefined} required />
            <span className="w-md max-lg:w-full font-semibold">Nom</span>
            <input className="w-md max-lg:w-full p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="nom" type="text" defaultValue={user ? user.nom : undefined} required />
            <span className="text-red-500 text-sm font-medium w-md">{error.pseudo}</span>
            
            <button className="w-30 my-4 cursor-pointer overflow-hidden py-3 text-white rounded-xl flex items-center justify-center font-semibold 
            relative before:w-full  before:h-full before:bg-black before:absolute  before:z-2 before:top-0 before:left-0
            transition delay-150 duration-300  before:transition-all  before:delay-155  before:duration-400 hover:text-black hover:before:top-15 
            ">
            <span className="text-xl z-2">Modifier</span>
            </button>
        </form>
    </div>
  )
}
