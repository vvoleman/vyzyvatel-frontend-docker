import React, { useState, useEffect, useRef, useContext } from "react";
import NumericQuestion from "./Numeric/NumericQuestion";
import SocketContext from "../../../context/SocketContext";
import PrepareCounter from "./PrepareCounter";
import useCurrentTime from "../../../hooks/useCurrentTime";
import NumericResults from "./Numeric/NumericResults";

const QuestionController = () => {
  const { roomInfo, socketAnswerQuestion } = useContext(SocketContext);
  const currentTime = useCurrentTime();

  const [secondsTillStart, setSecondsTillStart] = useState(9999);
  const [secondsTillEnd, setSecondsTillEnd] = useState(9999);

  const [answer, setAnswer] = useState(null);
  const answerSent = useRef(false);

  useEffect(() => {
    console.log("answer", answer);
  }, [answer]);

  useEffect(() => {
    if (answerSent.current === true) return;

    if (!answer) return;

    socketAnswerQuestion(answer);
    answerSent.current = true;
  }, [answer]);

  useEffect(() => {
    if (!roomInfo.currentQuestion) return;

    setSecondsTillStart(
      parseInt(
        parseInt(roomInfo.currentQuestion.startTime - currentTime) / 1000 + 1
      )
    );

    setSecondsTillEnd((roomInfo.currentQuestion.endTime - currentTime) / 1000);
  }, [currentTime, roomInfo.currentQuestion]);

  if (!roomInfo.currentQuestion) return null;

  if (secondsTillStart > 3) return;

  if (secondsTillStart >= 1)
    return <PrepareCounter seconds={secondsTillStart} />;

  // user already answered
  if (answer || secondsTillEnd < -0.3) {
    switch (roomInfo.currentQuestion.type) {
      case "numeric":
        return <NumericResults answer={answer} />;
    }
  }

  if (secondsTillEnd < -0.3) {
    return;
  }

  // user has not answered yet and time is not up
  switch (roomInfo.currentQuestion.type) {
    case "numeric":
      return <NumericQuestion setAnswer={setAnswer} />;
  }
};
export default QuestionController;
