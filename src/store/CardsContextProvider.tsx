import {reducer} from "./reducers";
import {State} from "./state";
import {createContext, Dispatch, useCallback, useReducer} from "react";
import {ActionTypes, StateAction} from "./actions";
import {CardModel} from "../models/card.model";
import {HttpServer} from "../services/http";

export const CardsDispatch = createContext<Dispatch<StateAction>>({} as unknown as Dispatch<StateAction>);
export const CardsState = createContext<State>({items: []});

export function CardsContextProvider({children}: Record<string, any>) {
    const initialState: State = {items: []};
    let [state, dispatch] = useReducer(reducer, initialState);

    const asyncDispatch = useCallback(async (action: StateAction) => {
        switch (action.type) {
            case ActionTypes.LOAD: {
                const cards: CardModel[] = await HttpServer<CardModel[]>().getAll("cards");
                dispatch({
                    type: ActionTypes.SET,
                    payload: cards
                });
                break;
            }
            default:
                dispatch(action);
        }
    }, []);

    return (
        <CardsDispatch.Provider value={asyncDispatch}>
            <CardsState.Provider value={state}>
                {children}
            </CardsState.Provider>
        </CardsDispatch.Provider>
    );
}