import React from "react";


function Player({player, onUseModifier, active, gameConfiguration, sharing, hasActiveCard}) {
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
    const shareButton = hasActiveCard ? <ModifierCard modifierKey="share" text="share" /> : "";
    return (
        <div>
            <p>{player.name} - {player.deckTitle} - {active ? "active" : ""}{sharing ? "sharing" : ""}</p>
            <span>
                {hasActiveCard ? <>
                    {active ? (<span><ModifierCard modifierKey="invite" text="invite" />
                    <ModifierCard modifierKey="doubleTime" text="double time" />
                    <ModifierCard modifierKey="skipTurn" text="skip turn" />
                    <ModifierCard modifierKey="skipCard" text="skip card" /></span>)
                    : <span><ModifierCard modifierKey="share" text="share" /></span> }</>
                    : ""
                }
            </span>
        </div>
    );
}

export default Player