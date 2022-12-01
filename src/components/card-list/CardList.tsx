import Card from "../card/Card";
import "./CardList.css";

import {CardModel} from "../../models/card.model";
import {HttpServer} from "../../services/http";
import {useEffect, useState} from "react";

export default function CardList() {
    const [cards, setCards] = useState<CardModel[]>([]);
    const getCards = () => HttpServer<CardModel[]>().get("cards");

    useEffect(() => {
        getCards().then(data => setCards(data));
    }, []);

    return (
        <div className="CardList">
            {cards ? cards.map((card: CardModel) => <Card key={card.title} card={card}/>) : null}
        </div>
    );
}