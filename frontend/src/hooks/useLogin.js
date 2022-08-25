
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";
import useSession from './useSession';
import api from '../axios/api'

export const useLogin = () => {
    const { getSession, setSession } = useSession()

    const navigate = useNavigate()

    const login = (credentials) => {
        api.get('/sanctum/csrf-cookie').then(response => {
            // Login...
            api.post('api/login', {
                ...credentials
            }).then((res) => {
                console.log(res)
                if (res && res.statusText === 'OK') {
                    setSession(res.data.user)
                    navigate("../", { replace: true });
                }

            })
                .catch((err) => {
                    console.log("Login failed")
                })
        });
    }

    return { login }
}