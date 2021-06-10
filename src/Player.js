import React from "react";


function Player({player, onUseModifier, active, gameConfiguration}) {
    function ModifierCard({modifierKey, text}) {
        return (<span>
            {
                player.modifiersUsed[modifierKey] < gameConfiguration.numberOfModifiers[modifierKey] &&
                <button onClick={() => onUseModifier(modifierKey, player)}>
                {text} ({gameConfiguration.numberOfModifiers[modifierKey] - player.modifiersUsed[modifierKey]})
                </button>
            }
        </span>)
    }

    return (
        <p>{player.name} -
            <ModifierCard modifierKey="doubleTime" text="double time" />
            <ModifierCard modifierKey="skipTurn" text="skip turn" />
            {player.deckTitle} - {active ? "active" : ""}
        </p>
    );
}

export default Player