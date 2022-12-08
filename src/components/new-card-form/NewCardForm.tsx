import "../card/Card.css";
import {Button, CircularProgress, TextField} from "@mui/material";
import {HttpServer} from "../../services/http";
import {memo, useState} from "react";

type CardForm = Record<string, string>;

export default memo(function NewCardForm({newCardAdded}: Record<string, any>) {
    const [form, setForm] = useState<CardForm>({});
    const [loading, setIsLoading] = useState<boolean>(false);

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

    const onSubmit = () => {
        if(Object.keys(form).length === inputs.length && Object.values(form).every(e => e)) {
            setIsLoading(true);
            HttpServer<CardForm>().post("cards", form).then(newCard => {
                newCardAdded(newCard)
                setIsLoading(false);
            })
        }
    }

    const handleInputChange = (event: Object) => {
        const target = (event as Event)?.target as HTMLInputElement;
        setForm({
            ...form,
            [target?.name]: target?.value,
        })
    }

    console.log("form is rerendering")

    return (
        <form className="card card-add">
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
        </form>
    )
})