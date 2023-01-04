import React, { useState, useContext } from "react";

import SocketContext from "../../context/SocketContext";
import LoadingScreen from "../LoadingScreen";
import MapSVG from "../../components/MapSVG";
import GamePlayers from "./GamePlayers";
import GameChat from "./GameChat";
import GameQueue from "./GameQueue";
import GameStatus from "./GameStatus";
import QuestionController from "./Questions/QuestionController";
import PickRegionController from "./PickRegionController";

export default function Game() {
  const { roomInfo } = useContext(SocketContext);

  const currentGameContent = () => {
    if (roomInfo.currentQuestion) return <QuestionController />;
    if (roomInfo.currentPick) return <PickRegionController />;
  };

  if (roomInfo.map)
    return (
      <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
        <div className="relative w-full max-w-6xl ml-[8%]">
          <MapSVG roomInfo={roomInfo} />
        </div>
        <GameStatus roomInfo={roomInfo} />
        <GamePlayers />
        <GameChat />
        <GameQueue />
        {currentGameContent()}
      </div>
    );
  return <LoadingScreen />;
}

// border border-slate-800
