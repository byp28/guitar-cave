import { useEffect } from "react";


export default function Mention({toggleNavBar} : {toggleNavBar : (toggle:boolean)=> void}) {
    

    useEffect(()=>{
        document.title = "Mention Légal"
        toggleNavBar(true)
    },[])


  return (
    <div className="w-full px-10 max-lg:px-5 py-15 min-h-screen flex flex-col gap-12">
        <h4 className="text-6xl max-lg:text-5xl font-semibold">Mention Légal</h4>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Propriété intellectuelle</h4>
            <p>
                L’ensemble des éléments présents sur ce site, notamment les textes, images, photographies, logos, graphismes, vidéos, icônes et éléments de conception, est protégé par les dispositions relatives à la propriété intellectuelle.
                Sauf mention contraire, ces éléments sont la propriété exclusive de GuitarCave. Toute reproduction, représentation, modification, adaptation ou utilisation, totale ou partielle, de ces contenus sans autorisation préalable est interdite.
                Toute utilisation non autorisée des contenus du site pourra faire l’objet de poursuites conformément aux dispositions légales applicables.
            </p>
        </section>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Responsabilité</h4>
            <p>
                GuitarCave s’efforce de fournir sur ce site des informations aussi précises et à jour que possible. Toutefois, nous ne pouvons garantir l’exactitude, l’exhaustivité ou l’actualité de l’ensemble des informations publiées.
                L’entreprise ne saurait être tenue responsable des éventuelles erreurs, omissions ou indisponibilités temporaires du site, ni des conséquences pouvant résulter de l’utilisation des informations qui y sont présentées.
                Les liens éventuellement présents vers des sites externes sont proposés à titre informatif. GuitarCave n’exerce aucun contrôle sur ces sites et ne peut être tenue responsable de leur contenu.
            </p>
        </section>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Données personnelles</h4>
            <p>
                Dans le cadre de l’utilisation du site, certaines données personnelles peuvent être collectées, notamment lorsque vous utilisez un formulaire de contact, demandez un renseignement ou passez une commande.
                Ces données sont utilisées uniquement pour répondre à vos demandes, assurer la gestion de la relation client et, lorsque cela est nécessaire, permettre le traitement de vos commandes.
                Conformément à la réglementation applicable en matière de protection des données personnelles, notamment le **Règlement Général sur la Protection des Données (RGPD)**, vous disposez de droits concernant vos données personnelles, notamment un droit d’accès, de rectification, d’effacement et, dans certaines conditions, d’opposition ou de limitation du traitement.
                Pour toute question relative au traitement de vos données personnelles, vous pouvez nous contacter à l’adresse suivante : Contact@guitar.fr
            </p>
        </section>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Cookies</h4>
            <p>
                Le site peut utiliser des cookies ou technologies similaires afin d’assurer son bon fonctionnement, d’améliorer l’expérience utilisateur et, le cas échéant, de mesurer l’audience du site.
                Lorsque cela est requis par la réglementation, votre consentement sera recueilli avant le dépôt de cookies non nécessaires au fonctionnement du site.
                Vous pouvez à tout moment modifier vos préférences concernant les cookies depuis les paramètres prévus à cet effet sur le site.
            </p>
        </section>
        <section className="w-full flex flex-col gap-4">
            <h4 className="text-4xl max-lg:text-5xl font-semibold">Droit applicable</h4>
            <p>
                Les présentes mentions légales sont soumises au droit français.
                En cas de litige, les parties rechercheront en priorité une solution amiable. À défaut, les juridictions compétentes seront celles désignées conformément aux règles de droit applicables.
            </p>
        </section>
        
    </div>
  )
}
