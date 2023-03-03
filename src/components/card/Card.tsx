import "./Card.css";
import {memo, useContext, useEffect, useMemo, useState} from "react";
import {HttpServer} from "../../services/http";
import {Link, useParams} from "react-router-dom";
import {ActionTypes} from "../../store/actions";
import {CardsDispatch, CardsState} from "../../store/CardsContextProvider";
import {CardModel} from "../../models/card.model";
import {CircularProgress} from "@mui/material";

export default memo(function Card({card, style}: Record<string, any>) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    // const [card, setCard] = useState<CardModel>({} as CardModel);

    const { id } = useParams();

    const dispatch = useContext(CardsDispatch);
    const state = useContext(CardsState);

    // useEffect(() => {
    //     const fetchCard = async () => HttpServer<CardModel>().get("cards", +(id as string))
    //
    //     cardProp = cardProp || state?.items?.find(card => card.id === +(id as string))
    //     cardProp ? setCard(cardProp) : fetchCard().then(c => setCard(c))
    // }, [])

    const onDeleteClick = (_: Object) => {
        HttpServer().remove("cards", card.id).then(_ => {
            dispatch({type: ActionTypes.DELETE, payload: card.id})
            setIsDeleted(true);
        })
    }

    console.log(`Card ${card?.title} is re-rendering`)

    return (
        card ? <li style={style} className={`card card-regular ${isDeleted ? "deleted" : ""}`}>
            <span onClick={onDeleteClick}>x</span>
            <h2>{card.title}</h2>
            <div>{card.description}</div>
            <Link to={`/cards/${card.id}`}>go to this card page</Link>
        </li> : <CircularProgress/>
    )
})
