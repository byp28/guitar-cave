import Categorie from "../components/Categorie";
import Banner from "../layouts/Banner";


export default function Home() {
  return (
    <div className="w-full">
        <Banner/>
        <Categorie categorieName="Guitare"/>
        <Categorie categorieName="Micros"/>
        <Categorie categorieName="Basses"/>
        <Categorie categorieName="Accessoires"/>
    </div>
  )
}
