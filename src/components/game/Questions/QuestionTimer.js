import { useEffect, useState, useContext, useCallback } from "react";
import SocketContext from "../../../context/SocketContext";
import useCurrentTime from "../../../hooks/useCurrentTime";
import { motion } from "framer-motion";

const barWidth = 358;

const QuestionTimer = ({ warn }) => {
  const { roomInfo } = useContext(SocketContext);
  const currentTime = useCurrentTime();

  const calculateBarPixels = useCallback(() => {
    if (currentTime < roomInfo.startTime) return barWidth;
    if (currentTime > roomInfo.endTime) return 4;

    return (
      4 +
      barWidth -
      barWidth *
        ((currentTime - roomInfo.startTime) /
          (roomInfo.endTime - roomInfo.startTime))
    );
  }, [currentTime, roomInfo]);

  const [progressBarPixels, setProgressBarPixels] = useState(
    calculateBarPixels()
  );

  useEffect(() => {
    setProgressBarPixels(calculateBarPixels());
  }, [currentTime, calculateBarPixels]);

  return (
    <motion.div
      className="flex justify-center items-center"
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`flex bg-white w-[360px] h-3 rounded-md m-3 mb-4`}>
        <div
          className={`flex  h-3 rounded-l-md ${
            warn === true ? "bg-red-500 animate-pulse" : "bg-blue-500"
          }`}
          style={{ width: `${progressBarPixels}px` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default QuestionTimer;
