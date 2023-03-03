import "../card/Card.css";
import {Button, CircularProgress, TextField} from "@mui/material";
import {FormEvent, memo, useContext, useState} from "react";
import usePostDataToBackend from "./hooks/usePostDataToBackend.hook";
import {inputs} from "../../const/card-form-config.const";
import {CardsDispatch} from "../../store/CardsContextProvider";
import {ActionTypes} from "../../store/actions";
import {CardModel} from "../../models/card.model";

export default memo(function NewCardForm() {
    const [form, setForm] = useState<CardModel>({} as CardModel);
    const [loading, postData] = usePostDataToBackend<CardModel>();

    const dispatch = useContext(CardsDispatch);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (Object.keys(form).length === inputs.length && Object.values(form).every(e => e)) {
            postData(form).then(newCard => {
                dispatch({type: ActionTypes.PUSH, payload: newCard as CardModel})
                setForm({} as CardModel);
            });
        }
    }

    const handleInputChange = (event: Object) => {
        const target = (event as Event)?.target as HTMLInputElement;
        setForm(prevForm => ({
            ...prevForm,
            [target?.name]: target?.value,
        }))
    }

    console.log("form is re-rendering")

    return (
        <form className="card card-add" onSubmit={onSubmit}>
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
            <Button variant="outlined" type="submit">Create Card</Button>
        </form>
    )
})