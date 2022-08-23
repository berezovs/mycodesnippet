import React, { useState, useEffect } from 'react'
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import Logout from './Logo'
import 'bulma/css/bulma.css'
import {
    SiJavascript,
    SiJava,
    SiTypescript,
    SiCplusplus,
    SiPython,
    SiCss3,
    SiHtml5,
    SiCsharp,
    SiPhp,
    SiKotlin
} from "react-icons/si";
import Editor from './Editor'
import api from '../axios/api'



const iconSize = 24;
const languages = ['C++', 'Java', 'Javascript', 'C#', 'PHP', 'HTML', 'CSS', 'Python', 'Kotlin', 'Typescript',]
const languageIcons = {
    'Javascript': <SiJavascript size={iconSize} color={'purple'} />,
    'Java': <SiJava size={iconSize} color={'purple'} />,
    'C++': <SiCplusplus size={iconSize} color={'purple'} />,
    'C#': <SiCsharp size={iconSize} color={'purple'} />,
    'PHP': <SiPhp size={iconSize} color={'purple'} />,
    'HTML': <SiHtml5 size={iconSize} color={'purple'} />,
    'CSS': <SiCss3 size={iconSize} color={'purple'} />,
    'Python': <SiPython size={iconSize} color={'purple'} />,
    'Kotlin': <SiKotlin size={iconSize} color={'purple'} />,
    'Typescript': <SiTypescript size={iconSize} color={'purple'} />
}



