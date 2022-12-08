import "./Card.css";
import {memo, useMemo, useState} from "react";
import {HttpServer} from "../../services/http";


export default memo(function Card({card, cardDeleted}: Record<string, any>) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    card = useMemo(() => card, [card?.id]);

    const onDeleteClick = (_: Object) => {
        HttpServer().remove("cards", card.id).then(_ => {
            cardDeleted(card.id);
            setIsDeleted(true);
        })
    }

    console.log(`card ${card?.title} is rerendering`)

    return (
        <li className={`card card-regular ${isDeleted ? "deleted" : ""}`}>
            <span onClick={onDeleteClick}>x</span>
            <h2>{card.title}</h2>
            <div>{card.description}</div>
        </li>
    )
})
