import logo from './logo.svg';
import './App.css';
import {Route, Routes } from "react-router-dom";
import ContactMe from "./components/contactMe/ContactMe";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ContactMe />} />
        </Routes>
    )
}

export default App;
