import React from "react";

function Player({player, onUseModifier, active, gameConfiguration}) {
    return (
        <p>{player.name} -
            {player.modifiersUsed.doubleTime < gameConfiguration["numberOfDoubleTimes"] && <button onClick={() => onUseModifier("doubleTime", player)}>double time ({gameConfiguration["numberOfDoubleTimes"] - player.modifiersUsed.doubleTime})</button>}
            {player.modifiersUsed.skip < gameConfiguration["numberOfSkips"]  && <button onClick={() => onUseModifier("skip", player)}>skip ({ gameConfiguration["numberOfSkips"] - player.modifiersUsed.skip})</button>}
            {player.deckTitle} - {active ? "active" : ""}
        </p>
    );
}

export default Player