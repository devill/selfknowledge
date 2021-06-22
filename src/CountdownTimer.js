import React, { useState, useEffect } from 'react';

function CountdownTimer({timestamp}) {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const secondsToTime = (seconds) => {
        if (seconds > 0) {
            return Math.floor(seconds/60) + ":" + (seconds%60 < 10 ? '0' + seconds%60 : seconds%60);
        } else {
            return "0:00";
        }
    };

    const updateTimer = () => {
        setTimeRemaining(secondsToTime(Math.ceil(timestamp  - Date.now()/1000)));
    };

    useEffect(() => {
        const timerHandle = setInterval( updateTimer, 100);
        return () => {clearInterval(timerHandle)};
    });


    return (
        <div className="CountdownTimer">{timeRemaining}
        </div>
    );
}

export default CountdownTimer