import { ReactSession } from 'react-client-session'


const useSession = () => {
    ReactSession.setStoreType("localStorage")

    const setSession = (sessionItem) => {
        ReactSession.set("mycodesnippetSession", sessionItem)
    }

    const getSession = () => {
        return ReactSession.get("mycodesnippetSession")
    }

    return {
        setSession,
        getSession
    }


}

export default useSession