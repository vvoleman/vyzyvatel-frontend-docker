import React, { useState, useEffect } from "react";
import USER_STATES from "../global/constants";
import LoadingScreen from "./LoadingScreen";

import { FaCopy } from "react-icons/fa";

export default function Lobby({
  socket,
  username,
  roomCode,
  setUserState,
  setRoomCode,
  userState,
  lobbyState,
  setLobbyState,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    socket.on("user-update", (data) => {
      setRoomCode(data.roomCode);
      setUserState(data.userState);
      console.log("userUpdate: " + JSON.stringify(data));
    });

    socket.on("room-update", (data) => {
      setLobbyState(data.lobbyState);
      console.log("lobbyUpdate: " + JSON.stringify(data));
    });
  }, [socket, setLobbyState, setRoomCode, setUserState]);

  const cancelRoom = () => {
    socket.emit("cancel-room", roomCode, username);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", roomCode, username);
  };

  const showPlayers = () => {
    return (
      <div className="text-white">
        PLAYERS:{" "}
        {lobbyState.players.map((player, idx) => {
          let text = player;
          if (idx !== lobbyState.players.length - 1) return text + ", ";
          return text;
        })}
      </div>
    );
  };

  if (lobbyState)
    return (
      <div className="flex grow justify-center items-center bg-slate-900">
        <div className="w-full sm:rounded-lg shadow sm:border max-w-md  bg-slate-800 border-slate-600">
          <div className="space-y-6 p-7">
            <div className="text-white text-lg text-center">
              Kód pro připojení do hry:
              <div className="flex sm:justify-start justify-center">
                <button
                  className="flex sm:ml-40 text-yellow-200 font-semibold text-2xl tracking-widest text-start items-center"
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(roomCode);
                  }}
                >
                  {roomCode ? roomCode : ""}
                  <FaCopy className="p-2 text-white/80" size={35} />
                  <p className="text-sm font-normal tracking-normal text-green-300/80">
                    {copied ? "zkopírováno" : null}
                  </p>
                </button>
              </div>
            </div>
            {lobbyState["players"] ? showPlayers() : null}
            {lobbyState["owner"] === username ? (
              <button
                onClick={cancelRoom}
                type="submit"
                className="border-2 border-slate-400/40 w-full text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
              >
                Zrušit hru
              </button>
            ) : (
              <button
                onClick={leaveRoom}
                type="submit"
                className="border-2 border-slate-400/40 w-full text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
              >
                Opustit hru
              </button>
            )}
          </div>
        </div>
      </div>
    );
  else return <LoadingScreen />;
}
