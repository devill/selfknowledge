import React from "react";
import Player from './Player';

function AdministrationPlayers({players, onRemovePlayer}) {
    return (
        <div className="Players">
            {            
            players.map((player) => {
                return <p key={player.id}>
                    <b>{player.name}</b> - {player.deckTitle} - <button onClick={() => {onRemovePlayer(player)}}>❌</button>
                </p>
            })
        }

    </div>
    );
}

export default AdministrationPlayers