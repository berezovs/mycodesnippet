import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost',
})

api.defaults.withCredentials = true

api.interceptors.response.use(
    res=>res,
    error=>{
        if(error.response.status>=400){
            error.message = "An error occured"
            return Promise.reject(error)
        }
    }
)

export default api