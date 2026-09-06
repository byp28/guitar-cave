import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { loginUser, type TLogin } from "../utils/guitarCaveApi"
import { useDispatch } from "react-redux"
import { saveCredentials, type TUserCredentials } from "../features/UserSlice"


export default function Login({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {

    const [loading, setLoading] = useState(false)

    const [togglePassword, setTogglePassword] = useState(true)

    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleSubmit = async (e : React.FormEvent)=>{
      e.preventDefault();
      const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
      const logedUser : TLogin = {
        email : formDataObj.get("email") as string,
        password : formDataObj.get("password") as string,
      }
    
      setLoading(true)
        try{
          const userLogin = await loginUser(logedUser);
          
          if(userLogin.status === 404){
            setLoading(false)
            setError(true)

          }
          else if(userLogin.status === 200){

            let credentials : TUserCredentials = userLogin.data.user
            dispatch(saveCredentials(credentials))
            setLoading(false)
            navigate("/")
          }
          else{
            console.log(userLogin.status)
            setLoading(false)
          }
          
        }catch(error){
          setLoading(false)
          setError(true)
          console.log(error, "er")
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
    <form  onSubmit={handleSubmit} method="POST"  className="w-full h-screen p-8 max-lg:p-5 gap-2 flex items-center justify-center flex-col">
        <h4 className="py-8 w-md max-lg:w-full text-5xl max-lg:text-4xl">Se connecter</h4>
        <span className="w-md max-lg:w-full font-semibold">Email</span>
        <input className="w-md max-lg:w-full p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="email" type="mail" required />
        <span className="w-md max-lg:w-full font-semibold">Mot de passe</span>
        <div className="w-md max-lg:w-full py-2 px-4 text-md border-2 border-gray-400 flex items-center gap-4 justify-between rounded-lg">
          <input className="outline-0 w-full" name="password" type={togglePassword ? "password" : "text"} required />
          <span>
            {
              togglePassword 
              ? <IoEyeOutline onClick={()=> setTogglePassword(!togglePassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
              : <IoEyeOffOutline onClick={()=> setTogglePassword(!togglePassword)} className="w-6 h-6 text-gray-600 cursor-pointer" />
            }
          </span>
        </div>
        {
          error && <span className="text-red-500 font-semibold py-4">Email ou le mot de passe est incorrect</span>
        }
        <button className="w-md max-lg:w-full my-4 cursor-pointer overflow-hidden py-3 text-white rounded-full flex items-center justify-center font-semibold 
        relative before:w-full  before:h-full before:bg-black before:absolute  before:z-2 before:top-0 before:left-0
        transition delay-150 duration-300  before:transition-all  before:delay-155  before:duration-400 hover:text-black hover:before:top-15 
        ">
          <span className="text-xl z-2">Soumettre</span>
        </button>
        <Link to={"/register"} className="w-md max-lg:w-full my-2 p-1 h-13 cursor-pointer overflow-hidden text-black rounded-full flex items-center justify-center font-semibold text-xl 
        relative before:w-full before:rounded-full  before:h-full before:bg-black before:absolute  before:z-2 before:top-0 before:-left-120
        transition delay-150 duration-300  before:transition-all  before:delay-155  before:duration-400 hover:text-black hover:before:left-0
        ">
          
          <span className="text-xl z-2 w-full rounded-full  h-full bg-white flex items-center justify-center">Créer un nouveau compte</span>
        </Link>
    </form>
  )
}
