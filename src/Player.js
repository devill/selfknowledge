import React from "react";

function Player({player, onUseModifier, active}) {
    return (
        <p>{player.name}
            {player.modifiers.plusFiveMinutes>0 && <button onClick={() => onUseModifier("plusFiveMinutes", player)}>+5</button>}
            {player.modifiers.skip>0 && <button onClick={() => onUseModifier("skip", player)}>skip</button>}
            {player.deckTitle} - {active ? "active" : ""}
        </p>
    );
}

export default Player