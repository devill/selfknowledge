import './App.css';
import React, {useState, useEffect} from 'react';
import GamePlay from './GamePlay';
import Administration from './Administration';
import useStickyState from './useStickyState';

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Array.prototype.pick = function () {
    return this[Math.floor(Math.random() * this.length)];
};


function decodeDecks(text) {
    return text.split("\n\n")
    .map((deck)  => {
        const lines = deck.split("\n");
        return {
            title: lines[0],
            cards: lines.slice(1)
        };
    });
}

function App() {
    const [gamePhase, setGamePhase] = useStickyState("setup", "GamePhase");
    const [players, setPlayers] = useStickyState([], "Players");
    const [decks, setDecks] = useState([]);
    const [gameConfiguration, setGameConfiguration] = useStickyState({
        turnLengthInMinutes: 5,
        numberOfModifiers: {
            share: 1,
            invite: 1,
            doubleTime: 1,
            skipTurn: 1,
            skipCard: 1
        }
    }, "gameConfiguration");


    useEffect(() => {
        fetch("/decks.txt")
        .then( (result) => result.text())
        .then( (result) => setDecks(decodeDecks(result)) );
    },[]);


    return (
        <div className="App">
            {
                gamePhase === "setup" &&
                <Administration
                decks={decks}
                onStartPlaying={() => { setGamePhase("play") } }
                onChange={(players, gameConfiguration) => { setPlayers(players); setGameConfiguration(gameConfiguration)}}
                players={players}
                gameConfiguration={gameConfiguration}
                key="Administration"
            />
            }
            

            {
                gamePhase === "play" &&
                <GamePlay
                    players={players}
                    decks={decks}
                    setPlayers={setPlayers}
                    onEndGame={() => { setGamePhase("setup"); setPlayers([])}}
                    onModifyGame={() => { setGamePhase("setup")}}
                    gameConfiguration={gameConfiguration}
                    />
            }


        </div>
    );
}

export default App;
