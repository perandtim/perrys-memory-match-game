import './App.css';
import {useCallback, useState} from "react";
import SelectCards from "./components/SelectCards";
import MemoryCard from "./components/MemoryCard";
import {cardStates} from "./util/constants";
import Deck from "./components/Deck";
import './bootstrap.min.css';
import winnerImage from './images/winner01.jpg';


function App() {

    const longPauseInMilliseconds = 1000;

    const [getDeck, setDeck] = useState([]);
    const [numberOfVisibleCards, setNumberOfVisibleCards] = useState(0);
    const [gameWon, setGameWon] = useState(false);


    const [, updateState] = useState();
    const forceDOMUpdate = useCallback(() => updateState({}), []);

    const cardClicked = (card, deck) => {

        let previouslySelectedCard = deck.find(card => card.state === cardStates.showFrontOfCard);
        let currentlySelectedCard = deck[card.index];

        currentlySelectedCard.state = (currentlySelectedCard.state === cardStates.showFrontOfCard ?
            cardStates.showBackOfCard :
            cardStates.showFrontOfCard)

        // Update immediately if either:
        //  This is the first card out of two that has been clicked, or
        //  The same card has been clicked on twice.
        if (!previouslySelectedCard || previouslySelectedCard.index === currentlySelectedCard.index) {
            setDeck(deck);
            forceDOMUpdate();
        } else {
            // display the second card, then pause for a moment before either hiding both
            // if they matched, or flipping them over.
            setDeck(deck);
            forceDOMUpdate();

            setTimeout(() => {

                // Hide both cards if they were a match.
                if (previouslySelectedCard.code === currentlySelectedCard.code) {
                    previouslySelectedCard.state = cardStates.showDisappeared;
                    currentlySelectedCard.state = cardStates.showDisappeared;
                    let numberVisibleCardsRemaining = deck.reduce((a, v) => (v.state !== cardStates.showDisappeared ? a + 1 : a), 0);
                    setNumberOfVisibleCards(numberVisibleCardsRemaining);
                    if (numberVisibleCardsRemaining === 0) {
                        setGameWon(true);
                    }
                } else {
                    // Otherwise flip them over.
                    previouslySelectedCard.state = cardStates.showBackOfCard;
                    currentlySelectedCard.state = cardStates.showBackOfCard;
                }

                setDeck(deck);
                forceDOMUpdate()
            }, longPauseInMilliseconds);
        }
    }

    const getRandomizedCardDeck = (cardCount) => {

        let d = new Deck();
        d.createDeck(cardCount).then(resp => {

            let addInfo = resp.map((card, i) => ({
                ...card,
                state: cardStates.showBackOfCard,
                index: i,
                clickCallback: cardClicked
            }))
            setDeck([]);
            setDeck(addInfo);
            setGameWon(false);
            setNumberOfVisibleCards(Number(cardCount));
        });
    }

    return (
        <div className="App">
            <SelectCards submitCallback={getRandomizedCardDeck}/>
            {numberOfVisibleCards > 0 && <div className='card-table'>
                <h4>There are {numberOfVisibleCards} cards remaining.</h4>
                {
                    getDeck.map((card, i) => (
                        <span key={i}>
                            <MemoryCard deck={getDeck} card={card}/>
                        </span>))
                }
            </div>}
            {gameWon && <div className='winner blink'>
                <img src={winnerImage} alt="you won!"/>
            </div>}
        </div>
    );
}

export default App;
