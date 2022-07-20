import React, { useState, useEffect } from 'react'
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
    const [state, setState] = useState([{ code: "console.log();", language: "Javascript", name: "JS Snippet" }, { code: "console.log();", language: "Typescript", name: "Typescript Snippet" }])
    const [snippet, setSnippet] = useState({ code: "", language: "", name: "" })
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const [isEditable, setisEditable] = useState(true)


    useEffect(() => {
        getSnippets();
    }, [])

    const handleChange = (e) => {
        setShowError(false)
        const [name, value] = [e.target.name, e.target.value]
        setSnippet({ ...snippet, [name]: value })
    }

    useEffect(() => {

    }, [snippet])

    useEffect(() => {

    }, [state])



    const handleSubmit = () => {
        if (snippetIsValid(snippet)) {
            //TODO implement adding the snippet to the side menu
            postSnippet()
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
        setisEditable(false)
        setSnippet({ ...state[index] })
    }

    const postSnippet = () => {
        api.post('/api/users/1/snippets', {
            user_id: '1',
            ...snippet,
        })
            .then((response) => {
                getSnippets()
            })
    }


    const getSnippets = () => {
        api.get(`/api/users/1/snippets/`)
            .then((response) => {
                if (response && response.status === 200) {

                    setState([...response.data])
                }
            }).catch((err) => {
                setError({ message: err.message })
                setShowError(true)
            })
    }

    const clearForm = () => {
        setSnippet({ code: "", language: "", name: "" })
    }

    const deleteSnippet = () => {
        api.delete(`/api/users/1/snippets/${snippet.id}`)
            .then((response) => {
                if (response && response.status === 200) {
                    getSnippets()
                }
            })

    }


    return (
        <div className="tile is-ancestor mt-5">
            <div className="tile is-3 is-parent pt-0 is-vertical mx-3">
                <button className='button is-success' onClick={clearForm}>New</button>
                <div className='tile is-child box px-0'>

                    {
                        (state.length === 0) ?
                            <div>
                                You have no snippets yet
                            </div>
                            :
                            state.map((snippet, index) => (
                                <div key={index} className="level p-3 m-0 cursor hover" onClick={() => { handleClick(index) }}>
                                    <div className="level-left">
                                        <div className="level-item">
                                            <p className="mr-1">{languageIcons[snippet.language]}</p>
                                            <p className="ml-1">{snippet.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                    <div>

                    </div>
                </div>
            </div>
            <div className="tile is-7 is-vertical mx-3 ">


                {

                    (showError) ?
                        <div class="notification is-danger">
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
                            <input name="name" className="input" type="text" placeholder="snippet name" onChange={handleChange} value={snippet.name} />
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
                                    <button className='button is-danger' onClick={deleteSnippet}>Delete</button>
                                </div>) :
                                <div></div>
                        }
                    </div>



                </div>

            </div>
        </div>
    )
}

export default Home