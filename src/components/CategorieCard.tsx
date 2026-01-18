import { Link } from "react-router-dom";


export default function CategorieCard() {
  return (
    <Link to={"/categorie/subCategorie"} className="w-80 bg-gray-200 hover:bg-gray-300  flex px-3 py-6 items-center justify-center flex-col gap-4">
        <div className="w-35 h-30 bg-black">

        </div>
        <span className="text-lg font-semibold">Test</span>
    </Link>
  )
}
