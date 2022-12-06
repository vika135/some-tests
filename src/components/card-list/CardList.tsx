import "./CardList.css";
import Card from "../card/Card";
import {CardModel} from "../../models/card.model";
import {HttpServer} from "../../services/http";
import {useEffect, useState} from "react";
import {FADE_OUT_ANIMATION_TIME} from "../../const/shared.constants";
import {CircularProgress} from "@mui/material";

export default function CardList() {
    const [cards, setCards] = useState<CardModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getCards = HttpServer<CardModel[]>().getAll;

    useEffect(() => {
        setIsLoading(true);
        getCards("cards").then(data => {
            setCards(data);
            setIsLoading(false)
        });
    }, []);

    const onNewCardCreated = (card: CardModel) => {
        setCards([...cards, card]);
    }

    const onDeleteCard = (id: number) => {
        setTimeout(() => setCards([...(cards.filter(card => card.id !== id))]), FADE_OUT_ANIMATION_TIME);
    }

    const cardsView = () => {
        return (
            <>
                {cards.map((card: CardModel) =>
                    <Card
                        key={card.title}
                        card={card}
                        type="regular"
                        cardDeleted={onDeleteCard}
                    />)}
                <Card newCardAdded={onNewCardCreated} type="add"/>
            </>
        )
    }

    const spinner = () => {
        return (
            <CircularProgress color="inherit"/>
        )
    }

    return (
        <ul className="CardList">
            {cards && !isLoading ? cardsView() : spinner()}
        </ul>
    );
}
