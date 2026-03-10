import CreateProduct from "./CreateProduct";
import ProductIndex from "./ProductIndex";

export default function ProductManage() {
  return (
    <div className='w-4/5 min-h-screen py-14 px-18 overflow-y-auto flex flex-col gap-10'>
        {/* <ProductIndex/> */}
        <CreateProduct/>
    </div>
  )
}
