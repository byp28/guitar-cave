import { useSelector } from "react-redux";
import Comment from "./Comment";
import type { TReducer } from "../Store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment, getCommentByProduct, type TAvisPayloads, type TComment } from "../utils/guitarCaveApi";

export default function AvisSection({id}:{id:number}) {
    const {user,connected} = useSelector((state : TReducer) => state.user.data)
    const [comments, setComments] = useState<TComment[]>([])
    const [commentText, setCommentText] = useState<string>("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const value = e.target.value
        setCommentText(value)
    }

    const fetchComment = async ()=>{
        const dataComments = await getCommentByProduct(id)
        if(dataComments.status === 200){
            setComments(dataComments.data)
            console.log(comments)
        }
    }

    const submitComment = async ()=>{
        if(!connected){
            navigate('/login')
            return
        }

        const newAvis : TAvisPayloads = {
            data : commentText,
            id_user : user?.id as number,
            id_product : id
        } 

        try{
            const sendComment = await createComment(newAvis);
            if(sendComment.status === 201){
                setCommentText("")
                fetchComment()
            }
        }catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        fetchComment()
    },[id])

  return (
    <>
        <h4 className="text-4xl font-semibold">Laissez un commentaire</h4>
        <textarea onChange={handleChange} value={commentText} name="comment" id="comment" className="w-full h-40 border border-gray-600 rounded-lg p-2 outline-0" placeholder="Laissez un commentaire"></textarea>
        <button onClick={()=> submitComment()} className="bg-black text-white flex justify-center items-center w-30 h-10 rounded-md cursor-pointer hover:border hover:border-black hover:text-black hover:bg-white">Poster</button>
        <h4 className="text-4xl font-semibold">Commentaire</h4>
        <div className="w-full flex flex-col gap-4">
            {
                comments.length === 0 
                ? 
                <span className="w-full text-3xl text-center my-10">Soyez le premier à donner votre avis sur ce produit</span>
                :
                comments.map((com,key)=>(
                    <Comment key={key} com={com} refresh={()=> fetchComment()}/>
                ))
            }
        </div>
    </>
  )
}
