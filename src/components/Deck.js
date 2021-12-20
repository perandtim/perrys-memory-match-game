// Card deck and graphics uses the service at https://www.deckofcardsapi.com/

class Deck {

    #serviceURL = 'https://www.deckofcardsapi.com/api/deck';

    async createDeck(cardCount = 24) {

        /*
            The game has a default of 24 cards, though I've made that a
             variable value just to be spiffy.

            The deck of cards service can create an instance of a deck initialized
            with whatever cards are desired.

            To call the service with a specific number of cards AND each card in
            the deck occurs twice, one has to:
                Create a full "deck"
                Select  (cardCount / 2) cards at random as each card will exist
                twice in the deck Send the service a request for the customized
                deck with duplicate cards

            The deckofcards API can build a specific deck using a 'cards' parameter
            which is a comma delineated string of two-character playing card values
            and suits.  Example:

            https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH
         */

        const suits = ['S', 'D', 'C', 'H'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];

        // First, create an array containing all 52 cards
        let fullDeck = [];

        suits.forEach(s => {
            values.forEach(v => {
                fullDeck.push(`${v}${s}`);
            })
        });

        let randomDeck = [];

        for (let count = 0; count < cardCount / 2; count++) {

            // Select a card at random from the full deck
            let selectedIndex = Math.floor(Math.random() * fullDeck.length);

            // Obtain the two-character card value and remove it from the deck so it
            // won't be selected again.
            let card = fullDeck.splice(selectedIndex, 1);

            randomDeck.push(card);
        }
        // Note that this could all be done in one line, but that makes it way too ugly to
        // read / understand / maintain:
        // randomDeck.push(fullDeck.splice(Math.floor(Math.random() * fullDeck.length),1));

        // Build up the card code strings for the RESTful API
        console.log(`${randomDeck.join(',')}`);
        let partialCards = `${randomDeck.join(',')},${randomDeck.join(',')}`;

        let url = `${this.#serviceURL}/new/shuffle/?cards=${partialCards}`;

        try {
            let request = await fetch(url);
            const newDeckResponse = await request.text();
            let resp = JSON.parse(newDeckResponse);

            if (resp.success) {

                url = `${this.#serviceURL}/${resp.deck_id}/draw/?count=${cardCount}`;
                request = await fetch(url);
                const cards = await request.text();
                resp = JSON.parse(cards);
                if (resp.success) {
                    return resp.cards;
                }
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }

    }

}

export default Deck;