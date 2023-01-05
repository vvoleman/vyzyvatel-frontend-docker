import React, { useState, useEffect, useRef, useContext } from "react";
import NumericQuestion from "./Numeric/NumericQuestion";
import SocketContext from "../../../context/SocketContext";
import PrepareCounter from "./PrepareCounter";
import useCurrentTime from "../../../hooks/useCurrentTime";
import NumericResults from "./Numeric/NumericResults";
import { motion } from "framer-motion";

const QuestionController = () => {
  const { roomInfo, socketAnswerQuestion } = useContext(SocketContext);
  const currentTime = useCurrentTime();

  const [secondsTillStart, setSecondsTillStart] = useState(9999);
  const [secondsTillEnd, setSecondsTillEnd] = useState(9999);

  const [answer, setAnswer] = useState(null);
  const [submit, setSubmit] = useState(false);

  const answerSent = useRef(false);

  useEffect(() => {
    if (submit === false) return;
    if (answerSent.current === true) return;
    if (answer === null) return;

    socketAnswerQuestion(answer);
    answerSent.current = true;
  }, [setSubmit]);

  useEffect(() => {
    if (answerSent.current === true) return;
    if (answer === null) return;
    if (secondsTillEnd > 0.5) return;

    console.log("sending answer", answer);

    socketAnswerQuestion(answer);
    answerSent.current = true;
  }, [secondsTillEnd]);

  useEffect(() => {
    if (!roomInfo.currentQuestion) return;

    setSecondsTillStart(
      parseInt(
        parseInt(roomInfo.currentQuestion.startTime - currentTime) / 1000 + 1
      )
    );

    setSecondsTillEnd((roomInfo.currentQuestion.endTime - currentTime) / 1000);
  }, [currentTime, roomInfo.currentQuestion]);

  const content = () => {
    if (!roomInfo.currentQuestion) return null;

    if (secondsTillStart > 3) return;

    if (secondsTillStart >= 1)
      return <PrepareCounter seconds={secondsTillStart} />;

    // user already answered
    if (submit || secondsTillEnd < -0.3) {
      switch (roomInfo.currentQuestion.type) {
        case "numeric":
          return <NumericResults />;
      }
    }

    if (secondsTillEnd < -0.3) {
      return;
    }

    // user has not answered yet and time is not up
    switch (roomInfo.currentQuestion.type) {
      case "numeric":
        return <NumericQuestion setAnswer={setAnswer} setSubmit={setSubmit} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute w-full h-full bg-black/70 m-0 p-0 top-[0%] flex justify-center items-center transition-all"
    >
      {content()}
    </motion.div>
  );
};
export default QuestionController;
