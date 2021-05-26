import React from "react";

function Administration({newPlayerName, addPlayer, onSetNewPlayerDeck, onSetNewPlayerName, decks}) {
    return (
        <div className="Management">
            <input value={newPlayerName} onChange={(e) => onSetNewPlayerName(e.target.value)}/>
                <select onChange={(e) => onSetNewPlayerDeck(e.target.value)}>
                {
                    decks.map((deck, index) => {
                        return <option value={index} key={index}>{deck.title}</option>
                    })
                }
                </select>
            <button onClick={addPlayer}>Add player</button>
        </div>

    );
}

export default Administration