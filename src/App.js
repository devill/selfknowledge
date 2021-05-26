import './App.css';
import React, {useState, useEffect} from 'react';
import Card from './Card';
import Players from './Players';
import Administration from './Administration';
import CountdownTimer from './CountdownTimer';
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
    const [currentCard, setCurrentCard] = useState("");
    const [activePlayerIndex, setActivePlayerIndex] = useState(-1);
    const [players, setPlayers] = useState([]);
    const [decks, setDecks] = useState([]);
    const [endOfCurrentTurn, setEndOfCurrentTurn] = useState(0);

    const drawACard = () => {
        const currentPlayerIndex = (activePlayerIndex+1) % players.length;
        setActivePlayerIndex(currentPlayerIndex);
        setEndOfCurrentTurn(Date.now()/1000 + 5*60);
        setCurrentCard(decks[ players[currentPlayerIndex].deck ].cards.pick());
    };

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

    const useModifier = (modifierName, player) => {
        if (modifierName === 'plusFiveMinutes') {
            setEndOfCurrentTurn(endOfCurrentTurn + 5*60);
        }
        setPlayers(players.map((thisPlayer) => {
            if (thisPlayer.id === player.id) {
                return {...player, modifiers: {
                    ...player.modifiers, [modifierName]: player.modifiers[modifierName]-1
                    }
                };
            } else {
                return thisPlayer;
            }
        }));
    };


    return (
        <div className="App">
            <Administration
                onAddPlayer={addPlayer}
                decks={decks}
                />
            <Players players={players} activePlayerIndex={activePlayerIndex} useModifier={useModifier} />

            <Card text={currentCard}/>

            <CountdownTimer timestamp={endOfCurrentTurn}/>
            <button onClick={drawACard}>Draw Card</button>


        </div>
    );
}

export default App;
