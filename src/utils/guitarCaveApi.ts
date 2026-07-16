import axios from "axios";

export type TCategorie = {
    id? : number,
    designation : string,
    img : string,
    imgFile? : File
}

export type TUser = {
  id? : number,
  nom : string,
  email : string,
  password : string,
  type?: string
}

export type TLogin = {
  email : string,
  password : string,
}

export type TProduct = {
  id ? : number,
  nom : string,
  price : number,
  description : string,
  description_technique : string,
  id_categorie? : number,
  id_sous_categorie? : number,
  image : string,
  categorie? : string,
  sousCategorie? : string,
  imgFile? : File
}

export type TSousCategorie = {
    id? : number,
    designation : string,
    id_categorie : number,
    img : string,
    categorie? : string,
    imgFile? : File
}

const api = axios.create({
  // URL de base de l'API Laravel (à ajuster selon votre configuration)
  baseURL: `${import.meta.env.VITE_API_ADRESS}/api`,

  // Headers par défaut
  headers: {
    //"Content-Type": "application/json",
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    //"Content-Type": "multipart/form-data",
  },

  // Timeout de 10 secondes pour les requêtes
  timeout: 70000,
});


export const getUser = () => api.get("/product");
export const createUser = (newUser: TUser) => api.post("/user", newUser);
export const updateUser = (newProduct: TProduct, id:number) => api.post("/product/"+id, newProduct);
export const deleteUSer = (id:number) => api.post(`/product/${id}/delete`);
export const loginUser = (user: TLogin) => api.post("/auth/login", user);

export const getProducts = () => api.get("/product");
export const createProduct = (newProduct: TProduct) => api.post("/product", newProduct);
export const updateProduct = (newProduct: TProduct, id:number) => api.post("/product/"+id, newProduct);
export const deleteProduct = (id:number) => api.post(`/product/${id}/delete`);

export const getCategorie = () => api.get("/categorie");
export const deleteCategorie = (id:number) => api.post(`/categorie/${id}/delete`);
export const createCategorie = (newCategorie: TCategorie) => api.post("/categorie", newCategorie);
export const updateCategorie = (newCategorie: TCategorie, id:number) => api.post("/categorie/"+id, newCategorie);


export const getSousCategorie = () => api.get("/subCategorie");
export const deleteSousCategorie = (id:number) => api.post(`/subCategorie/${id}/delete`);
export const createSousCategorie = (newSubCategorie: TSousCategorie) => api.post("/subCategorie", newSubCategorie);
export const updateSousCategorie = (newSubCategorie: TSousCategorie, id:number) => api.post("/subCategorie/"+id, newSubCategorie);