const Home = () => {
    const [state, setState] = useState([{ code: "", language: "", name: "" }])
    const [snippet, setSnippet] = useState({ code: "", language: "", name: "" })
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const [isReadonly, setIsReadonly] = useState(true)
    const navigate = useNavigate()
    const [userId, setUserId] = useState("")
    const [snippetHovered, setSnippetHovered] = useState(-1)
    const [showConfirmDeleteButton, setShowConfirmDeleteButton] = useState(false)
    const [showSaveChangesButtonGroup, setShowChangesButtonGroup] = useState(false)
    const [showNewSnippetForm, setShowNewSnippetForm] = useState(false)
    const [selectedSnippetIndex, setSelectedSnippetIndex] = useState(-1)
    const [isSaveButtonLoading, setSaveButtonLoading] = useState(false)



    useEffect(() => {
        const session = ReactSession.get("mycodesnippetUser")
        if (session) {
            setUserId(session.id)
            console.log("Called ", userId)
        }
        else {
            navigate("../login", { replace: true });
        }
    }, [])

    useEffect(() => {

        if (userId) {
            getSnippets(userId)
        }

    }, [userId])

    const handleChange = (e) => {
        setShowError(false)
        const [name, value] = [e.target.name, e.target.value]
        setSnippet({ ...snippet, [name]: value })
    }

    useEffect(() => {
        console.log(snippet)
    }, [snippet])


    const handleSubmit = () => {
        if (snippetIsValid(snippet)) {
            //TODO implement adding the snippet to the side menu
            console.log("Clicked")
            postSnippet(userId)
            // setState([...state, snippet])
            // setSnippet({ code: "", language: "", name: "" })
        }
        else {
            setError({ message: "All fields need to be filled out" })
            setShowError(true)
        }
    }

    const snippetIsValid = (state) => {
        return state.code && state.language && state.name
    }

    const handleClick = (index) => {
        setSnippet({ ...state[index] })
        setSelectedSnippetIndex(index)
    }


    const postSnippet = (id) => {
        setSaveButtonLoading(true)
        api.post(`/api/users/${userId}/snippets`, {
            user_id: id,
            ...snippet,
        })
            .then((response) => {
                setSnippet({ name: "", code: "", laanguage: "" })
                setShowNewSnippetForm(false)
                getSnippets(id)
                setSaveButtonLoading(false)
            })
    }


    const getSnippets = (id) => {

        const url = `/api/users/${userId}/snippets/`
        console.log(url)
        api.get('/sanctum/csrf-cookie').then(response => {
            // Login...
            api.get(url)
                .then((response) => {
                    if (response && response.status === 200) {
                        setShowError(false)
                        setState([...response.data])
                    }
                }).catch((err) => {
                    setError({ message: err.message })
                    ReactSession.set("mycodesnippetUser", null)
                    navigate("../login", { replace: true })
                    setShowError(true)
                })
        })

    }

    const clearForm = (id) => {
        setSnippet({ code: "", language: "", name: "" })
    }

    const deleteSnippet = (id) => {
        api.delete(`/api/users/${id}/snippets/${snippet.id}`)
            .then((response) => {
                if (response && response.status === 200) {
                    getSnippets(id)
                }
            })

    }


    return (<>
        <div className='columns my-0 py-0 is-gapless is-multiline'>
            <div className="column is-full">
                <Logout showLogout={true} />
            </div>
            <div className='column is-4-tablet is-3-widescreen is-3-desktop background-cobalt-light full-height'>
                <div className='is-flex is-justify-content-flex-end px-3 py-3 border-bottom'>
                    <div className=''>
                        <button className={`button is-small ${showNewSnippetForm ? "is-danger" : "is-success"}`} onClick={() => { setShowNewSnippetForm(prev => !prev); setIsReadonly(prev => !prev); setSnippet({ code: "", language: "", name: "" }) }}>
                            {
                                (showNewSnippetForm) ?
                                    "Cancel"
                                    :
                                    "New"
                            }
                        </button>
                    </div>
                </div>
                {
                    (showNewSnippetForm) ?
                        <div className="is-flex is-justify-content-space-between my-4 pb-4 border-bottom">
                            <input className="input is-small ml-3 mr-1" placeholder="snippet name" name="name" onChange={handleChange} value={snippet.name} />
                            <div className="select is-small mx-1">
                                <select name="language" onChange={handleChange} value={snippet.language}>
                                    <option>language</option>
                                    {
                                        languages.sort().map((language, index) =>
                                        (
                                            <option key={index}>{language}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="is-flex is-justify-content-space-between mx-2">
                                <button className={`button is-small is-success mr-1 ${isSaveButtonLoading ? "is-loading" : ""}`} onClick={handleSubmit}>Save</button>
                            </div>
                        </div>
                        :
                        <div></div>
                }
                {
                    (state.length === 0) ?
                        <div>
                            You have no snippets yet
                        </div>
                        :
                        state.map((snippet, index) => (
                            <div key={index} className="px-3 py-2 is-flex is-justify-content-space-between is-clickable" onMouseEnter={() => setSnippetHovered(index)} onMouseLeave={() => setSnippetHovered(-1)} onClick={() => { handleClick(index) }}>
                                <div className='is-flex is-justify-content-space-between'>
                                    <p className="">{languageIcons[snippet.language]}</p>
                                    {

                                        (showSaveChangesButtonGroup && selectedSnippetIndex === index) ?
                                            <input className="input is-small is-focused ml-4" name="name" value={snippet.name} onChange={(e) => handleChange(e)} />
                                            :
                                            <p className="pl-4 has-text-white">{snippet.name}</p>
                                    }

                                </div>
                                {
                                    (snippetHovered > -1 && snippetHovered === index && !showConfirmDeleteButton && !showSaveChangesButtonGroup) ?
                                        <div className='is-flex'>
                                            <button className='button is-small is-warning mr-2' onClick={() => { setShowChangesButtonGroup(true); setIsReadonly(false) }}>Edit</button>
                                            <button className='button is-small is-danger' onClick={() => setShowConfirmDeleteButton(true)}>Delete</button>
                                        </div>
                                        :
                                        <div className="is-hidden"></div>
                                }
                                {
                                    (showSaveChangesButtonGroup && index === selectedSnippetIndex) ?
                                        <div className="is-flex">
                                            <button className='button is-small is-success mr-2'>Save</button>
                                            <button className='button is-small is-danger' onClick={() => { setShowChangesButtonGroup(false); setIsReadonly(true) }}>Cancel</button>
                                        </div>
                                        :
                                        <div className="is-hidden"></div>

                                }
                                {
                                    (showConfirmDeleteButton && index === selectedSnippetIndex) ?
                                        <div className="is-flex">
                                            <button className="button is-small is-success mr-2">Confirm</button>
                                            <button className="button is-small is-danger" onClick={() => setShowConfirmDeleteButton(false)}>Cancel</button>
                                        </div>
                                        :
                                        <div className="is-hidden"></div>

                                }
                            </div>
                        ))
                }
                <div>

                </div>

            </div>
            <div className="column py-0">
                <Editor handleChange={handleChange} snippet={snippet.code} isReadonly={isReadonly} />
            </div>
        </div>

        {/* <div className="tile is-ancestor mt-5">
            <div className="tile is-3 is-parent pt-0 is-vertical mx-3">
                <button className='button is-success' onClick={clearForm}>New</button>
                
            </div>
            <div className="tile is-7 is-vertical mx-3 ">


                {

                    (showError) ?
                        <div className="notification is-danger">
                            {error.message}
                        </div>
                        :
                        <div></div>
                }

                <div className='tile mb-3'>
                    <Editor handleChange={handleChange} snippet={snippet.code} />
                </div>

                <div className='tile is-justify-content-space-between'>


                    <div className='field is-grouped'>
                        <p className='control'>
                            <input name="name" className="input" type="text" placeholder="snippet name"  />
                        </p>
                        <div className='control'>
                            <div className="select">
                                <select name="language" onChange={handleChange} value={snippet.language}>
                                    <option></option>
                                    {
                                        languages.sort().map((language, index) =>
                                        (
                                            <option key={index}>{language}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <p className='control'> <button className="button is-link" onClick={handleSubmit}>
                            Save
                        </button></p>

                        {
                            !isEditable ?
                                (<div className='control'>
                                    <button className='button is-danger' onClick={(e)=>deleteSnippet(userId)}>Delete</button>
                                </div>) :
                                <div></div>
                        }
                    </div>



                </div>

            </div>
        </div> */}

    </>
    )
}

export default Home