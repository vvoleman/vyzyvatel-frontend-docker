import React, { useEffect, useState } from "react";
import useCurrentTime from "../../hooks/useCurrentTime";

const GameStatus = ({ roomInfo }) => {
  const currentTime = useCurrentTime();

  return (
    <div className="text-xl text-white absolute top-[16%] left-[64%]">
      <div>gameState: {roomInfo.gameState} </div>
      {roomInfo.gameStateProps && roomInfo.gameStateProps.startTime ? (
        <div
          className={`${
            roomInfo.gameStateProps.startTime < currentTime
              ? "text-green-400"
              : "text-white"
          }`}
        >
          starTime: {roomInfo.gameStateProps.startTime}
        </div>
      ) : null}

      <div className="text-yellow-200">currTime: {currentTime}</div>

      {roomInfo.gameStateProps && roomInfo.gameStateProps.endTime ? (
        <div
          className={`${
            roomInfo.gameStateProps.endTime < currentTime
              ? "text-red-400"
              : "text-white"
          }`}
        >
          endTime: {roomInfo.gameStateProps.endTime}
        </div>
      ) : null}
    </div>
  );
};

export default GameStatus;
