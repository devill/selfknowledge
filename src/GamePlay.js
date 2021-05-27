import React, {useState} from 'react';
import Card from './Card';
import GamePlayers from './GamePlayers';
import CountdownTimer from './CountdownTimer';

function GamePlay({players, decks, setPlayers, onEndGame, onModifyGame}) {
    const [currentCard, setCurrentCard] = useState("");
    const [activePlayerIndex, setActivePlayerIndex] = useState(-1);
    const [endOfCurrentTurn, setEndOfCurrentTurn] = useState(0);
    const drawACard = () => {
        const currentPlayerIndex = (activePlayerIndex+1) % players.length;
        setActivePlayerIndex(currentPlayerIndex);
        setEndOfCurrentTurn(Date.now()/1000 + 5*60);
        setCurrentCard(decks[ players[currentPlayerIndex].deck ].cards.pick());
    };
    const useModifier = (modifierName, player) => {
        if (modifierName === 'plusFiveMinutes') {
            setEndOfCurrentTurn(endOfCurrentTurn + 5*60);
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


    return (
        <div>
            <GamePlayers players={players} activePlayerIndex={activePlayerIndex} useModifier={useModifier} />
            <Card text={currentCard}/>
            <CountdownTimer timestamp={endOfCurrentTurn}/>
            <button onClick={drawACard}>Draw Card</button>


            
            <hr/>
            <button onClick={onEndGame}>End Game</button>
            <button onClick={onModifyGame}>Modify Game</button>
            
        </div>
    );
}

export default GamePlay