import { useContext } from "react";

import SocketContext from "../../context/SocketContext";
import LoadingScreen from "../LoadingScreen";
import MapSVG from "../Map";
import GamePlayers from "./GamePlayers";
import GameChat from "./GameChat";
import GameStatus from "./GameStatus";
import QuestionController from "./Questions/QuestionController";
import GameHint from "./hint/GameHint";
import AuthContext from "../../context/AuthContext";

export default function Game() {
  const { roomInfo } = useContext(SocketContext);
  const { username } = useContext(AuthContext);

  if (roomInfo.map)
    return (
      <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
        <div className="relative w-full max-w-6xl ml-[8%]">
          <MapSVG />
        </div>
        <GameStatus roomInfo={roomInfo} />
        <GamePlayers />
        <GameChat />
        <GameHint />
        {roomInfo.currentQuestion &&
        roomInfo.currentQuestion.involvedPlayers.includes(username) ? (
          <QuestionController />
        ) : null}
      </div>
    );
  return <LoadingScreen />;
}

// border border-slate-800
