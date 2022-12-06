import {CardModel} from "../models/card.model";
import {endpoints} from "../api/endpoints";

export const cardsListResponse: CardModel[] = [
    {
        "title": "cardTitle",
        "description": "cardDescription",
        "id": 1
    },
    {
        "title": "cardTitle1",
        "description": "cardDescription1",
        "id": 2
    },
]

export async function mockFetch(url: URL | RequestInfo, init?: RequestInit | undefined) {
    if(!init) {
        init = { method: "GET" }
    }

    switch (url) {
        case endpoints.list("cards"): {
            return {
                ok: true,
                status: 200,
                json: async () => cardsListResponse,
            } as Response
        }
        case endpoints.item("cards", 0): {
            return {
                ok: true,
                status: 200,
                json: async () => cardsListResponse[0],
            } as Response
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}