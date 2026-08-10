import { Link } from 'react-router-dom'
import type { TProductComment } from '../pages/Client/ClientComment'
import Comment from './Comment'

export default function ProductAndComments({productComments, refresh}:{productComments : TProductComment, refresh : ()=>void}) {


  return (
    <div className='w-full flex flex-col'>
        <div className='w-full py-4 flex items-center flex-wrap '>
            <div className="w-25 h-30 flex justify-center items-center">
                <img src={`${import.meta.env.VITE_API_ADRESS}/img/product/${productComments.image}`} className="h-full" alt={productComments.nom} />
            </div>
            <Link className='text-2xl font-semibold cursor-pointer' to={`/product/${productComments.id}`}>
                {productComments.nom}
            </Link>
        </div>
        <div className='w-full py-8 px-6 border-b-4 border-b-blue-500 flex flex-col gap-y-4 justify-between'>
            {
                productComments.comments.map((c,key)=>(
                    <Comment key={key} com={c}  refresh={()=> refresh()}/>
                ))
            }
        </div>
    </div>
  )
}
