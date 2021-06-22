import React from "react";

function AdministrationPlayers({players, onRemovePlayer}) {
    return (
        <div className="AdministrationPlayers">
            {            
            players.map((player) => {
                return <div key={player.id}><button onClick={() => {onRemovePlayer(player)}}>❌</button>
                    <b>{player.name}</b> - {player.deckTitle}
                </div>
            })
        }

    </div>
    );
}

export default AdministrationPlayers