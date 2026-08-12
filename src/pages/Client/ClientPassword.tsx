import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useState } from "react"
import {  updateUserPassword, type TServerResponse, type TUserPasswordPayloads} from "../../utils/guitarCaveApi"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router-dom"
import { checkLengthPassword, checkPassword } from "../../features/CheckFormValue"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"


export default function ClientPassword() {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const [loading, setLoading] = useState(false)
    const [togglePassword, setTogglePassword] = useState(true)
    const [toggleNPassword, setToggleNPassword] = useState(true)
    const [toggleCPassword, setToggleCPassword] = useState(true)
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
        let Cpassword = formDataObj.get("Cpassword") as string
        const newPassword : TUserPasswordPayloads = {
            password : formDataObj.get("password") as string,
            newPassword : formDataObj.get("Npassword") as string,
        }

        setLoading(true)

        if(!checkLengthPassword(newPassword.newPassword)?.check){
            setLoading(false)
            setError({...error,
                  mdp : checkLengthPassword(newPassword.newPassword)?.error as string
                })
                return
            }else{
                 setError({...error,
                  mdp : ""
            })
        }

        if(!checkPassword(newPassword.newPassword, Cpassword)?.check){
            setLoading(false)
            setError({...error,
                mdp : checkPassword(newPassword.newPassword, Cpassword)?.error as string
            })
                return
            }else{
                 setError({...error,
                  mdp : ""
            })
        }
        
        try{
            const ChangePassword = await updateUserPassword(newPassword,user?.id as number);
            console.log(ChangePassword)
            if(ChangePassword.status === 200){
                const res = ChangePassword.data  as TServerResponse
                if(res.code === 404){
                    setError({...error,
                        mdp : res.message
                    })
                    setLoading(false)
                }else{
                    localStorage.removeItem("token")
                    navigate("/login")
                }
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
    <div className='w-4/5 min-h-screen  px-10  flex flex-col gap-10'>
        <span className="text-5xl font-semibold">Changer de mot de passe</span>
        <form onSubmit={handleSubmit}  method="POST"  className="w-full flex flex-col gap-3">
            <span className="w-md font-semibold">Mot de passe actuel</span>
            <div className="w-md py-2 px-4 text-md border-2 border-gray-400 flex items-center gap-4 justify-between rounded-lg">
                <input className="outline-0 w-full" name="password" type={togglePassword ? "password" : "text"} required />
                <span>
                    {
                    togglePassword 
                    ? <IoEyeOutline onClick={()=> setTogglePassword(!togglePassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
                    : <IoEyeOffOutline onClick={()=> setTogglePassword(!togglePassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
                    }
                </span>
            </div>
            <span className="w-md font-semibold">Nouveau mot de passe</span>
            <div className="w-md py-2 px-4 text-md border-2 border-gray-400 flex items-center gap-4 justify-between rounded-lg">
                <input className="outline-0 w-full" name="Npassword" type={toggleNPassword ? "password" : "text"} required />
                <span>
                    {
                    toggleNPassword 
                    ? <IoEyeOutline onClick={()=> setToggleNPassword(!toggleNPassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
                    : <IoEyeOffOutline onClick={()=> setToggleNPassword(!toggleNPassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
                    }
                </span>
            </div>
            <span className="w-md font-semibold">Confirmer le nouveau mot de passe</span>
            <div className="w-md py-2 px-4 text-md border-2 border-gray-400 flex items-center gap-4 justify-between rounded-lg">
                <input className="outline-0 w-full" name="Cpassword" type={toggleCPassword ? "password" : "text"} required />
                <span>
                    {
                    toggleCPassword 
                    ? <IoEyeOutline onClick={()=> setToggleCPassword(!toggleCPassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
                    : <IoEyeOffOutline onClick={()=> setToggleCPassword(!toggleCPassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
                    }
                </span>
            </div>
            <span className="text-red-500 text-sm font-medium w-md">{error.mdp}</span>
            
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
