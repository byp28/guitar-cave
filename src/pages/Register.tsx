import {  useEffect, useState } from "react"
import { checkLengthPassword, checkName, checkPassword } from "../features/CheckFormValue";
import { createUser, type TUser } from "../utils/guitarCaveApi";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";


export default function Register({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState({
    pseudo : "",
    email : "",
    mdp : "",
    cmdp : "",
  })

  const handleSubmit = async (e : React.FormEvent)=>{
      e.preventDefault();
      const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
      const newUser : TUser = {
        nom : formDataObj.get("pseudo") as string,
        email : formDataObj.get("email") as string,
        password : formDataObj.get("password") as string,
      }


      if(!checkName(newUser.nom)?.check){
        setError({...error,
          pseudo : checkName(newUser.nom)?.error as string
        })
        return
      }else{
        setError({...error,
          pseudo : ""
        })
      }


      if(!checkLengthPassword(newUser.password)?.check){
        setError({...error,
          mdp : checkLengthPassword(newUser.password)?.error as string
        })
        return
      }else{
         setError({...error,
          mdp : ""
        })
      }

      if(!checkPassword(newUser.password, formDataObj.get("cmd") as string)?.check){
         setError({...error,
          cmdp : checkPassword(newUser.password, formDataObj.get("cmd") as string)?.error as string
        })
        return
      }else{
         setError({...error,
          cmdp : ""
        })
      }

      console.log(error)
      setLoading(true)
    try{
      const userCreate = await createUser(newUser);
              
      if(userCreate.data.code === 201){
        setLoading(false)
        navigate("/")
      }else{
        setLoading(false)
      }
      
    }catch(error){
      console.log(error)
    }

  }

  
  useEffect(()=>{
    toggleNavBar(false)
  },[])


  
  if(loading){
      return (
        <>
          <Loading/>
        </>
      )
    }


  return (
    <form onSubmit={handleSubmit} className="w-full h-screen p-8 gap-2 flex items-center justify-center flex-col">
        <h4 className="py-8 w-md text-5xl">Créer un Compte</h4>
        <span className="w-md font-semibold">Pseudo</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="pseudo" type="text" required />
        <span className="text-red-500 text-sm font-medium w-md">{error.pseudo}</span>
        <span className="w-md font-semibold">Email</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="email" type="email" required />
        <span className="text-red-500 text-sm font-medium w-md">{error.email}</span>
        <span className="w-md font-semibold">Mot de passe</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="password" type="password" required />
        <span className="text-red-500 text-sm font-medium w-md">{error.mdp}</span>
        <span className="w-md font-semibold">Confirmation du mot de passe</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="cmd" type="password" required />
        <span className="text-red-500 text-sm font-medium w-md">{error.cmdp}</span>
        <input type="submit" className="w-md my-4 cursor-pointer bg-black py-3 rounded-full flex items-center justify-center font-semibold text-xl text-white" value={"s'inscrire"}/>
    </form>
  )
}
