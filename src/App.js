import './App.css';
import React, {useState} from 'react';
import Card from './Card'
import Player from './Player'
import { v4 as uuidv4 } from 'uuid';


Array.prototype.pick = function () {
    return this[Math.floor(Math.random() * this.length)];
};

const cardDeck = [
    "What is biggest dream?",
    "What is important for you in life?",
    "Adev wvertfw vewv werv erwv wrtb wrtb wrtb vdvwerf ed erghtuy jhgvqewr gvrt?"
];


function App() {
    const [currentCard, setCurrentCard] = useState("");
    const [newPlayerName, setNewPlayerName] = useState("");
    const [players, setPlayers] = useState([]);

    const drawACard = () => {
        setCurrentCard(cardDeck.pick());
    };

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
        setPlayers(players.map((thisPlayer) => {
            if (thisPlayer.id == player.id) {
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

            <button onClick={drawACard}>Draw Card</button>


        </div>
    );
}

export default App;
