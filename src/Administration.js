import React, {useState} from "react";
import AdministrationPlayers from './AdministrationPlayers';
import { v4 as uuidv4 } from 'uuid';

function ModifierCardConfiguration({modifierKey, text, onChange, value}) {
    return (
            <div className="config-value">
                Number of "{text}" <input key={modifierKey} onChange={onChange(modifierKey)} type="number" min="0" value={value} />
            </div>
        )
}

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
                invite: 0,
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
            onChange(players, {...gameConfiguration, 
                [key]: e.target.value
            });
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

    const isNonNegativeNumber = (value) => {
        return /^\d+$/.test(value);
    }

    const isValidGame = () => {
        return players.length > 1 && 
            isNonNegativeNumber(gameConfiguration["turnLengthInMinutes"]) &&
            gameConfiguration["turnLengthInMinutes"] > 0 &&
            Object.values(gameConfiguration.numberOfModifiers).every((modifyerCount) => isNonNegativeNumber(modifyerCount));
    }


    return (
        <div className="Management">
            <div className="AddPlayerForm">
            <input data-testid="player-name" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)}/>
                <select data-testid="deck-selector" onChange={(e) => setNewPlayerDeck(e.target.value)}>
                {
                    decks.map((deck, index) => {
                        return <option value={index} key={index}>{deck.title}</option>
                    })
                }
                </select>
            <button onClick={addPlayer}>Add player</button>
            </div>
            <hr/>
            <AdministrationPlayers players={players} onRemovePlayer={removePlayer}/>
            <hr/>
            <div className="config-value">Min single turn <input onChange={updateGameConfig("turnLengthInMinutes")} type="number" min="1" value={gameConfiguration["turnLengthInMinutes"]} /></div>
            <hr/>
            <ModifierCardConfiguration onChange={updateGameModifiers} modifierKey="doubleTime" text="double time"  value={gameConfiguration.numberOfModifiers["doubleTime"]} />
            <ModifierCardConfiguration onChange={updateGameModifiers} modifierKey="skipTurn" text="skip turn"  value={gameConfiguration.numberOfModifiers["skipTurn"]} />
            <ModifierCardConfiguration onChange={updateGameModifiers} modifierKey="skipCard" text="skip card"  value={gameConfiguration.numberOfModifiers["skipCard"]} />
            <ModifierCardConfiguration onChange={updateGameModifiers} modifierKey="share" text="share"   value={gameConfiguration.numberOfModifiers["share"]}/>
            <ModifierCardConfiguration onChange={updateGameModifiers} modifierKey="invite" text="invite"   value={gameConfiguration.numberOfModifiers["invite"]}/>
            <hr/>
            <button disabled={isValidGame() ? "": "disabled"} onClick={onStartPlaying}>Start playing</button>

        </div>

    );
}

export default Administration