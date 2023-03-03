import {CardModel} from "../models/card.model";

export enum ActionTypes {
    PUSH = "PUSH",
    DELETE = "DELETE",
    LOAD = "LOAD",
    SET = "SET",
}

type PushAction = {
    type: ActionTypes.PUSH;
    payload: CardModel
}

type DeleteAction = {
    type: ActionTypes.DELETE,
    payload: number
}

type LoadAction = {
    type: ActionTypes.LOAD,
}

type SetAction = {
    type: ActionTypes.SET,
    payload: CardModel[],
}

export type StateAction = PushAction | DeleteAction | LoadAction | SetAction;