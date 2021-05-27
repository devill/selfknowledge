import React, {useState} from 'react';
import Card from './Card';
import GamePlayers from './GamePlayers';
import CountdownTimer from './CountdownTimer';
import useStickyState from './useStickyState';


function GamePlay({players, decks, setPlayers, onEndGame, onModifyGame, gameConfiguration}) {
    const [currentCard, setCurrentCard] = useStickyState("", "CurrentCard");
    const [activePlayerIndex, setActivePlayerIndex] = useStickyState(-1, "ActiverPlayerIndex");
    const [endOfCurrentTurn, setEndOfCurrentTurn] = useStickyState(0, "EndOfCurrentTurn");
    const drawACard = () => {
        console.log(gameConfiguration);
        const currentPlayerIndex = (activePlayerIndex+1) % players.length;
        setActivePlayerIndex(currentPlayerIndex);
        setEndOfCurrentTurn(Date.now()/1000 + gameConfiguration["turnLengthInMinutes"]*60);
        setCurrentCard(decks[ players[currentPlayerIndex].deck ].cards.pick());
    };
    const useModifier = (modifierName, player) => {
        if (modifierName === 'doubleTime') {
            setEndOfCurrentTurn(endOfCurrentTurn + gameConfiguration["turnLengthInMinutes"]*60);
        }
        setPlayers(players.map((thisPlayer) => {
            if (thisPlayer.id === player.id) {
                return {...player, modifiers: {
                    ...player.modifiers, [modifierName]: player.modifiers[modifierName]-1
                    }
                };
            } else {
                return thisPlayer;
            }
        }));
    };

    const endGame = () => {
        setCurrentCard("");
        setActivePlayerIndex(-1);
        setEndOfCurrentTurn(0);
        console.log("endGame");
        onEndGame();
    };

    return (
        <div>
            <GamePlayers players={players} activePlayerIndex={activePlayerIndex} useModifier={useModifier} />
            <Card text={currentCard}/>
            <CountdownTimer timestamp={endOfCurrentTurn}/>
            <button onClick={drawACard}>Draw Card</button>


            
            <hr/>
            <button onClick={endGame}>End Game</button>
            <button onClick={onModifyGame}>Modify Game</button>
            
        </div>
    );
}

export default GamePlay