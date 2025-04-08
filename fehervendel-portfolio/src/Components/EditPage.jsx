import { useEffect, useState} from "react";
import ListModel from "./ListModel.jsx";
import {useNavigate} from "react-router-dom";

export default function EditPage() {
    const [models, setModels] = useState([]);
    const [rightContent, setRightContent] = useState("");
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        navigate("/login");
    }

    return (
        <div className="text-stone-50 container px-8 pt-16 text-xl">
            <div className="flex gap-16">
                <aside className="flex-1/4 h-full bg-stone-800 rounded-2xl px-4 pt-8 pb-0">
                    <ul>
                        {models.map((model, index) => (
                            <li className="pb-8" key={index}><button onClick={(e) => handleSubmit(e, model.substring(17))} className="!bg-transparent hover:!border-stone-50">{model.substring(17) + "s"}</button></li>
                        ))}
                        <li className="pb-8"><button onClick={handleLogout} className="!bg-transparent text-red-700 hover:!border-red-700">Log out</button></li>
                    </ul>
                </aside>
                <div className="flex-3/4">
                    { rightContent === "" ? "Choose a model!" : <ListModel content={rightContent} /> }
                </div>
            </div>

        </div>
    )
}