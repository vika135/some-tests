import {State} from "./state";
import {ActionTypes, StateAction} from "./actions";

export function reducer(state: State, action: StateAction) {
    switch (action.type) {
        case ActionTypes.PUSH:
            return {...state, items: [...state.items, action.payload]};
        case ActionTypes.DELETE:
            return {
                ...state,
                items: [...state.items.filter((item) => item.id !== action.payload)]
            };
        case ActionTypes.SET: {
            return {
                ...state,
                items: action.payload
            }
        }
        default:
            throw new Error("No such action type");
    }
}