import React from "react";
import useCurrentTime from "../../hooks/useCurrentTime";

const GameStatus = ({ roomInfo }) => {
  const currentTime = useCurrentTime();

  return (
    <div className="text-xl text-white absolute top-[16%] left-[64%]">
      <div>gameState: {roomInfo.gameState} </div>
      {roomInfo.currentQuestion && roomInfo.currentQuestion.startTime ? (
        <div
          className={`${
            roomInfo.currentQuestion.startTime < currentTime
              ? "text-green-400"
              : "text-white"
          }`}
        >
          starTime: {roomInfo.currentQuestion.startTime}
        </div>
      ) : null}

      <div className="text-yellow-200">currTime: {currentTime}</div>

      {roomInfo.currentQuestion && roomInfo.currentQuestion.endTime ? (
        <div
          className={`${
            roomInfo.currentQuestion.endTime < currentTime
              ? "text-red-400"
              : "text-white"
          }`}
        >
          endTime: {roomInfo.currentQuestion.endTime}
        </div>
      ) : null}
    </div>
  );
};

export default GameStatus;
