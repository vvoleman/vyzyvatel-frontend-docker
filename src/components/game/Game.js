import React, { useState, useEffect, useRef, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import SocketContext from "../../context/SocketContext";

import LoadingScreen from "../LoadingScreen";
import MapSVG from "../../components/MapSVG";
import GamePlayers from "./GamePlayers";
import GameChat from "./GameChat";
import GameQueue from "./GameQueue";
import GameStatus from "./GameStatus";
import QuestionController from "./Questions/QuestionController";

export default function Game() {
  const { username } = useContext(AuthContext);
  const { userInfo, roomInfo } = useContext(SocketContext);
  const [kraj, setKraj] = useState(null);

  if (roomInfo.map)
    return (
      <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
        <div className="relative w-full max-w-6xl ml-[8%]">
          <MapSVG setKraj={setKraj} kraj={kraj} roomInfo={roomInfo} />
        </div>
        <GameStatus roomInfo={roomInfo} />
        <GamePlayers />
        <GameChat />
        <GameQueue />
        <QuestionController />
      </div>
    );
  return <LoadingScreen />;
}

// border border-slate-800
