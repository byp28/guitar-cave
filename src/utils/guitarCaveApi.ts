import axios from "axios";

export type TServerResponse = {
  message : string,
  code : number
}

export type TCategorie = {
    id? : number,
    designation : string,
    img : string,
    imgFile? : File
}

export type TAvisPayloads = {
  data : string,
  id_user : number,
  id_product : number,
}

export type TAddress = {
  id : number,
  code : number,
  number : number,
  rue : string,
  country : string,
  ville : string,
  complement : string,
}

export type TAddressPayloads = {
  postal : number,
  number : number,
  rue : string,
  country : string,
  ville : string,
  complement : string,
}

export type TCommande = {
  id : number,
  date_cmd : string,
  status : string,
  CommandeNumber : string
}

export type TProductInCommande = {
  id : number,
  quantity : number,
  productID : number,
  nom : string,
  price : number,
  image : string
}

export type TCompleteCommande = {
  commande : TCommande,
  product : TProductInCommande[]
}

export type TCommandePayloads = {
  user_id : number,
}

export type TCommandeProductPayloads = {
  product_id : number,
  qte : number
}


export type TComment = {
  id: number,
  contenu: string,
  likes: number,
  dislikes: number,
  nom: string,
  userId: number
}

export type TCommentUser = {
  id: number,
  contenu: string,
  likes: number,
  dislikes: number,
  nom: string,
  userId: number,
  pname :string,
  image : string,
  productId : number
}

export type TUser = {
  id? : number,
  nom : string,
  email : string,
  password : string,
  type?: string
}

export type TUserPayloads = {
  nom : string,
  email : string,
}

export type TUserPasswordPayloads = {
  password : string,
  newPassword : string,
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

export type TProductEconomy = {
  id : number,
  nom : string,
  categorie : string,
  sousCategorie : string,
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

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token") as string);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getUser = () => api.get("/product");
export const createUser = (newUser: TUser) => api.post("/user", newUser);
export const updateUser = (newUser: TUserPayloads, id:number) => api.post("/user/"+id, newUser);
export const updateUserPassword = (newUser: TUserPasswordPayloads, id:number) => api.post("/user/"+id+"/password", newUser);
export const deleteUSer = (id:number) => api.post(`/product/${id}/delete`);
export const loginUser = (user: TLogin) => api.post("/auth/login", user);
export const passport = () => api.post("/auth/passport");
export const getAddressByUserId = (id:number) => api.get("/user/"+id+"/adresse");
export const createAddress = (newAddress: TAddressPayloads,id:number) => api.post("/user/"+id+"/adresse", newAddress);
export const updateAddress = (newAddress: TAddressPayloads, id:number) => api.post("/user/adresse/"+id, newAddress);

export const getProducts = () => api.get("/product");
export const getProductsByName = (name: string) => api.get("/product/"+name);
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

export const getComment = () => api.get("/avis");
export const getCommentByProduct = (id:number) => api.post("/avis/product/"+id);
export const getCommentByUser = (id:number) => api.post("/avis/user/"+id);
export const createComment = (newComment: TAvisPayloads) => api.post("/avis", newComment);
export const updateComment = (newComment: {data:string}, id:number) => api.post("/avis/"+id, newComment);
export const deleteComment = (id:number) => api.post(`/avis/${id}/delete`);

export const getCommande = () => api.get("/commande");
export const getCommandeByUserId = (id : number) => api.get("/commande/"+id+"/user");
export const createCommande = (newCommande: TCommandePayloads) => api.post("/commande", newCommande);
export const addProductInCommande = (newProduct: TCommandeProductPayloads, id:number) => api.post("/commande/"+id+"/add", newProduct);
