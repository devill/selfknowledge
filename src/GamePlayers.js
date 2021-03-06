import React from "react";
import Player from './Player';

function GamePlayers({players, activePlayerIndex, sharingPlayerID, useModifier, gameConfiguration, hasActiveCard}) {
    return (
        <div className="Players">
            {            
            players.map((player, index) => {
                return <Player
                    key={player.id}
                    player={player}
                    onUseModifier={useModifier}
                    active={activePlayerIndex === index}
                    sharing={sharingPlayerID === player.id}
                    gameConfiguration={gameConfiguration}
                    hasActiveCard={hasActiveCard}
                />
            })
        }

    </div>
    );
}

export default GamePlayers