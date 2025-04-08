import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import EditPage from "./Components/EditPage";
import ContentContext from "./Components/ContentContext.jsx";
import Login from "./Components/Login.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";

export default function App() {
    return(
        <ContentContext>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/edit" element={<PrivateRoute><EditPage /></PrivateRoute>} />
                </Routes>
            </Router>
        </ContentContext>
    );
}