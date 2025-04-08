import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            navigate("/edit");
        }
    }, [navigate]);

    const handleLogin = async () => {
        const response = await fetch("https://localhost:7217/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            navigate("/edit");
        } else {
            alert("Wrong authenticator code!");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="text-stone-50 flex flex-col h-screen flex flex-col items-center justify-center">
                <input
                    className="text-stone-50 p-4 text-2xl text-center"
                    type="number"
                    placeholder="Authenticator code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="!bg-transparent mt-6 !text-2xl" onClick={handleLogin}>Login</button>
        </div>
    )
}