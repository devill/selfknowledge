import React from 'react';
import Card from './Card';
import GamePlayers from './GamePlayers';
import CountdownTimer from './CountdownTimer';
import PlayerSelector from './PlayerSelector';
import useStickyState from './useStickyState';


function GamePlay({players, decks, setPlayers, onEndGame, onModifyGame, gameConfiguration}) {
    const [currentCard, setCurrentCard] = useStickyState("", "CurrentCard");
    const [activePlayerIndex, setActivePlayerIndex] = useStickyState(-1, "ActiverPlayerIndex");
    const [sharingPlayerID, setSharingPlayerID] = useStickyState("", "SharingPlayerID");
    const [inviting, setInviting] = useStickyState(false, "Inviting");
    const [endOfCurrentTurn, setEndOfCurrentTurn] = useStickyState(0, "EndOfCurrentTurn");
    const [hasActiveCard, setHasActiveCard] = useStickyState(false, "HasActiveCard");
    const drawACard = () => {
        const currentPlayerIndex = (activePlayerIndex+1) % players.length;
        setActivePlayerIndex(currentPlayerIndex);
        setSharingPlayerID("");
        setEndOfCurrentTurn(Date.now()/1000 + gameConfiguration["turnLengthInMinutes"]*60);
        setCurrentCard(decks[ players[currentPlayerIndex].deck ].cards.pick());
        setHasActiveCard(true);
    };
    const useModifier = (modifierName, player) => {
        if (modifierName === 'doubleTime') {
            setEndOfCurrentTurn(endOfCurrentTurn + gameConfiguration["turnLengthInMinutes"]*60);
        }
        if (modifierName === 'skipTurn') {
            setHasActiveCard(false);
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
            setInviting(true);
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

    const handleInvitation = (playerId) =>  {
        setInviting(false);
        setEndOfCurrentTurn(Date.now()/1000 + gameConfiguration["turnLengthInMinutes"]*60);
        setSharingPlayerID(playerId);
    }
    const handleInvitationCancel = (activePlayerIndex) => {
        setInviting(false);
        setPlayers(players.map((player, index) => {
            if (activePlayerIndex === index) {
                return {...player, modifiersUsed: {
                    ...player.modifiersUsed, invite: player.modifiersUsed['invite']-1
                    }
                };
            } else {
                return player;
            }
        }));
    }

    const endGame = () => {
        setCurrentCard("");
        setInviting(false);
        setActivePlayerIndex(-1);
        setSharingPlayerID("");
        setEndOfCurrentTurn(0);
        setHasActiveCard(false);
        onEndGame();
    };

    return (
        <div>
            { !inviting && <div>
                <GamePlayers
                    players={players}
                    activePlayerIndex={activePlayerIndex}
                    sharingPlayerID={sharingPlayerID}
                    useModifier={useModifier}
                    gameConfiguration={gameConfiguration}
                    hasActiveCard={hasActiveCard}
                />
                <Card text={currentCard}/>
                <hr/>
                <CountdownTimer timestamp={endOfCurrentTurn}/>
                <button onClick={drawACard}>Draw Card</button>
            </div>}
            { inviting && <PlayerSelector players={players.filter((_, index) => index !== activePlayerIndex )} onSubmit={handleInvitation} onCancel={() => handleInvitationCancel(activePlayerIndex)}/> }

            <hr/>
            <button onClick={endGame}>End Game</button>
            <button onClick={onModifyGame}>Modify Game</button>
            
        </div>
    );
}

export default GamePlay