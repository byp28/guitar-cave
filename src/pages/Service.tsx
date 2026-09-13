import { useEffect } from "react";


export default function Service({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
    

    useEffect(()=>{
        document.title = "Service"
        toggleNavBar(true)
    },[])


  return (
    <div className="w-full px-10 max-lg:px-5 py-15 min-h-screen flex flex-col gap-12">
        <h4 className="text-6xl max-lg:text-5xl font-semibold">Nos services</h4>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Achat & commande d’instruments</h4>
            <p>
                Choisir un instrument est une étape importante, que vous soyez débutant, musicien confirmé ou professionnel. Nous vous accompagnons dans votre recherche afin de vous aider à trouver l’instrument qui correspond réellement à vos attentes, à votre pratique musicale et à votre budget. Notre objectif est de vous apporter des conseils personnalisés et de vous orienter vers les modèles les plus adaptés à vos besoins, en tenant compte de vos préférences, de votre niveau et de votre style de jeu.
            </p>
            <p>
                Vous recherchez un instrument qui n’est pas disponible en magasin ? Nous pouvons également vous accompagner dans la commande d’instruments et d’accessoires spécifiques. Nous prenons le temps d’échanger avec vous pour comprendre précisément votre demande et vous proposer la meilleure solution. De la sélection du modèle jusqu’à sa réception, nous assurons un suivi attentif de votre commande afin que votre expérience d’achat soit simple, transparente et sereine. Nous privilégions avant tout la qualité du conseil et la satisfaction de chaque musicien.
            </p>
        </section>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Lutherie</h4>
            <p>
                Un instrument de qualité mérite un entretien régulier et des réglages réalisés avec précision. Notre service de lutherie vous accompagne pour préserver les qualités sonores, le confort de jeu et la longévité de votre instrument. Qu’il s’agisse d’un simple réglage, d’un entretien courant, d’une réparation ou d’une intervention plus importante, chaque instrument est pris en charge avec attention et savoir-faire.
            </p>
            <p>
                Parce que chaque instrument possède ses propres caractéristiques, nous adaptons notre intervention à son état, à son utilisation et aux attentes du musicien. Nous pouvons notamment intervenir sur différents aspects liés au confort de jeu, à la justesse, aux réglages et à l’entretien général de l’instrument. Notre approche repose sur la précision, le soin du détail et le respect de l’instrument. L’objectif est de lui permettre de retrouver, lorsque cela est nécessaire, tout son potentiel sonore et toute sa jouabilité, tout en garantissant un travail durable et de qualité.
            </p>
        </section>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Service client</h4>
            <p>Notre relation avec vous ne s’arrête pas au moment de l’achat. Nous attachons une grande importance à la qualité de notre service client et souhaitons vous accompagner dans la durée, avant comme après l’acquisition de votre instrument. Que vous ayez besoin d’un conseil, d’une information complémentaire, d’une assistance concernant votre commande ou d’un accompagnement après votre achat, notre équipe reste disponible pour vous répondre et vous orienter au mieux.</p>
            <p>Nous savons que chaque musicien peut avoir des besoins différents et que certaines questions peuvent apparaître après l’achat d’un instrument. C’est pourquoi nous privilégions une relation basée sur l’écoute, la disponibilité et la confiance. Notre équipe prend le temps de comprendre votre demande afin de vous apporter une réponse claire et personnalisée. Notre engagement : vous accompagner avec sérieux et attention à chaque étape, pour que vous puissiez profiter pleinement de votre instrument et de votre expérience avec nous.</p>
        </section>
    </div>
  )
}
