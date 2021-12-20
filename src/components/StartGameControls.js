import {useState} from "react";
import {Form, Button} from "react-bootstrap";

function StartGameControls({submitCallback}) {

    const [count, setCount] = useState(24);

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
                                  onChange={e => setCount(e.target.value)}/>
                    <Form.Text id='count' className='text-muted'>
                        The number of cards must be an even number between 2 and 52.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default StartGameControls;
