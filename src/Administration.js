import React, {useState} from "react";
import AdministrationPlayers from './AdministrationPlayers';
import { v4 as uuidv4 } from 'uuid';

function Administration({onChange, decks, onStartPlaying, players}) {
    const [newPlayerName, setNewPlayerName] = useState("");
    const [newPlayerDeck, setNewPlayerDeck] = useState(0);

    const addPlayer = () => {
        onChange([...players, {
            id: uuidv4(),
            name: newPlayerName,
            deck: newPlayerDeck,
            deckTitle: decks[newPlayerDeck].title,
            modifiers: {
                plusFiveMinutes: 1,
                skip: 1
            }
        }]);
        setNewPlayerName("");

    };
    const removePlayer = (player) => {
        onChange(players.filter((currentPlayer) => currentPlayer.id !== player.id));
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
            <button onClick={onStartPlaying}>Start playing</button>
            <AdministrationPlayers players={players} onRemovePlayer={removePlayer}/>
        </div>

    );
}

export default Administration