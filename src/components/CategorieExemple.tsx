

export default function CategorieExemple({img, name} : {img : string, name :string}) {
  return (
    <div className="w-3xs border-2 border-gray-100 rounded-lg flex p-4 items-center justify-center flex-col gap-4 cursor-pointer hover:border-4">
        <div className="w-full flex items-center justify-center h-60">
          <img className="h-full" src={`${import.meta.env.VITE_API_ADRESS}/img/categorie/${img}`} alt={img} />
        </div>
        <span className="text-lg text-center font-semibold">{name}</span>
    </div>
   
  )
}
