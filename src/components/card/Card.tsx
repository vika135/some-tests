import "./Card.css";
import {Button, CircularProgress, TextField} from "@mui/material";
import {useState} from "react";
import {HttpServer} from "../../services/http";

type CardForm = Record<string, string>;

export default function Card(props: Record<string, any>) {
    const [form, setForm] = useState<CardForm>({});
    const [loading, setIsLoading] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const inputs = [
        {
            name: "title",
            type: "text",
        },
        {
            name: "description",
            type: "text",
        }
    ];

    const regularCard = () => {
        return (
            <div className={`card card-regular ${isDeleted ? "deleted" : ""}`}>
                <span onClick={onDeleteClick}>x</span>
                <h2>{props.card.title}</h2>
                <div>{props.card.description}</div>
            </div>
        )
    }

    const onDeleteClick = (_: Object) => {
        setIsLoading(true);
        HttpServer().remove("cards", props.card.id).then(_ => {
            props.cardDeleted(props.card.id);
            setIsDeleted(true);
            setIsLoading(false);
        })
    }

    const handleInputChange = (event: Object) => {
        const target = (event as Event)?.target as HTMLInputElement;
        setForm({
            ...form,
            [target?.name]: target?.value,
        })
    }

    const onSubmit = () => {
        // todo update validation
        if(Object.keys(form).length === inputs.length && Object.values(form).every(e => e)) {
            setIsLoading(true);
            // todo: for some reason i cant cast form to CardModel. need to think
            HttpServer<CardForm>().post("cards", form).then(newCard => {
                props.newCardAdded(newCard)
                setIsLoading(false);
            })
        }
    }

    const addCard = () => {
        return (
            <div className="card card-add">
                {loading ? <CircularProgress color="inherit" /> : inputs.map(input =>
                    <TextField
                        key={input.name}
                        label={input.name}
                        variant="standard"
                        name={input.name}
                        type={input.type}
                        onChange={handleInputChange}
                    />
                )}
                <Button variant="outlined" onClick={onSubmit}>Create Card</Button>
            </div>
        )
    }

    return (
        props.type === "regular" ?  regularCard() : addCard()
    )
}
