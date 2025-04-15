import { useEffect, useState } from "react";
import ListedCards from "./ListedCards.jsx";
import ListedContent from "./ListedContent.jsx";
import ListedEmails from "./ListedEmails.jsx";

export default function ListModel({content}) {
    const [elements, setElements] = useState([]);
    const [url, setUrl] = useState("");
    let baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if(content === "Card"){
            setUrl(`${baseUrl}/Card/GetCards`)
        } else if(content === "Content"){
            setUrl(`${baseUrl}/Content/GetContent`)
        } else if(content === "Email"){
            setUrl(`${baseUrl}/Email/GetEmails`)
        }
    }, [content])


    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            const jsonData = await response.json();
            setElements(jsonData);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url])

    return (
        <div>
            <ul>
                {elements && elements.map(element => (
                    content === "Card" && <ListedCards key={element.id} {...element}/> ||
                    content === "Content" && <ListedContent key={element.id} {...element}/> ||
                    content === "Email" && <ListedEmails key={element.id} {...element}/>
                ))}
            </ul>
        </div>
    )
}