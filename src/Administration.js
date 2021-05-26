import React, {useState} from "react";

function Administration({onAddPlayer, decks}) {
    const [newPlayerName, setNewPlayerName] = useState("");
    const [newPlayerDeck, setNewPlayerDeck] = useState(0);

    function addPlayer(e) {
        onAddPlayer(newPlayerName, newPlayerDeck);
        setNewPlayerName("");
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
        </div>

    );
}

export default Administration