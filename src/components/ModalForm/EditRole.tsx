

export default function EditRole({setNewStat} : {setNewStat :(e:string)=>void}) {

    const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>)=>{
      console.log(e.target.value)
      setNewStat(e.target.value)
    }
  return (
    <>
        <span>Modifier le rôle de l'utilistateur</span>
        <select className="px-2 py-3 border-2 rounded-xl outline-0" onChange={onChangeStatus}>
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
        </select>
    </>
    
  )
}
