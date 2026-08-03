import { ImStarFull } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlDislike, SlLike, SlPencil } from "react-icons/sl";
import { deleteComment, updateComment, type TComment } from "../utils/guitarCaveApi";
import { useSelector } from "react-redux";
import type { TReducer } from "../Store";
import { useState } from "react";


export default function Comment({com, refresh} : {com:TComment, refresh : ()=> void}) {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const [updateMode, setUpdateMode] = useState(false)
    const [data, setData] = useState<string>(com.contenu)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const value = e.target.value
        setData(value)
    }

    const submitComment = async ()=>{
        const ncom = {
            data : data
        }

        try{
            const uptComment = await updateComment(ncom, com.id)
            if(uptComment.status === 201){
                setUpdateMode(false)
                refresh()
            }
        }catch(e){
            console.log(e)
        }
    }

    const deleteCom = async ()=>{
        try{
            const comDeleted = await deleteComment(com.id)
            if(comDeleted.status === 200){
                refresh()
            }
        }catch(e){
            console.log(e)
        }

    }

  return (
    <div className='w-full py-4 flex flex-col gap-8 bg-white'>
        <div className='flex gap-4 items-center'>
            <div className='w-18 h-18 bg-blue-500 text-3xl text-white rounded-full flex items-center justify-center'>
                {com.nom[0].toUpperCase()}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-2xl">{com.nom}</span>
                <span className="flex gap-1">
                    <ImStarFull className="h-4 w-4" />
                    <ImStarFull className="h-4 w-4" />
                    <ImStarFull className="h-4 w-4" />
                </span>
            </div>
            
        </div>
        <div className="w-full">
            {
                updateMode 
                ?
                <textarea onChange={handleChange} value={data} name="comment" id="comment" className="w-full h-40 border border-gray-600 rounded-lg p-2 outline-0" placeholder="modifiez votre commentaire"></textarea>
                :
                <p>{com.contenu}</p>
            }
            
        </div>
        {
            updateMode
            ?
                <div className="w-full flex gap-6">
                    <button onClick={()=> submitComment()} className="bg-black text-white flex justify-center items-center w-30 h-10 rounded-md cursor-pointer hover:border hover:border-black hover:text-black hover:bg-white">Modifier</button>
                    <button onClick={()=> setUpdateMode(false)} className="bg-black text-white flex justify-center items-center w-30 h-10 rounded-md cursor-pointer hover:border hover:border-black hover:text-black hover:bg-white">Annuler</button>
                </div>
            :
            <div className="w-full flex gap-6">
                <span className="flex gap-3 items-center"><SlLike  className="w-5 h-5 cursor-pointer hover:text-blue-500" />{com.likes}</span>
                <span className="flex gap-3 items-center"><SlDislike  className="w-5 h-5 cursor-pointer hover:text-red-500" />{com.dislikes}</span>
                {com.userId === user?.id && <SlPencil onClick={()=> setUpdateMode(true)} className="w-6 h-6 cursor-pointer hover:text-red-500"/>}
                {com.userId === user?.id && <RiDeleteBin6Line onClick={()=> deleteCom()} className="w-6 h-6 cursor-pointer hover:text-red-500"/>}
            </div>
        }

    </div>
  )
}
