

export default function Register() {
  return (
    <div className="w-full h-140 p-4 gap-2 flex items-center justify-center flex-col">
        <h4 className="py-8 w-md text-5xl">Créer un Compte</h4>
        <span className="w-md font-semibold">Pseudo</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="pseudo" type="text" required />
        <span className="w-md font-semibold">Email</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="email" type="mail" required />
        <span className="w-md font-semibold">Mot de passe</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="password" type="password" required />
        <span className="w-md font-semibold">Confirmation du mot de passe</span>
        <input className="w-md p-2 text-md border-2 border-gray-400 outline-0 rounded-lg" name="cmd" type="password" required />
        <button className="w-md my-4 cursor-pointer bg-black py-3 rounded-full flex items-center justify-center font-semibold text-xl text-white">s'inscrire</button>
    </div>
  )
}
