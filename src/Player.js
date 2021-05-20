import React from "react";

function Player({player, onUseModifier}) {
    return (
        <p>{player.name}
            {player.modifiers.plusFiveMinutes>0 && <button onClick={() => onUseModifier("plusFiveMinutes", player)}>+5</button>}
            {player.modifiers.skip>0 && <button onClick={() => onUseModifier("skip", player)}>skip</button>}
            {player.modifiers.broadcastQuestion>0 && <button onClick={() => onUseModifier("broadcastQuestion", player)}>broadcast</button>}
            {player.deckTitle}
        </p>
    );
}

export default Player