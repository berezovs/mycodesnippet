import React from 'react'
import api from '../axios/api'
const Logout = () =>{

 const logout = () => {
    api.get('/sanctum/csrf-cookie').then(response => {
        // Login...
        api.post('api/logout', {
            
        }).then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log("Logout failed")
        })
    });
 }
    return(
        <>
            <button onClick={logout}>Logout</button>
        </>
    )
}
export default Logout