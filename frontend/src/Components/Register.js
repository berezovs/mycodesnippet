import React, { useState, useEffect } from 'react'
import api from '../axios/api'


const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value]
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = () => {
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
    return (
        <>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={handleChange} value={credentials.name}/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} value={credentials.email}/>
            <label htmlFor="password">password</label>
            <input type="password" name="password" onChange={handleChange} value={credentials.password} />
            <button onClick={handleSubmit}>Submit</button>

        </>
    )
}

export default Register