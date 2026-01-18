
import CategorieCard from "../components/CategorieCard";


export default function AllCategorie() {
  return (
    <div className="w-full  flex flex-col gap-12">
        <div className="w-full bg-gray-200 flex px-10 items-center justify-center py-10">
            <h4>Name</h4>
        </div>
        <div className="w-full p-20  flex gap-4 justify-between max-lg:flex-col max-lg:justify-normal max-lg:gap-8">
            <div className="w-full max-lg:w-full flex justify-between flex-wrap gap-y-8">
                <CategorieCard/>
            </div>
        </div>
    </div>
  )
}
