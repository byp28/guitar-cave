import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Card() {
  return (
    <div className="w-3xs flex flex-col gap-2">
        <div className="w-full h-90 flex items-center justify-center cursor-pointer relative">
            <img src="./assets/img/16871577_800.jpg" className="h-full" alt="j" />
            <div className="w-10 h-10 flex justify-center items-center bg-rose-500 absolute top-0 left-0"><MdFavoriteBorder className="w-5 h-5 text-white" /></div>
            <div className={`w-10 h-10 flex justify-center items-center bg-green-500 absolute bottom-0 right-0`}><MdAddShoppingCart className="w-5 h-5 text-white" /></div>
        </div>
        <span className="text-2xs font-light">Guitar - guitar electrique</span>
        <Link to={"/"} className="font-semibold text-lg hover:text-blue-300">Harley Benton HWY-25BKS Progressive Series</Link>
        <span className="text-2xl font-semibold flex justify-end">999€</span>
    </div>
  )
}
