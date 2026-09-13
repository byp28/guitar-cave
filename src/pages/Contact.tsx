import { useEffect } from "react";


export default function Contact({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
    

    useEffect(()=>{
        document.title = "Contact"
        toggleNavBar(true)
    },[])


  return (
    <div className="w-full px-10 max-lg:px-5 py-15 min-h-screen flex flex-col gap-12">
        <h4 className="text-6xl max-lg:text-5xl font-semibold">Contact</h4>
        <section className="w-full flex items-center justify-center">
            <form className="w-md max-lg:w-full flex flex-col gap-2" action="">
                <span>Email</span>
                <input type="email" className="w-full px-1 py-2 border-2 rounded-2xl outline-0" required />
                <span>Sujet</span>
                <input type="text" className="w-full px-1 py-2 border-2 rounded-2xl outline-0" required />
                <span>Message</span>
                <textarea rows={5} className="w-full px-1 py-2 border-2 rounded-2xl outline-0" required />
                <span className="w-full rounded-2xl flex justify-center items-center bg-black text-white font-semibold cursor-pointer hover:bg-neutral-900">
                    Envoyer
                </span>
            </form>
        </section>
    </div>
  )
}
