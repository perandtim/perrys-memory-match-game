# Perry's Memory Match Game
_Developed by Perry Pederson / perry_pederson@outlook.com_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# Running the project
Download the code, run 'npm install' in the root directory, then 'npm start'.
## Project Overview
This was a pretty fun task.

I made heavy use of a public [52-card generating REST service](https://deckofcardsapi.com/), using API calls to 
specify the cards in a deck as well as to randomly generate a deck made up of these cards. The returned JSON object
contained URL's to each playing deck card, so I didn't have to store or implement the cards in any way.  There was no
requirement on what type of cards to use for this game, so I went old-school with a common deck of 52 cards.

A standard JS class library _Deck.js_ (which I wrote) contains the logic of generating a random subset of the 52 cards 
to whatever number of cards the player chooses.

A _MemoryCard_ JSX component renders the card in either a face-up or face-down state.  Lesson learned: I used the
[react bootstrap](https://react-bootstrap.github.io/) framework, which has a "Card" CSS component.  Using the name "Card"
in my code caused a bit of confusion as "my" Card was extending CSS properties from the bootstrap Card.  Renaming my
component from _Card_ to _MemoryCard_ resolved this issue.

I was told to implement additional features as I saw fit; I added the ability for the user to select how many cards
to start a game with instead of having a fixed amount of twenty-four cards.  I also created a custom backing for the
cards.

I had started to add sound to click events and when the game won, but alas, time started wearing me down, so I preferred
to write up this documentation instead of adding audio bling to this project.  The sound files remain checked in.
## Design Issues / Decisions
One requirement that I purposefully omitted was that the cards were to be displayed "in a grid".

With my added functionality of having a user-selectable number of starting cards, the layout began to get a mite bit
messy looking depending on the number of cards the user was starting out-- depending on browser width and such placing
cards in a flex table or equivalent didn't look good at different card number selections.  Having the cards displayed
in one large card-wrapping row looked better.

I had initially created a _CardTable_ component that would manage the deck of cards, but development got ugly attempting
to have it maintain state between which two cards were selected and letting the parent "App.js" code know when the game
was won.  I removed the component and transferred its logic into the App.js file.  I'm not totally pleased with this, 
and in real life would have asked peers for a design decision on this.

A React-ish issue that I had to put in a minor 'hack' to overcome was that when cards had their visual state changed
(they can be face-up, face-down, or hidden), the DOM wasn't rendering the visual changes.  I did some research and
added an _updateState_ hook used by a _forceDOMUpdate_ function.  Calling the function after executing individual card
state changes fixed the update problem, but that shouldn't need to be done.  Perhaps that I'm storing an array of card
information is causing issues with React detecting model value changes that should echo into the view.

Similarly, I was unable to re-obtain the array of card 'model' information stored in the React state "Deck" value when
on the card click callback.  There's a bunch of logic to determine what to do when a card is clicked (mainly depending 
on whether a card has already been selected), and I was unable to easily obtain the current array of card states--
_useEffect_ wasn't working as I had hoped.  I 'hacked' around this issue by passing the entire card array (a "deck") 
into to each card, and then passed the deck back to the 'card was clicked' callback function, where it was then used to
check for matches.  This doesn't feel right, and in real life I would have asked a peer for design suggestions.

## Unimplemented Extra Features / Ideas
I would have liked to add sound to this app, but ran out of time for this feature.

I would also have enjoyed adding in some CSS animation-- such as "flipping" a card over from front to back and vice-versa.

I wouldn't have minded adding the ability to resize the cards.

In a "real" production app I would have moved a few constants into a configuration file-- specifically the URL to the
card deck generating service, and a value defining the number of milliseconds to pause in between flipping the cards
'over'.

## Directories / Source Code / Files

### Components

#### MemoryCard.js
    Renders a playing card, either shown or "on its back" depending on the state of the card.

#### StartGameControls.js
    Going above the requirements: This component allows a user to enter an even number between 2 and 52.

    While the original requirements stated that the game should have twenty-four cards, I was also told to add
    extra features as I saw fit.

### Util

#### constants.js
    Both the App.js and MemoryCard.js files needed to set and respond to different card states-- face up, face
    down, or hidden.  A simple shared enum-like class accomplished this.

#### Deck.js
    Since this wasn't a React component, I placed this file into the Util directory.
    THis is a reusable JavaScript class that will generate a deck of (n) cards where each card in the deck
    exists twice.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
