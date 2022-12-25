import React, { useEffect, useState, useContext, useCallback } from "react";
import SocketContext from "../../../context/SocketContext";
import useCurrentTime from "../../../hooks/useCurrentTime";

const barWidth = 358;

const QuestionTimer = () => {
  const { roomInfo } = useContext(SocketContext);
  const [progressBarPixels, setProgressBarPixels] = useState(barWidth);
  const currentTime = useCurrentTime();

  const calculateBarPixels = useCallback(() => {
    if (currentTime < roomInfo.gameStateProps.startTime) return barWidth;
    if (currentTime > roomInfo.gameStateProps.endTime) return 4;

    return (
      4 +
      barWidth -
      barWidth *
        ((currentTime - roomInfo.gameStateProps.startTime) /
          (roomInfo.gameStateProps.endTime - roomInfo.gameStateProps.startTime))
    );
  }, [currentTime, roomInfo]);

  useEffect(() => {
    setProgressBarPixels(calculateBarPixels());
  }, [currentTime, calculateBarPixels]);

  return (
    <div className="flex justify-center items-center">
      <div className={`flex bg-white w-[360px] h-3 rounded-md m-3 mb-4`}>
        <div
          className="flex bg-red-500 h-3 rounded-l-md animate-pulse"
          style={{ width: `${progressBarPixels}px` }}
        ></div>
      </div>
    </div>
  );
};

export default QuestionTimer;
