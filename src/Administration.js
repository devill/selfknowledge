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
            modifiersUsed: {
                share: 0,
                doubleTime: 0,
                skipTurn: 0,
                skipCard: 0
            }
        }], gameConfiguration);
        setNewPlayerName("");

    };
    const removePlayer = (player) => {
        onChange(players.filter((currentPlayer) => currentPlayer.id !== player.id), gameConfiguration);
    };
    const updateGameConfig = (key) => {
        return (e) => {
            console.log(key, e.target.value);
            onChange(players, {...gameConfiguration, 
                [key]: e.target.value
            });
            console.log(gameConfiguration);
        }
    };

    const updateGameModifiers = (key) => {
        return (e) => {
            onChange(players, {...gameConfiguration,
                numberOfModifiers: {
                    ...gameConfiguration.numberOfModifiers,
                    [key]: e.target.value
                }
            });
        }
    };

    function ModifierCardConfiguration({modifierKey, text}) {
        return (<span>
            {
                <div>
                    Number of "{text}" <input onChange={updateGameModifiers(modifierKey)} type="number" min="0" value={gameConfiguration.numberOfModifiers[modifierKey]} />
                </div>
            }
        </span>)
    }

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
            <div>Min single turn <input onChange={updateGameConfig("turnLengthInMinutes")} type="number" min="1" value={gameConfiguration["turnLengthInMinutes"]} /></div>
            <ModifierCardConfiguration modifierKey="doubleTime" text="double time" />
            <ModifierCardConfiguration modifierKey="skipTurn" text="skip turn" />
            <ModifierCardConfiguration modifierKey="skipCard" text="skip card" />
            <ModifierCardConfiguration modifierKey="share" text="share" />
            <hr/>
            <button onClick={onStartPlaying}>Start playing</button>

        </div>

    );
}

export default Administration