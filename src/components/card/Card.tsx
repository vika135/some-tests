import "./Card.css";
import {memo, useMemo, useState} from "react";
import {HttpServer} from "../../services/http";


export default memo(function Card({card, cardDeleted}: Record<string, any>) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);

    const memoizedCard = useMemo(() => card, [card?.id]);

    const onDeleteClick = (_: Object) => {
        setIsLoading(true);
        HttpServer().remove("cards", card.id).then(_ => {
            cardDeleted(card.id);
            setIsDeleted(true);
            setIsLoading(false);
        })
    }

    console.log(`card ${card?.title} is rerendering`)

    return (
        <li className={`card card-regular ${isDeleted ? "deleted" : ""}`}>
            <span onClick={onDeleteClick}>x</span>
            <h2>{memoizedCard.title}</h2>
            <div>{memoizedCard.description}</div>
        </li>
    )
})
