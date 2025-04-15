import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    let baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            navigate("/edit");
        }
    }, [navigate]);

    const handleLogin = async () => {
        const response = await fetch(`${baseUrl}/Auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            const expiresAt = Date.now() + 4 * 60 * 60 * 1000;
            localStorage.setItem("jwtExpires", expiresAt.toString());

            setTimeout(() => {
                localStorage.removeItem("jwt");
                navigate("/login");
            },   60 * 60 * 1000);
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
        <div className="text-stone-50 flex flex-col h-screen items-center justify-center">
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