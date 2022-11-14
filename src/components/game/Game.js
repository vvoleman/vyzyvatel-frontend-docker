import React, { useState, useEffect, useRef, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import SocketContext from "../../context/SocketContext";

import LoadingScreen from "../LoadingScreen";
import MapSVG from "../../components/MapSVG";
import GamePlayers from "./GamePlayers";

export default function Game() {
  const { username } = useContext(AuthContext);
  const { userInfo, roomInfo } = useContext(SocketContext);
  const [kraj, setKraj] = useState(null);

  if (roomInfo.map)
    return (
      <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
        <div className="relative w-7/12 border">
          <MapSVG setKraj={setKraj} kraj={kraj} roomInfo={roomInfo} />
        </div>
        <GamePlayers />
      </div>
    );
  return <LoadingScreen />;
}
