import React from "react";
import Player from './Player';

function AdministrationPlayers({players}) {
    return (
        <div className="Players">
            {            
            players.map((player) => {
                return <p key={player.id}>
                    <b>{player.name}</b> - {player.deckTitle}
                </p>
            })
        }

    </div>
    );
}

export default AdministrationPlayers