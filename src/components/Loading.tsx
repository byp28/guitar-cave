import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <AiOutlineLoading3Quarters className="text-red-500 animate-spin w-25 h-25" width={80} height={80} />
    </div>
  )
}
