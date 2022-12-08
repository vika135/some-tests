import "./CardList.css";
import Card from "../card/Card";
import {CardModel} from "../../models/card.model";
import {HttpServer} from "../../services/http";
import {useCallback, useEffect, useState} from "react";
import {FADE_OUT_ANIMATION_TIME} from "../../const/shared.constants";
import {CircularProgress} from "@mui/material";
import NewCardForm from "../new-card-form/NewCardForm";

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

    const onNewCardCreated = useCallback((card: CardModel) => setCards(prev => [...prev, card]), []);

    const onDeleteCard = useCallback((id: number) =>
        setTimeout(() => setCards(prev => prev.filter(item => item.id !== id)), FADE_OUT_ANIMATION_TIME), []);

    const cardsView = () => {
        return (
            <>
                {cards.map((card: CardModel) =>
                    <Card
                        key={card.id}
                        card={card}
                        cardDeleted={onDeleteCard}
                    />)}
                <NewCardForm newCardAdded={onNewCardCreated}/>
            </>
        )
    }

    const spinner = () => {
        return (
            <CircularProgress color="inherit"/>
        )
    }

    console.log(`cardlist is rerendering`)

    return (
        <ul className="CardList">
            {cards && !isLoading ? cardsView() : spinner()}
        </ul>
    );
}
