import React from 'react'
import api from '../axios/api'
import { useLogout } from '../hooks/useLogout'

import { useNavigate } from 'react-router-dom'


const Logout = () => {

    const navigate = useNavigate()
    const { logout } = useLogout()

    const handleSubmit = () => {
        logout()
            .then((res) => {
                navigate("../login")
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <> 
            <a className="has-text-white is-size-5 cursor" onClick={handleSubmit}>Logout</a>
        </>
    )
}
export default Logout