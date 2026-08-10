import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"
import { useEffect, useState } from "react"
import { getCommentByUser, type TComment, type TCommentUser } from "../../utils/guitarCaveApi"
import Loading from "../../components/Loading"
import ProductAndComments from "../../components/ProductAndComments"

export type TProductComment = {
    id : number,
    nom : string,
    image : string,
    comments : TComment[]
}

export default function ClientComment() {
    const {user} = useSelector((state : TReducer) => state.user.data)
    const [comments, setComments] = useState<TProductComment[]>([])
    const [loading, setLoading] = useState(false)

    const fetchComments = async ()=>{
        setLoading(true)
        try{
            const commentData = await getCommentByUser(user?.id as number)

            if(commentData.status === 200){
                setComments(filterComment(commentData.data as TCommentUser[]))
                setLoading(false)
            }
        }catch(e){
            console.log(e)
        }
    }

    const filterComment = (array : TCommentUser[]) : TProductComment[] =>{
        if(array.length === 0){
            return []
        }
        const id : number[] = []
        const allcomment : TProductComment[] = []

        array.map((c)=>{
            if(!id.find((i)=> i === c.productId)){
                id.push(c.productId)
            }
        })

        id.map((i)=>{
            const selectComment = array.filter((c)=> c.productId === i)
            let newComment : TProductComment = {
                id : i,
                nom : selectComment[0].pname,
                image : selectComment[0].image,
                comments : []
            }

            selectComment.map((c)=>{
                let comm : TComment = {
                    id : c.id,
                    contenu: c.contenu,
                    likes: c.likes,
                    dislikes: c.dislikes,
                    nom: c.nom,
                    userId: c.userId
                } 

                newComment.comments.push(comm)
            })

            allcomment.push(newComment)
        })

        return allcomment

    }



    useEffect(()=>{
        fetchComments()
    },[])

    if(loading){
        return <Loading/>
    }

  return (
    <div className='w-4/5 min-h-screen  px-10  flex flex-col gap-10'>
        <span className="text-5xl font-semibold">Mes Avis</span>
        <div className="w-full flex flex-col gap-14">
            {
                comments.length === 0 
                ? 
                    <span className="font-semibold w-full text-center text-2xl">Vous n'avez pas encore laissé d'avis</span>
                :
                    comments.map((c,key)=>(
                        <ProductAndComments key={key} productComments={c} refresh={()=> fetchComments()} />
                    ))
            }
        </div>
    </div>
  )
}
