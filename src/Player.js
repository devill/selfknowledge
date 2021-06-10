import React from "react";


function Player({player, onUseModifier, active, gameConfiguration, sharing}) {
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
            <ModifierCard modifierKey="share" text="share" />
            <ModifierCard modifierKey="doubleTime" text="double time" />
            <ModifierCard modifierKey="skipTurn" text="skip turn" />
            <ModifierCard modifierKey="skipCard" text="skip card" />
            {player.deckTitle} - {active ? "active" : ""}{sharing ? "sharing" : ""}
        </p>
    );
}

export default Player