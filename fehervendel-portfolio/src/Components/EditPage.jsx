import { useEffect, useState} from "react";
import ListModel from "./ListModel.jsx";

export default function EditPage() {
    const [models, setModels] = useState([]);
    const [rightContent, setRightContent] = useState("");

    const fetchModels = async () => {
        try {
            const response = await fetch("https://localhost:7217/Model/GetModels", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            const jsonData = await response.json().then();
            setModels(jsonData);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchModels();
    }, [])

    const handleSubmit = (e, model) => {
            setRightContent(model);
    }

    return (
        <div className="text-stone-50 container px-8 pt-16 text-xl">
            <div className="flex gap-16">
                <aside className="flex-1/4 h-full bg-stone-800 rounded-2xl px-4 pt-8 pb-0">
                    <ul>
                        {models.map((model, index) => (
                            <li className="pb-8" key={index}><button onClick={(e) => handleSubmit(e, model.substring(17))} className="!bg-transparent">{model.substring(17) + "s"}</button></li>
                        ))}
                    </ul>
                </aside>
                <div className="flex-3/4">
                    { rightContent === "" ? "Choose a model!" : <ListModel content={rightContent} /> }
                </div>
            </div>

        </div>
    )
}