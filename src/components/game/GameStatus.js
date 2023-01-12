import useCurrentTime from "../../hooks/useCurrentTime";

const GameStatus = ({ roomInfo }) => {
  const currentTime = useCurrentTime();

  return (
    <div className="text-md text-white absolute top-[7%] left-[19%] opacity-80">
      <div>gameState: {roomInfo.gameState} </div>
      <div>gameStage: {roomInfo.gameStage} </div>
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
      <div>
        currentPick:
        {roomInfo.currentPick ? JSON.stringify(roomInfo.currentPick) : null}
      </div>
      <div>
        currentAttack:
        {roomInfo.currentAttack ? JSON.stringify(roomInfo.currentAttack) : null}
      </div>
    </div>
  );
};

export default GameStatus;
