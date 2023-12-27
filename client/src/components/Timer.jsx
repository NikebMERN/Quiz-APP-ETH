import React, { useState, useEffect } from "react";

const Timer = ({ duration, onTimerEnd }) => {
    const [seconds, setSeconds] = useState(duration);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(intervalId);
                    onTimerEnd(); // Call the callback when the timer reaches 0
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [duration, onTimerEnd]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const timerStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        padding: "0px 20px",
        fontSize: "20px",
        borderRadius: "5px",
        color: seconds < 300 ? "white" : "red", // Change text color to white if less than 5 minutes
        backgroundColor: seconds < 300 ? "red" : "black", // Change background color to red if less than 5 minutes
    };

    return (
        <div style={timerStyle}>
            <p>{formatTime(seconds)}</p>
        </div>
    );
};

export default Timer;
