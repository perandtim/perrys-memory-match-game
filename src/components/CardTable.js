import {useEffect, useState} from "react";
import Card from "./Card";

const CardTable = (initialDeck) => {

    const cardStates = {
        showBackOfCard: 1,
        showFrontOfCard: 2,
        frontCardSelected: 3,
        showDisappeared: 4
    }

    const [deck, setDeck] = useState([]);

    const cardClickCallback = (index) => {
        console.log(`${index} clicked`);
        let d = deck;
        let card = d[index];

        if (card.state === cardStates.showFrontOfCard) {
            card.state = cardStates.showBackOfCard;
        }

        d[index] = card;
        setDeck(d);
    }

    const processDeck = (cards) => {

    }

    useEffect(() => {
        return () => {
            let cards = initialDeck.cards.map((c, i) => ({
                ...c,
                index: i,
                cssClass: 'card',
                selected: false,
                state: cardStates.showFrontOfCard,
                clickCallback: cardClickCallback,
            }));

            setDeck(cards);
        };
    }, [initialDeck]);


    return (
        <div className='card-table'>
            <h3>I are a CardTable with {deck.length} cards</h3>
            {
                deck.map((c, i) => <Card card={c} key={i}/>)
            }
        </div>
    );
}

export default CardTable;