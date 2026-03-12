import axios from "axios";

export type TCategorie = {
    id? : number,
    designation : string,
    img : string,
    imgFile? : File
}


const api = axios.create({
  // URL de base de l'API Laravel (à ajuster selon votre configuration)
  baseURL: `${import.meta.env.VITE_API_ADRESS}/api`,

  // Headers par défaut
  headers: {

    "Content-Type": "application/json",
    "Accept": "application/json",
    //"Content-Type": "multipart/form-data",
  },

  // Timeout de 10 secondes pour les requêtes
  timeout: 70000,
});



export const getCategorie = () => api.get("/categorie");
export const deleteCategorie = (id:number) => api.post(`/categorie/${id}/delete`);
export const createCategorie = (newCategorie: TCategorie) => api.post("/categorie", newCategorie);