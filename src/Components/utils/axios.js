import axios from "axios";
let apiURL = "https://foodie-backend-rvs.herokuapp.com/home";
let token = localStorage.getItem("user");
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://foodie-backend-rvs.herokuapp.com/home';
const myaxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    authorization: `${token}`,
  },
});

export default myaxios;
