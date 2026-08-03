import { useSelector } from "react-redux"
import type { TReducer } from "../../Store"


export default function HomeClient() {
    const {user,connected} = useSelector((state : TReducer) => state.user.data)

  return (
    <div className='w-4/5 min-h-screen  px-10 overflow-y-auto flex flex-col gap-10'>
        <span className="text-5xl font-semibold">Aperçu</span>
        <div className="flex flex-col w-full justify-end items-end gap-1">
            <span className="text-2xl font-semibold">{user?.nom}</span>
            <span className="text-base">{user?.email}</span>
        </div>
    </div>
  )
}
