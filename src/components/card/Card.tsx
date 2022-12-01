import "./Card.css";
import {TextField} from "@mui/material";

export default function Card(props: Record<string, any>) {
    const inputs = {
        title: "title",

    }
    const regularCard = () => {
        return (
            <div className="card card-regular">
                <h2>{props.card.title}</h2>
                <div>{props.card.description}</div>
            </div>
        )
    }

    const addCard = () => {
        return (
            <div className="card card-add">
                <TextField
                    label="Title"
                    variant="standard"
                    name="title"
                    type="text"
                    onChange={}
                />
                <TextField
                    label="Body"
                    variant="standard"
                    name="body"
                    type="text"
                    onChange={}
                />
            </div>
        )
    }

    return (
        props.type === "regular" ?  regularCard() : addCard()
    )
}