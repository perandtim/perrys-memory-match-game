import './App.css';
import {useState} from "react";
import SelectCards from "./components/SelectCards";
import CardTable from "./components/CardTable";
import Deck from "./components/Deck";
import './bootstrap.min.css';

function App() {

    const [deck, setDeck] = useState([]);

    const getRandomizedCardDeck = (cardCount) => {
        // setShowDeckInputControls(false);
        let d = new Deck();
        d.createDeck(cardCount).then(resp => {
            setDeck(resp);
        });
    }

    return (
        <div className="App">
            <SelectCards submitCallback={getRandomizedCardDeck}/>
            <CardTable cards={deck}/>
        </div>
    );
}

export default App;
