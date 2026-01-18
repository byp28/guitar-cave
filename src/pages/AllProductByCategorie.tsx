import Card from "../components/Card";


export default function AllProductByCategorie() {
  return (
    <div className="w-full  flex flex-col gap-12">
        <div className="w-full bg-gray-200 flex px-10 items-center justify-center py-10">
            <h4>Name</h4>
        </div>
        <div className="w-full px-20  flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-1/4 max-lg:hidden max-lg:w-full pr-5 border-r-2 border-r-gray-300 flex flex-col gap-2">
                <span className="text-lg font-semibold">Filtrer par :</span>
                <select name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="name">Nom de A-Z</option>
                </select>
                <span className="text-lg font-semibold">Echelle de prix :</span>
                <span className="w-full flex items-center justify-between gap-2">
                    <input name="min" className="p-2  w-1/2 border-2 text-md outline-0 border-gray-400" type="number" />
                    <hr className="w-5" />
                    <input name="max" className="p-2 w-1/2 border-2 text-md outline-0 border-gray-400" type="number" />
                </span>
                <span className="text-lg font-semibold">Categorie :</span>
                <select name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="name">Nom de A-Z</option>
                </select>
                <span className="text-lg font-semibold">Sous - categorie :</span>
                <select name="filter" className="p-2 border-2 text-md outline-0 rounded-lg border-gray-400" id="fliter">
                    <option value="name">Nom de A-Z</option>
                </select>
            </div>
            <div className="w-3/4 max-lg:w-full flex justify-between flex-wrap gap-y-8">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    </div>
  )
}
