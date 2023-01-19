import { useContext, useEffect, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { GAME_STATES } from "../../../constants";
import AuthContext from "../../../context/AuthContext";
import { BsInfoSquare } from "react-icons/bs";
import { motion } from "framer-motion";
import HintTimer from "./HintTimer";
import GamePickQueue from "./GamePickQueue";
import GameAttackQueue from "./GameAttackQueue";

import { PLAYER_COLORS } from "../../../constants";

const GameHint = () => {
  const { username } = useContext(AuthContext);
  const { roomInfo } = useContext(SocketContext);

  const [element, setElement] = useState(null);
  const [warn, setWarn] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    switch (roomInfo.gameState) {
      case GAME_STATES.START:
        setElement("Hra brzy začne...");
        setWarn(true);
        setShowTimer(true);
        break;

      case GAME_STATES.QUESTION_GUESS:
        if (roomInfo.currentQuestion.involvedPlayers.length === 3)
          setElement("Otázka všichni proti všem");
        else
          setElement(
            <div>
              <span
                style={{
                  color:
                    PLAYER_COLORS[
                      roomInfo.playerColors[roomInfo.currentAttack.attacker]
                    ],
                }}
                className="font-semibold"
              >
                {roomInfo.currentAttack.attacker}
              </span>{" "}
              napadá{" "}
              <span
                style={{
                  color:
                    PLAYER_COLORS[
                      roomInfo.playerColors[roomInfo.currentAttack.defender]
                    ],
                }}
                className="font-semibold"
              >
                {roomInfo.currentAttack.defender}
              </span>
            </div>
          );
        setWarn(false);
        setShowTimer(false);
        break;

      case GAME_STATES.QUESTION_RESULTS:
        setElement("Výsledky otázky");
        setWarn(false);
        setShowTimer(false);
        break;

      case GAME_STATES.REGION_PICK:
        if (roomInfo.currentPick.username === username)
          setElement("Vyber si kraj!");
        else {
          setElement(
            <div>
              <span
                style={{
                  color:
                    PLAYER_COLORS[
                      roomInfo.playerColors[roomInfo.currentPick.username]
                    ],
                }}
                className="font-semibold"
              >
                {roomInfo.currentPick.username}
              </span>{" "}
              si vybírá kraj
            </div>
          );
        }
        setWarn(roomInfo.currentPick.username === username);
        setShowTimer(true);
        break;

      case GAME_STATES.REGION_RESULTS:
        setElement("Aktualizace mapy");
        setWarn(false);
        setShowTimer(false);
        break;

      case GAME_STATES.REGION_ATTACK:
        if (roomInfo.currentAttack.attacker === username)
          setElement("Zaútoč na kraj!");
        else {
          setElement(
            <div>
              <span
                style={{
                  color:
                    PLAYER_COLORS[
                      roomInfo.playerColors[roomInfo.currentAttack.attacker]
                    ],
                }}
                className="font-semibold"
              >
                {roomInfo.currentAttack.attacker}
              </span>{" "}
              si vybírá kraj na útok
            </div>
          );
        }
        setWarn(roomInfo.currentAttack.attacker === username);
        setShowTimer(true);
        break;

      default:
        break;
    }
  }, [roomInfo, username]);

  return (
    <>
      {roomInfo.pickRegionQueue ? <GamePickQueue roomInfo={roomInfo} /> : null}
      {roomInfo.attackRegionQueue ? (
        <GameAttackQueue roomInfo={roomInfo} />
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.4 }}
        key={element}
        className="blocker absolute top-[10%] right-[4%] text-slate-100 text-lg w-[400px] h-[280px] flex justify-center items-center"
      >
        <motion.div
          className="border rounded-lg p-2 opacity-95 bg-slate-800/70 shadow-xl shadow-black/60 w-fit min-w-[280px]"
          animate={{ y: [0, warn === true ? -10 : 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <div className="flex justify-center items-center max-w-[400px]">
            <BsInfoSquare className="mx-1.5" size={20} />
            {element}
          </div>
          {showTimer === true ? (
            <HintTimer
              startTime={roomInfo.startTime}
              endTime={roomInfo.endTime}
              warn={warn}
            />
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
};

export default GameHint;
