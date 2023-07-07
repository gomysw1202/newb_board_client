import axios from "axios";

const axiosInstance = axios.create({baseURL:"http://localhost:8080"});


axiosInstance.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("login-token") != null) {
            config.headers["Authorization"] = localStorage.getItem("login-token");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    async (config) => {
        return config;
    },
    async (err) => {
        if (err.response.status === 401) {
            localStorage.removeItem("login-token");
            document.location = "/login?token=reset";
        }else {
            const error = err.response.data
            if (!error.success) {
                alert(error.errorMessage);
            }
        }
        return Promise.reject(err);
    }
    
);

export default axiosInstance;
