import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister';
import Logo from './Logo'



const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const { register } = useRegister()


    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value]
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = () => {
        register(credentials)
    }
    return (
        <>
            <Logo />
            <div className="columns mx-2 mt-6">

                <div className="column is-4 is-offset-4 box">
                    <div className="title is-4 has-text-centered">Register</div>
                    <div className="field">
                        <label className="label" htmlFor="name">Name</label>
                        <div className="control">
                            <input type="text" className="input" name="name" onChange={handleChange} value={credentials.name} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="email">Email</label>
                        <div className="control">
                            <input type="email" className='input' name="email" onChange={handleChange} value={credentials.email} />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label' htmlFor="password">Password</label>
                        <div className='control'>
                            <input type="password" className='input' name="password" onChange={handleChange} value={credentials.password} />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label' htmlFor="password">Confirm password</label>
                        <div className='control'>
                            <input type="password" className='input' name="password" onChange={handleChange} value={credentials.password} />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <span>Have an account? </span>
                            <Link to='/login'>Log in</Link>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-success" onClick={handleSubmit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>







        </>
    )
}

export default Register