import React, { useState } from 'react'
import api from '../axios/api'


const Login = () => {
    const [credentials, setCredentials] = useState({ password: '', email: '' })

    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value]
        setCredentials({ ...credentials, [name]: value })
    }


    const handleSubmit = () => {
        api.get('/sanctum/csrf-cookie').then(response => {
            // Login...
            api.post('api/login', {
                ...credentials
            }).then((res) => {
                console.log(res)
                
            })
                .catch((err) => {
                    console.log("Login failed")
                })
        });

    }
    return (
        <>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} value={credentials.email} />
            <label htmlFor="password">password</label>
            <input type="password" name="password" onChange={handleChange} value={credentials.password} />
            <button onClick={handleSubmit}>Login</button>

        </>
    )
}


export default Login