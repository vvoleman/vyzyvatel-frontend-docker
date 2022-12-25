import React, { useContext } from "react";
import { Gravatar } from "../Gravatar";

import AuthContext from "../../context/AuthContext";
import SocketContext from "../../context/SocketContext";

export default function GamePlayers() {
  const { username } = useContext(AuthContext);
  const { roomInfo } = useContext(SocketContext);

  const totalScore = (player) => {
    let total = 0;
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(roomInfo.map)) {
      if (value.owner === player) total += value.price;
    }
    return total;
  };

  return (
    <>
      <div className="absolute hidden 2xl:block text-white px-4 top-[10%] left-[2%]">
        {roomInfo.players.map((player, idx) => {
          let email = idx < roomInfo.emails.length ? roomInfo.emails[idx] : "";
          return (
            <div
              key={idx}
              style={{
                borderColor: roomInfo.playersColor[player],
              }}
              className="flex items-center text-lg justify-between rounded-2xl pb-1.5 pt-1 pl-2 border-2 my-2 w-72 opacity-95"
            >
              <div className="flex items-center">
                <Gravatar
                  className="m-2 border-2 rounded-full"
                  style={{
                    borderColor: roomInfo.playersColor[player],
                  }}
                  email={email}
                  size={46}
                />
                <div
                  className={`m-2 text-grey ${
                    player === username ? "font-semibold" : null
                  }`}
                >
                  {player}
                </div>
              </div>
              <div className="m-2 px-2 font-semibold">
                {totalScore(player)}{" "}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute 2xl:hidden flex text-white px-4 top-[10%] left-[2%]">
        {roomInfo.players.map((player, idx) => {
          let email = idx < roomInfo.emails.length ? roomInfo.emails[idx] : "";
          return (
            <div
              key={idx}
              style={{
                borderColor: roomInfo.playersColor[player],
              }}
              className="flex items-center text-lg justify-between rounded-2xl pb-1.5 pt-1 pl-2 border-2 my-2 w-72 opacity-95 mx-5"
            >
              <div className="flex items-center">
                <Gravatar
                  className="m-2 border-2 rounded-full"
                  style={{
                    borderColor: roomInfo.playersColor[player],
                  }}
                  email={email}
                  size={46}
                />
                <div
                  className={`m-2 text-grey ${
                    player === username ? "font-semibold" : null
                  }`}
                >
                  {player}
                </div>
              </div>
              <div className="m-2 px-2 font-semibold">
                {totalScore(player)}{" "}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
