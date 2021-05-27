import './App.css';
import React, {useState, useEffect} from 'react';
import GamePlay from './GamePlay';
import Administration from './Administration';
import { v4 as uuidv4 } from 'uuid';

Array.prototype.pick = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function decodeDecks(text) {
    return text.split("\n\n")
    .map((deck)  => {
        const lines = deck.split("\n");
        return {
            title: lines[0],
            cards: lines.slice(1)
        };
    });
}

function App() {
    const [gamePhase, setGamePhase] = useState("setup");
    const [players, setPlayers] = useState([]);
    const [decks, setDecks] = useState([]);


    useEffect(() => {
        fetch("/decks.txt")
        .then( (result) => result.text())
        .then( (result) => setDecks(decodeDecks(result)) );
    },[]);

    const addPlayer = (newPlayerName, newPlayerDeck) => {
        setPlayers([...players, {
            id: uuidv4(),
            name: newPlayerName,
            deck: newPlayerDeck,
            deckTitle: decks[newPlayerDeck].title,
            modifiers: {
                plusFiveMinutes: 1,
                skip: 1
            }
        }]);
    };


    return (
        <div className="App">
            {
                gamePhase === "setup" &&
                <Administration
                onAddPlayer={addPlayer}
                decks={decks}
                onStartPlaying={() => { setGamePhase("play") } }
                players={players}
            />
            }
            

            {
                gamePhase === "play" &&
                <GamePlay
                    players={players}
                    decks={decks}
                    setPlayers={setPlayers}
                    />
            }


        </div>
    );
}

export default App;
