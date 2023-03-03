import './App.css';
import CardList from "./components/card-list/CardList";
import {Route, Routes} from "react-router-dom";
import Card from "./components/card/Card";

function App() {
    return (
        <>
            <h1>Cards Crud</h1>
            <Routes>
                <Route path="/cards/:id" element={<Card/>}></Route>
                <Route path="/" element={<CardList/>}></Route>
            </Routes>
        </>
    );
}

export default App;
