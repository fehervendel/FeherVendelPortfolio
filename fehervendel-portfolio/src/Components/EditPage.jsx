import { useEffect, useState} from "react";
import ListModel from "./ListModel.jsx";
import {useNavigate} from "react-router-dom";

export default function EditPage() {
    const [models, setModels] = useState([]);
    const [rightContent, setRightContent] = useState("");
    const navigate = useNavigate();
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const fetchModels = async () => {
        try {
            const response = await fetch("https://localhost:7217/Model/GetModels", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            const jsonData = await response.json();
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

    const handleUploadClick = () => {
        setIsUploadClicked(prevState => !prevState);
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            setUploadStatus("❌ Only pdf allowed.");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("❌ No selected file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch("https://localhost:7217/resume/ChangeResume", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setUploadStatus("✅ Upload Successful.");
            } else {
                setUploadStatus("❌ Error uploading file.");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setUploadStatus("❌ Server Error.");
        }
    };

    return (
        <div className="text-stone-50 container px-8 pt-16 text-xl">
            <div className="flex gap-16">
                <aside className="flex-1/4 h-full bg-stone-800 rounded-2xl px-4 pt-8 pb-0">
                    <ul>
                        {models.map((model, index) => (
                            <li className="pb-8" key={index}><button onClick={(e) => handleSubmit(e, model.substring(17))} className="!bg-transparent hover:!border-stone-50">{model.substring(17) + "s"}</button></li>
                        ))}
                        <li className="pb-8"><button onClick={handleUploadClick} className="!bg-transparent hover:!border-stone-50">Upload resume</button></li>
                        {isUploadClicked && <div>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:border-0 mb-4"/>
                            <button
                                onClick={handleUpload}
                                className="!bg-stone-50 text-stone-950 px-4 py-2 rounded transition me-2 mb-4">Upload</button>
                            {uploadStatus && <span className="text-sm text-yellow-400">{uploadStatus}</span>}
                        </div>}
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