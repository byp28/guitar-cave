import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductIndex from "./ProductIndex";
import EditProduct from "./EditProduct";
import type { TProduct } from "../../../utils/guitarCaveApi";


export default function ProductManage() {
  const [action, setAction] = useState("index")
  const [product, setProduct] = useState<TProduct|null>(null)

  const selectProductID = (prod : TProduct)=>{
    setProduct(prod)
  }
  
    const changeAction = (newAction : string)=>{
      setAction(newAction)
    }
  return (
    <div className='w-4/5 max-lg:w-full max-lg:overflow-visible max-lg:py-8 max-lg:px-5 min-h-screen py-14 px-18 overflow-y-auto flex flex-col gap-10'>
        {action ==="index" && <ProductIndex changeAction={changeAction} selectProductID={selectProductID}/>}
        {action ==="create" && <CreateProduct changeAction={changeAction}  />}
        {action === "edit" && <EditProduct changeAction={changeAction} oldProduct={product as TProduct} />}
    </div>
  )
}
