import { useState, useEffect, useRef, useContext } from "react";
import NumericQuestion from "./Numeric/NumericQuestion";
import NumericResults from "./Numeric/NumericResults";
import PickQuestion from "./Pick/PickQuestion";
import PickResults from "./Pick/PickResults";
import ImageQuestion from "./Image/ImageQuestion";
import ImageResults from "./Image/ImageResults";

import SocketContext from "../../../context/SocketContext";
import PrepareCounter from "./PrepareCounter";
import useCurrentTime from "../../../hooks/useCurrentTime";
import { motion } from "framer-motion";
import { GAME_STATES, QUESTION_TYPES } from "../../../constants";
import AuthContext from "../../../context/AuthContext";

const QuestionController = () => {
  const { username } = useContext(AuthContext);
  const { roomInfo, socketAnswerQuestion } = useContext(SocketContext);
  const currentTime = useCurrentTime();

  const [secondsTillStart, setSecondsTillStart] = useState(9999);
  const [secondsTillEnd, setSecondsTillEnd] = useState(9999);

  const [answer, setAnswer] = useState(null);
  const [submit, setSubmit] = useState(false);

  const answerSent = useRef(false);

  useEffect(() => {
    console.log("answer", answer);
  }, [answer]);

  useEffect(() => {
    setAnswer(null);
    setSubmit(false);
    answerSent.current = false;
  }, [roomInfo.currentQuestion.type]);

  useEffect(() => {
    if (roomInfo.currentQuestion.answers === undefined) return;

    let alreadyAnswered = false;

    roomInfo.currentQuestion.answers.forEach((ans) => {
      if (ans.username === username) {
        setAnswer(ans.answer);
        setSubmit(true);
      }
    });

    if (alreadyAnswered) {
      setSubmit(true);
    }
  }, [roomInfo]);

  useEffect(() => {
    if (submit === false) return;
    if (answerSent.current === true) return;
    if (answer === null) return;

    console.log("sending answer submit button", answer);

    socketAnswerQuestion(answer, false);
    answerSent.current = true;
  }, [submit]);

  useEffect(() => {
    if (answerSent.current === true) return;
    if (answer === null) return;
    if (secondsTillEnd > 0.1) return;

    console.log("sending answer", answer);

    socketAnswerQuestion(answer, true);
    answerSent.current = true;
  }, [secondsTillEnd]);

  useEffect(() => {
    setSecondsTillStart(
      parseInt(parseInt(roomInfo.startTime - currentTime) / 1000 + 1)
    );

    setSecondsTillEnd((roomInfo.endTime - currentTime) / 1000);
  }, [currentTime, roomInfo.currentQuestion]);

  const content = () => {
    if (roomInfo.gameState === GAME_STATES.QUESTION_GUESS) {
      if (secondsTillStart > 3) return;

      if (secondsTillStart >= 1)
        return <PrepareCounter seconds={secondsTillStart} />;

      if (
        submit ||
        secondsTillEnd < 0 ||
        !roomInfo.currentQuestion.involvedPlayers.includes(username)
      ) {
        // user already answered
        switch (roomInfo.currentQuestion.type) {
          case QUESTION_TYPES.NUMERIC:
            return <NumericResults />;
          case QUESTION_TYPES.PICK:
            return <PickResults answer={answer} />;
          case QUESTION_TYPES.IMAGE:
            return <ImageResults answer={answer} />;
        }
      }

      // time is up
      if (secondsTillEnd < 0) {
        return;
      }

      // user has not answered yet and time is not up
      switch (roomInfo.currentQuestion.type) {
        case QUESTION_TYPES.NUMERIC:
          return (
            <NumericQuestion setAnswer={setAnswer} setSubmit={setSubmit} />
          );
        case QUESTION_TYPES.PICK:
          return <PickQuestion setAnswer={setAnswer} setSubmit={setSubmit} />;
        case QUESTION_TYPES.IMAGE:
          return <ImageQuestion setAnswer={setAnswer} setSubmit={setSubmit} />;
      }
    }
    switch (roomInfo.currentQuestion.type) {
      case QUESTION_TYPES.NUMERIC:
        return <NumericResults />;
      case QUESTION_TYPES.PICK:
        return <PickResults answer={answer} />;
      case QUESTION_TYPES.IMAGE:
        return <ImageResults answer={answer} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute w-full h-full bg-black/70 m-0 p-0 top-[0%] flex justify-center items-center transition-all z-20"
    >
      {content()}
    </motion.div>
  );
};
export default QuestionController;
