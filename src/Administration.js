import React, {useState} from "react";
import AdministrationPlayers from './AdministrationPlayers';
import { v4 as uuidv4 } from 'uuid';

function Administration({onChange, decks, onStartPlaying, players, gameConfiguration}) {
    const [newPlayerName, setNewPlayerName] = useState("");
    const [newPlayerDeck, setNewPlayerDeck] = useState(0);

    const addPlayer = () => {
        onChange([...players, {
            id: uuidv4(),
            name: newPlayerName,
            deck: newPlayerDeck,
            deckTitle: decks[newPlayerDeck].title,
            modifiers: {
                doubleTime: 1,
                skip: 1
            }
        }], gameConfiguration);
        setNewPlayerName("");

    };
    const removePlayer = (player) => {
        onChange(players.filter((currentPlayer) => currentPlayer.id !== player.id), gameConfiguration);
    };
    const updateTurnLength = (e) => {
        onChange(players, {...gameConfiguration, 
            turnLengthInMinutes: e.target.value
        });
    };


    return (
        <div className="Management">
            <input value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)}/>
                <select onChange={(e) => setNewPlayerDeck(e.target.value)}>
                {
                    decks.map((deck, index) => {
                        return <option value={index} key={index}>{deck.title}</option>
                    })
                }
                </select>
            <button onClick={addPlayer}>Add player</button>
            <AdministrationPlayers players={players} onRemovePlayer={removePlayer}/>
            <hr/>
            Min single turn <input onChange={updateTurnLength} type="number" min="1" value={gameConfiguration["turnLengthInMinutes"]} />
            <hr/>
            <button onClick={onStartPlaying}>Start playing</button>

        </div>

    );
}

export default Administration