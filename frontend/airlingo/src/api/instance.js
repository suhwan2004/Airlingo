/* eslint-disable */
import axios from "axios";
import store from "@/store";

const { VITE_SERVER_URL } = import.meta.env;

const instance = axios.create({
    baseURL: VITE_SERVER_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": `http://localhost:5173`,
        "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().User.userAccessToken;
        if (config.headers && accessToken) {
            config.headers["access-token"] = `${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // const { response, config } = error;
        /* fix me! : 서버와 교신하여 token refreshing 로직이 들어갈 예정 */
        return Promise.reject(error);
    },
);

export default instance;
