import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div className="w-full px-6 py-4 border-b border-b-gray-900 flex flex-col gap-6 justify-center items-center">
        <div className="flex w-full justify-between items-center">
            <div className="flex gap-4 w-1/3">
                <Link to={'/'}>A propos</Link>
                <Link to={'/'}>Service</Link>
                <Link to={'/'}>Contact</Link>
            </div>
            <h1 className="w-1/3 flex items-center justify-center">GuitarCave</h1>
            <div className="flex gap-4 w-1/3 justify-end items-center">
                <Link to={'/'}>Accueil</Link>
                <Link to={'/'}>Promo</Link>
                <Link to={'/'}>S'incrire</Link>
                <Link to={'/'}>Se connecter</Link>
            </div>
        </div>
        <div className="items-center flex w-full justify-center">
            <input type="text" placeholder="Recherche" className="w-1/4 bg-gray-300 h-xs p-2 rounded-xl outline-0 text-center" />
        </div>
    </div>
  )
}
