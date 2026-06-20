

export default function CategorieExemple({img, name} : {img : string, name :string}) {
  return (
    <div className="w-80 h-50 bg-gray-200 hover:bg-gray-300  flex px-3 py-6 items-center justify-center flex-col gap-4">
      
        <div className="w-35 h-30 bg-black">
          <img className="object-fill w-full h-full" src={`${import.meta.env.VITE_API_ADRESS}/img/categorie/${img}`} alt={img} />
        </div>
        <span className="text-lg font-semibold">{name}</span>
    </div>
  )
}
