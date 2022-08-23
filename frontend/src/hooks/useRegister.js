import api from '../axios/api'

export const useRegister = () => {
    const register = (credentials) => {
        api.get('/sanctum/csrf-cookie').then(response => {
            // Login...
            api.post('api/register', {
                ...credentials
            }).then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log("Registration failed")
            })
        });
        
        
    }

    return {register}
}