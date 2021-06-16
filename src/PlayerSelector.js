import React, {useState} from 'react';
import useStickyState from './useStickyState';


function PlayerSelector({players, onSubmit, onCancel}) {
    const [selectedPlayerId, setSelectedPlayerId] = useState("", "SelectedPlayerId");

    return (
        <div>
            <select onChange={(event) => { setSelectedPlayerId(event.currentTarget.value); }}>
                <option value="">-- please select --</option>
                {players.map(player => {
                    return <option value={player.id}>{player.name}</option>
                })}
            </select>
            <button disabled = {selectedPlayerId === "" ? "disabled" : ""} onClick={() =>  onSubmit(selectedPlayerId)}>Invite</button>
            <button onClick={() => onCancel() }>Cancel</button>
        </div>
    );
}

export default PlayerSelector

