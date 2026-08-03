import { enc } from "crypto-js";
import AES from "crypto-js/aes";
//import dotenv from "dotenv";

//dotenv.config({ path: "../../.env" });
const secretKey = import.meta.env.VITE_HASH_KEY;
export const encrypt = (value: string) => {
  return AES.encrypt(value, secretKey).toString();
};

export const decrypt = (value: string) => {
  const inf = AES.decrypt(value, secretKey).toString(enc.Utf8)
  return inf;
};