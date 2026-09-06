

export default function EditStats({setNewStat, baseText} : {setNewStat :(e:string)=>void, baseText: string}) {

    const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNewStat(e.target.value)
    }
  return (
    <>
        <span>Modifier le status de la commande</span>
        <input className="w-full px-3 py-2 border-black border-2 rounded-xl" type="text" onChange={onChangeStatus} defaultValue={baseText} />
    </>
    
  )
}
