import React from "react";
import Card from './Card';
import GamePlayers from './GamePlayers';
import CountdownTimer from './CountdownTimer';

function GamePlay({currentCard, endOfCurrentTurn, drawACard, players, activePlayerIndex, useModifier}) {
    return (
        <div>
            <GamePlayers players={players} activePlayerIndex={activePlayerIndex} useModifier={useModifier} />
            <Card text={currentCard}/>
            <CountdownTimer timestamp={endOfCurrentTurn}/>
            <button onClick={drawACard}>Draw Card</button>
        </div>
    );
}

export default GamePlay