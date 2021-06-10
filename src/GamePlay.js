import React, {useState} from 'react';
import Card from './Card';
import GamePlayers from './GamePlayers';
import CountdownTimer from './CountdownTimer';
import useStickyState from './useStickyState';


function GamePlay({players, decks, setPlayers, onEndGame, onModifyGame, gameConfiguration}) {
    const [currentCard, setCurrentCard] = useStickyState("", "CurrentCard");
    const [activePlayerIndex, setActivePlayerIndex] = useStickyState(-1, "ActiverPlayerIndex");
    const [sharingPlayerID, setSharingPlayerID] = useStickyState("", "SharingPlayerID");
    const [endOfCurrentTurn, setEndOfCurrentTurn] = useStickyState(0, "EndOfCurrentTurn");
    const drawACard = () => {
        console.log(gameConfiguration);
        const currentPlayerIndex = (activePlayerIndex+1) % players.length;
        setActivePlayerIndex(currentPlayerIndex);
        setSharingPlayerID("");
        setEndOfCurrentTurn(Date.now()/1000 + gameConfiguration["turnLengthInMinutes"]*60);
        setCurrentCard(decks[ players[currentPlayerIndex].deck ].cards.pick());
    };
    const useModifier = (modifierName, player) => {
        if (modifierName === 'doubleTime') {
            setEndOfCurrentTurn(endOfCurrentTurn + gameConfiguration["turnLengthInMinutes"]*60);
        }
        if (modifierName === 'skipTurn') {
            setCurrentCard("");
        }
        if (modifierName === 'skipCard') {
            setCurrentCard(decks[ players[activePlayerIndex].deck ].cards.pick());
        }
        if (modifierName === 'share') {
            setEndOfCurrentTurn(Date.now()/1000 + gameConfiguration["turnLengthInMinutes"]*60);
            setSharingPlayerID(player.id);
        }
        if (modifierName === 'invite') {
            // show "invited" button for each other player, and when clicked it makes that player the sharing player and timer restarts
            // setEndOfCurrentTurn(Date.now()/1000 + gameConfiguration["turnLengthInMinutes"]*60);
            // setSharingPlayerID(player.id);
        }
        setPlayers(players.map((thisPlayer) => {
            if (thisPlayer.id === player.id) {
                return {...player, modifiersUsed: {
                    ...player.modifiersUsed, [modifierName]: player.modifiersUsed[modifierName]+1
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
        setSharingPlayerID("");
        setEndOfCurrentTurn(0);
        console.log("endGame");
        onEndGame();
    };

    return (
        <div>
            <GamePlayers
                players={players}
                activePlayerIndex={activePlayerIndex}
                sharingPlayerID={sharingPlayerID}
                useModifier={useModifier}
                gameConfiguration={gameConfiguration}
            />
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