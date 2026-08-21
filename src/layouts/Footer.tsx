import { FaFacebookF, FaInstagram, FaLinkedinIn, FaThreads, FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div className='w-full bg-neutral-800 text-white'>
      <div className="bg-neutral-800 w-full flex flex-col gap-6 px-40 max-lg:px-10 py-15">
        <span className="text-base font-semibold">Ne manquez aucune actualité, inscrivez-vous à notre newsletter</span>
        <div className="flex gap-8 max-lg:flex-col">
          <div className="w-md border max-lg:w-full border-white px-4 py-2">
            <input type="email" className="w-full outline-0" placeholder="Email" />
          </div>
          <span className="px-4 py-2 max-lg:w-40 font-semibold bg-white text-black rounded-xs hover:rounded-md cursor-pointer transition-discrete delay-150 duration-300">
            Je m'abonne
          </span>
        </div>

      </div>
      <div className="w-full flex flex-col bg-black px-40 max-lg:px-5 py-25">
        <div className="w-full flex justify-between max-lg:flex-col max-lg:gap-25">
          <div className="flex flex-col max-lg:items-center gap-6">
            <Link to={"/"} className="flex items-center justify-center text-5xl font-semibold italic">Guitar<span className="text-[#FF0022]">Cave</span></Link>
            <div className="flex gap-4">
              <span className="w-10 h-10 flex items-center text-black text-center bg-white rounded-full"><FaFacebookF className="w-full h-6"/></span>
              <span className="w-10 h-10 flex items-center text-black text-center bg-white rounded-full"><FaThreads className="w-full h-6" /></span>
              <span className="w-10 h-10 flex items-center text-black text-center bg-white rounded-full"><FaXTwitter className="w-full h-6" /></span>
              <span className="w-10 h-10 flex items-center text-black text-center bg-white rounded-full"><FaInstagram className="w-full h-6" /></span>
            </div>
          </div>
          <div className="flex flex-col h-30 max-lg:h-auto max-lg:gap-6 max-lg:w-full max-lg:items-center flex-wrap gap-x-40 gap-4">
            <Link className="font-semibold " to={'/'}>Accueil</Link>
            <Link className="font-semibold " to={'/categorie'}>Catégorie</Link>
            <Link className="font-semibold " to={'/'}>Service</Link>
            <Link className="font-semibold " to={'/'}>Contact</Link>
            <Link className="font-semibold " to={"/login"}>Se connecter</Link>
            <Link className="font-semibold " to={"/register"}>Créer un compte</Link>
          </div>
          <div className="flex gap-4 w-30 flex-wrap  justify-end max-lg:w-full max-lg:flex-col-reverse max-lg:justify-center max-lg:items-center">
            <div className="flex gap-4 max-lg:py-10">
                <span className="w-10 h-10 flex items-center text-black text-center bg-white rounded-full"><IoLogoGithub className="w-full h-6"/></span>
                <span className="w-10 h-10 flex items-center text-black text-center bg-white rounded-full"><FaLinkedinIn className="w-full h-6" /></span>
            </div>
            <Link className="font-semibold  " to={'/'}>Mention Légal</Link>
          </div>
        </div>
        <span></span>
      </div>
    </div>
  )
}
