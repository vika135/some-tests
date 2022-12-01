import "./CardList.css";
import Card from "../card/Card";
import {CardModel} from "../../models/card.model";
import {HttpServer} from "../../services/http";
import {useEffect, useState} from "react";
import {FADE_OUT_ANIMATION_TIME, LOADING_DELAY} from "../../const/shared.constants";
import {CircularProgress} from "@mui/material";

export default function CardList() {
    const [cards, setCards] = useState<CardModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getCards = () => HttpServer<CardModel[]>().get("cards");

    useEffect(() => {
        setIsLoading(true);
        getCards().then(data => {
            setCards(data);
            setTimeout(() => {
                setIsLoading(false)
            }, LOADING_DELAY);
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
            <div className={`${cards && isLoading ? "spinner-fade-out" : ""}`}><CircularProgress color="inherit"/></div>
        )
    }

    return (
        <div className="CardList">
            {cards && !isLoading ? cardsView() : spinner()}
        </div>
    );
}
