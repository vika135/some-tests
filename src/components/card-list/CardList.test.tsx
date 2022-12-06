import {render, screen, within} from "@testing-library/react";
import CardList from "./CardList";
import {cardsListResponse, mockFetch} from "../../mock/mockFetch";
import React from "react";

beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
    jest.restoreAllMocks()
});

test('card list is loaded', async () => {
    render(<CardList />);
    const cards = await screen.findAllByRole("listitem");
    expect(cards).toHaveLength(2);
    cards.forEach((card: HTMLElement, idx: number) => {
        expect(within(card).getByRole("heading")).toHaveTextContent(cardsListResponse[idx].title)
    })
});