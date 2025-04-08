import { createContext, useState, useEffect } from "react";

export const ContentContext = createContext({
    content: []
});

export default function ContentContextProvider({children}){
    const [ contentState, setContentState ] = useState({ content: [] });

    const fetchContent = async () => {
        try {
            const response = await fetch("https://localhost:7217/Content/GetContent", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            const jsonData = await response.json();
            setContentState({content: jsonData});

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [])

    const ctxValue = {
        content: contentState.content,
    }

    return <ContentContext.Provider value={ctxValue}>{children}</ContentContext.Provider>;
}