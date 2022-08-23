import api from '../axios/api'
import { ReactSession } from 'react-client-session'

export const useLogout = () => {
    const logout = () => {

        return new Promise((resolve, reject) => {
            api.get('/sanctum/csrf-cookie').then(response => {
                // Login...
                api.post('api/logout', {

                }).then((res) => {
                    console.log(res)
                    ReactSession.set("mycodesnippetUser", null)

                    resolve(res)
                })
                    .catch((err) => {
                        return reject({ message: "Logout failed" })

                    })
            });
        })

    }


    return { logout }
}