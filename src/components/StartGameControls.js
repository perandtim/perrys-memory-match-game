import {useState} from "react";
import {Form, Button} from "react-bootstrap";

// Allows a user to select the number of cards to play with and start the game.
// Added as an extra "feature" to the app.

function StartGameControls({submitCallback}) {

    const [count, setCount] = useState(24);  // Requirement was to start out with 24 cards, hence the default value.

    const formSubmit = (e) => {
        e.preventDefault();
        submitCallback(count);
    }

    return (
        <div className='card-number-input'>
            <Form onSubmit={e => {formSubmit(e)}} >
                <Form.Group controlId='cardCount'>
                    <Form.Label>
                        How many cards do you want to use?
                    </Form.Label>
                    <Form.Control type='number' min='2' max='52' step='2' value={count}
                                  onChange={e => setCount(Number(e.target.value))}/>
                    <Form.Text id='count' className='text-muted'>
                        The number of cards must be an even number between 2 and 52.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Start Game
                </Button>
            </Form>
        </div>
    );
}

export default StartGameControls;
