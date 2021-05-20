import './App.css';
import React, {useState, useEffect} from 'react';
import Card from './Card';
import Player from './Player';
import CountdownTimer from './CountdownTimer';
import { v4 as uuidv4 } from 'uuid';

Array.prototype.pick = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function decodeDecks(text) {
    return Object.fromEntries(text.split("\n\n")
    .map((deck)  => {
        const lines = deck.split("\n");
        return [lines[0], lines.slice(1)];
    }));
}

function App() {
    const [currentCard, setCurrentCard] = useState("");
    const [newPlayerName, setNewPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [decks, setDecks] = useState({});
    const [endOfCurrentTurn, setEndOfCurrentTurn] = useState(0);

    const drawACard = () => {
        setEndOfCurrentTurn(Date.now()/1000 + 5*60);
        console.log(decks);
        console.log(Object.keys(decks));
        setCurrentCard(decks["Első szakasz"].pick());
    };

    useEffect(() => {
        fetch("/decks.txt")
        .then( (result) => result.text())
        .then( (result) => setDecks(decodeDecks(result)) );
    },[]);

    const addPlayer = () => {
        setPlayers([...players, {
            id: uuidv4(),
            name: newPlayerName,
            modifiers: {
                plusFiveMinutes: 1,
                skip: 1,
                broadcastQuestion: 1
            }
        }]);
        setNewPlayerName("");
    };

    const useModifier = (modifierName, player) => {
        console.log(modifierName)
        console.log(player);
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
            <h1>Self Knowledge</h1>
            <div className="Management">
                <input value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)}/>
                <button onClick={addPlayer}>Add player</button>
            </div>
            <div className="Players">
                {
                    players.map((player) => {
                        return <Player key={player.id} player={player} onUseModifier={useModifier}/>
                    })
                }
            </div>

            <Card text={currentCard}/>

            <CountdownTimer timestamp={endOfCurrentTurn}/>
            <button onClick={drawACard}>Draw Card</button>


        </div>
    );
}

export default App;
