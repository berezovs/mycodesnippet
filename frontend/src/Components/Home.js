import React, { useState, useEffect } from 'react'
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import useSession from '../hooks/useSession';
import Logout from './Logo'
import 'bulma/css/bulma.css'
import useIcons from '../hooks/useIcons';
import Editor from './Editor'
import api from '../axios/api'



const iconSize = 24;
const languages = ['C++', 'Java', 'Javascript', 'C#', 'PHP', 'HTML', 'CSS', 'Python', 'Kotlin', 'Typescript',]




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

    const { getSession, setSession } = useSession()
    const { languageIcons } = useIcons()

    useEffect(() => {

        const fetchUser = async () => {
            const session = await getSession()
            if (session) {
                setUserId(session.id)
            }
            else {
                navigate("../login", { replace: true });
            }
        }
        fetchUser()


    }, [])

    useEffect(() => {
        if (userId) {
            getSnippets(userId)
        }

    }, [userId])

    const handleChange = (e) => {
        setShowError(false)
        const [name, value] = [e.target.name, e.target.value]
        console.log(value)
        setSnippet({ ...snippet, [name]: value })
    }


    const handleSubmit = () => {
        if (snippetIsValid(snippet)) {
            //TODO implement adding the snippet to the side menu
            postSnippet(userId)
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
                setSnippet({ name: "", code: "", language: "" })
                setShowNewSnippetForm(false)
                getSnippets(id)
                setSaveButtonLoading(false)
                setIsReadonly(true)
            })
    }


    const getSnippets = (id) => {

        const url = `/api/users/${userId}/snippets/`
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
                    setSession(null)
                    navigate("../login", { replace: true })
                    setShowError(true)
                })
        })

    }

    const updateSnippet = () => {
        const url = `/api/users/${userId}/snippets/${snippet.id}`
        console.log(snippet)
        api.put(url, {
            id: userId,
            ...snippet
        })
            .then((res) => {
                if (res && res.status === 200) {
                    getSnippets(userId)
                    setShowChangesButtonGroup(false)
                    clearForm()
                }
            })
            .catch((error) => {

            })
    }

    const clearForm = (id) => {
        setSnippet({ code: "", language: "", name: "" })
    }

    const deleteSnippet = () => {
        const url = `/api/users/${userId}/snippets/${snippet.id}`
        //console.log(snippet, url)
        api.delete(url)
            .then((response) => {
                if (response && response.status === 200) {
                    getSnippets(userId)
                    setShowConfirmDeleteButton(false)
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
                                            <input type="text" className="input is-small is-focused ml-4" name="name" onChange={handleChange} defaultValue={snippet.name} />
                                            :
                                            <p className="pl-4 has-text-white">{snippet.name}</p>
                                    }

                                </div>
                                {
                                    (snippetHovered > -1 && snippetHovered === index && !showConfirmDeleteButton && !showSaveChangesButtonGroup) ?
                                        <div className='is-flex'>
                                            <button className='button is-small is-warning mr-2' onClick={() => { setShowChangesButtonGroup(true); setIsReadonly(false) }}>Edit</button>
                                            <button className='button is-small is-danger' onClick={() => { setShowConfirmDeleteButton(true); }}>Delete</button>
                                        </div>
                                        :
                                        <div className="is-hidden"></div>
                                }
                                {
                                    (showSaveChangesButtonGroup && index === selectedSnippetIndex) ?
                                        <div className="is-flex">
                                            <button className='button is-small is-success mr-2' onClick={() => { updateSnippet() }}>Save</button>
                                            <button className='button is-small is-danger' onClick={() => { setShowChangesButtonGroup(false); setIsReadonly(true) }}>Cancel</button>
                                        </div>
                                        :
                                        <div className="is-hidden"></div>

                                }
                                {
                                    (showConfirmDeleteButton && index === selectedSnippetIndex) ?
                                        <div className="is-flex">
                                            <button className="button is-small is-success mr-2" onClick={() => { deleteSnippet() }}>Confirm</button>
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
    </>
    )
}

export default Home