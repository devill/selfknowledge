import React from "react";
import Player from './Player';

function Players({players, activePlayerIndex, useModifier}) {
    return (
        <div className="Players">
            {            
            players.map((player, index) => {
                return <Player key={player.id} player={player} onUseModifier={useModifier} active={activePlayerIndex === index}/>
            })
        }

    </div>
    );
}

export default Players