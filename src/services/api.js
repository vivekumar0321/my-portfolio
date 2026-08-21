import axios from "axios";

const api = axios.create({
    baseURL: "https://api.web3forms.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;