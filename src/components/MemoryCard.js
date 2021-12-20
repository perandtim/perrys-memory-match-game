import {useState} from "react";
import {cardStates} from "../util/constants";
import backOfCard from "../images/backofcard01.png"
const MemoryCard = ({card, deck}) => {

    const [cardDetails] = useState(card);

    const clicked = () => {
        cardDetails.clickCallback(cardDetails, deck);
    }

    return (
        <span className='card-container'>
            {
                (cardDetails.state === cardStates.showFrontOfCard)
                && <img className='card-image' src={cardDetails.image} alt={cardDetails.code}
                         onClick={clicked}/>
            }
            {
                cardDetails.state === cardStates.showBackOfCard
                && <img className='card-image' src={backOfCard} alt={cardDetails.code}
                        onClick={clicked}/>
            }
        </span>
    );
}

export default MemoryCard;

