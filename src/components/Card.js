import {useState} from "react";

const Card = (props) => {

    const cardStates = {
        showBackOfCard: 1,
        showFrontOfCard: 2,
        frontCardSelected: 3,
        showDisappeared: 4
    }

    const [cardDetails] = useState(props.card);

    const clicked = () => {
        cardDetails.clickCallback(cardDetails.index);
    }

    return (
        <span className='card-container'>
            {
                (cardDetails.state === cardStates.showFrontOfCard || cardDetails.state === cardStates.frontCardSelected)
                && <img className='card-image' src={cardDetails.image} alt={cardDetails.code}
                         onClick={clicked}/>
            }
        </span>
    );
}

export default Card;

