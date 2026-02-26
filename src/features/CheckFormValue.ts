export type TCheck = {
    error? : string,
    check : boolean
}

export const checkPassword = (a : string, b : string) : TCheck=>{
    if(a !== b){
      return {
        check : false,
        error : "Veuillez confirmer votre mot de passe"
      }
    }
    return {
        check : true
    }
}

export const checkLengthPassword = (p : string) : TCheck =>{
    if(p.length <7){
        return {
            check : false,
            error : "Mot de passe trop court"
        }
    }
    
    return {
        check : true,
    }
}

export const checkName = (p:string)=>{
    if(p == " " || p == "  "){
       return {
            check : false,
            error : "Nom non autorisé"
        } 
    }
    
    return {
        check : true,
    }
}