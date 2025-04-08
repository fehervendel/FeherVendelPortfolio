import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import EditPage from "./Components/EditPage";
import ContentContext from "./Components/ContentContext.jsx";

export default function App() {
    return(
        <ContentContext>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/edit" element={<EditPage />} />
                </Routes>
            </Router>
        </ContentContext>
    );
}