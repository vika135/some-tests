import "./CardList.css";
import Card from "../card/Card";
import {useContext} from "react";
import {CircularProgress} from "@mui/material";
import NewCardForm from "../new-card-form/NewCardForm";
import {CardsDispatch, CardsState} from "../../store/CardsContextProvider";
import {ActionTypes} from "../../store/actions";

export default function CardList() {
    const state = useContext(CardsState);
    const dispatch = useContext(CardsDispatch);

    if(!state.items.length) {
        dispatch({type: ActionTypes.LOAD})
    }

    const cardsView = () => {
        return (
            <div className="CardList">
                {state.items.map(card => <Card key={card.id} card={card}/>)}
                {/*<FixedSizeList*/}
                {/*    useIsScrolling={true}*/}
                {/*    itemData={cards}*/}
                {/*    innerElementType="ul"*/}
                {/*    itemCount={cards.length}*/}
                {/*    itemSize={160}*/}
                {/*    height={320}*/}
                {/*    width={'100%'}*/}
                {/*    className="inner-card-list"*/}
                {/*>*/}
                {/*    {({ data, index, style, isScrolling }) => {*/}
                {/*        return (*/}
                {/*            isScrolling ? <Skeleton style={style} /> :*/}
                {/*            <Card*/}
                {/*                style={style}*/}
                {/*                key={data[index].id}*/}
                {/*                card={data[index]}*/}
                {/*                cardDeleted={onDeleteCard}*/}
                {/*            />*/}
                {/*        );*/}
                {/*    }}*/}
                {/*</FixedSizeList>*/}
                <NewCardForm/>
            </div>
        )
    }

    console.log(`CardList is re-rendering`)

    return (
        state.items ? cardsView() : <CircularProgress color="inherit"/>
    );
}
