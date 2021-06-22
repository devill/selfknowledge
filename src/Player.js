import React from "react";


function Player({player, onUseModifier, active, gameConfiguration, sharing, hasActiveCard}) {
    function ModifierCard({modifierKey, text}) {
        return (<>
            {
                player.modifiersUsed[modifierKey] < gameConfiguration.numberOfModifiers[modifierKey] &&
                <button onClick={() => onUseModifier(modifierKey, player)}>
                {text} ({gameConfiguration.numberOfModifiers[modifierKey] - player.modifiersUsed[modifierKey]})
                </button>
            }
        </>)
    }
    const shareButton = hasActiveCard ? <ModifierCard modifierKey="share" text="share" /> : "";
    return (
        <div className={active ? "Active Player" : sharing ? "Sharing Player" : "Player"}>
            <div className="indicator">{sharing ? "📢" : ""}</div>
            <span><strong>{player.name}</strong> - {player.deckTitle}</span>
            <br/>
            {hasActiveCard ? <>
                {active ? (<span><ModifierCard modifierKey="invite" text="invite" />
                <ModifierCard modifierKey="doubleTime" text="double time" />
                <ModifierCard modifierKey="skipTurn" text="skip turn" />
                <ModifierCard modifierKey="skipCard" text="skip card" /></span>)
                : <span><ModifierCard modifierKey="share" text="share" /></span> }</>
                : ""
            }
        </div>
    );
}

export default Player