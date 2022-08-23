import React from 'react'
import Logout from './Logout'

const Logo = ({ showLogout = false }) => {
    return (
        <>
            <div className="columns background-midnight is-vcentered py-3 px-5 my-0">
                <div className="column">
                    <h2 className='title has-text-white logo'>MyCodeSnippet</h2>
                </div>
                <div className='column has-text-right-tablet'>
                    {
                        (showLogout) ?  <Logout /> : <div></div>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Logo