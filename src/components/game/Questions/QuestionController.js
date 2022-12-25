import React, { useState, useEffect, useRef, useContext } from "react";
import NumericQuestion from "./NumericQuestion";
import SocketContext from "../../../context/SocketContext";
import PrepareCounter from "./PrepareCounter";
import useCurrentTime from "../../../hooks/useCurrentTime";
import NumericResults from "./NumericResults";

const QuestionController = () => {
  const { roomInfo } = useContext(SocketContext);
  const currentTime = useCurrentTime();

  const [secondsTillStart, setSecondsTillStart] = useState(9999);
  const [secondsTillEnd, setSecondsTillEnd] = useState(9999);

  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    console.log("answer", answer);
  }, [answer]);

  useEffect(() => {
    if (!roomInfo.gameStateProps) return;

    setSecondsTillStart(
      parseInt(
        parseInt(roomInfo.gameStateProps.startTime - currentTime) / 1000 + 1
      )
    );

    setSecondsTillEnd((roomInfo.gameStateProps.endTime - currentTime) / 1000);
  }, [currentTime, roomInfo.gameStateProps]);

  if (!roomInfo.currentQuestion || !roomInfo.gameStateProps) return null;

  if (secondsTillStart > 3) return;

  if (secondsTillStart >= 1)
    return <PrepareCounter seconds={secondsTillStart} />;

  if (answer) {
    switch (roomInfo.currentQuestion.type) {
      case "numeric":
        return <NumericResults />;
    }
  }

  if (secondsTillEnd < -0.3) return;

  switch (roomInfo.currentQuestion.type) {
    case "numeric":
      return <NumericQuestion setAnswer={setAnswer} />;
  }
};
export default QuestionController;
