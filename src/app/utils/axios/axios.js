import axios from "axios";

console.log(`process.env.NEXT_APP_PUBLIC_BASE_URL`, process.env.NEXT_PUBLIC_BASE_URL);
const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,

});
export default Api;