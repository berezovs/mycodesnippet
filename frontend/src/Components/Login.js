import React, { useEffect, useState } from 'react'
import { ReactSession } from 'react-client-session';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'
import Logo from './Logo'

const Login = () => {
    const [credentials, setCredentials] = useState({ password: '', email: '' })
    const { login } = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
        if (ReactSession.get("mycodesnippetUser")) {
            navigate('../', { replace: true })
        }
    }, [])

    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value]
        setCredentials({ ...credentials, [name]: value })
    }


    const handleSubmit = () => {
        login(credentials)
    }
    return (
        <>
            <Logo />
            <div className="columns mx-2 mt-6">
                <div className='column is-4 is-offset-4 box'>
                    <div className="title is-4 has-text-centered">Log In</div>
                    <div className="field">
                        <label className="label" htmlFor="email">Email</label>
                        <div className="control">
                            <input type="email" className="input" name="email" onChange={handleChange} value={credentials.email} />
                        </div>

                    </div>
                    <div className="field">

                        <label className="label" htmlFor="password">Password</label>
                        <div className="control">
                            <input type="password" className="input" name="password" onChange={handleChange} value={credentials.password} />
                        </div>

                    </div>

                    <div className="field">
                        <div className='control'>
                            <span>Forgot password? </span>
                            <Link to="/forgot-password">Reset password</Link>
                        </div>
                    </div>
                    <div className="field">
                        <div className='control'>
                            <span>Don't have an account? </span>
                            <Link to="/register">Sign up</Link>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={handleSubmit}>Login</button>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}


export default Login