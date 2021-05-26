import React from "react";
import Card from './Card';
import CountdownTimer from './CountdownTimer';

function GamePlay({currentCard, endOfCurrentTurn, drawACard}) {
    return (
        <div>
            <Card text={currentCard}/>
            <CountdownTimer timestamp={endOfCurrentTurn}/>
            <button onClick={drawACard}>Draw Card</button>
        </div>
    );
}

export default GamePlay