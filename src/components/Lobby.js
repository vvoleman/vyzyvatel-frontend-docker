import React, { useState, useEffect, useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import Chat from "./Chat";
import LobbyPlayers from "./LobbyPlayers";
import ChooseCategories from "./ChooseCategories";

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
  const isPublic = useRef(false);

  useEffect(() => {
    if (copied === true) {
      setTimeout(function () {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  useEffect(() => {
    socket.on("user-update", (data) => {
      setRoomCode(data.roomCode);
      setUserState(data.userState);
    });

    socket.on("room-update", (data) => {
      setLobbyState(data.lobbyState);
    });
  }, [socket, setLobbyState, setRoomCode, setUserState]);

  const handleSlider = () => {
    socket.emit("update-room", roomCode, username, {
      ...lobbyState,
      public: isPublic.current,
    });
  };
  const cancelRoom = () => {
    socket.emit("cancel-room", roomCode, username);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", roomCode, username, (response) => {
      if (response) {
        setRoomCode(response.roomCode);
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
      }
    });
  };

  if (lobbyState)
    return (
      <div className="flex grow justify-center items-center bg-slate-900">
        <div className="sm:rounded-lg shadow sm:border w-full max-w-6xl bg-slate-800 border-slate-600">
          <div className="sm:space-y-6 p-7">
            <div className="text-white text-lg text-center">
              Kód pro připojení do hry
              <div className="flex justify-center">
                <button
                  className="flex ml-3 text-yellow-200 font-semibold text-2xl tracking-widest text-start items-center"
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(roomCode);
                  }}
                >
                  {roomCode ? roomCode : ""}
                  <FaCopy className="p-2 text-white/80" size={35} />
                  <div className="relative">
                    <p className="text-sm font-normal tracking-normal text-white/80 absolute top-[-12px]">
                      {copied ? "zkopírováno" : null}
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid sm:grid-rows-1 sm:grid-cols-3 grid-cols-1 grid-rows-3 gap-2 w-full">
              <ChooseCategories
                lobbyState={lobbyState}
                setLobbyState={setLobbyState}
                username={username}
                socket={socket}
                roomCode={roomCode}
              />
              <div className="grid grid-rows-2">
                <LobbyPlayers
                  lobbyState={lobbyState}
                  username={username}
                  socket={socket}
                  roomCode={roomCode}
                />
                {lobbyState["owner"] === username ? (
                  <div className="flex justify-center items-center text-white">
                    <div>
                      <div className="text-center m-2">
                        Zveřejnit hru pro všechny
                      </div>
                      <div className="flex justify-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value={isPublic}
                            id="default-toggle"
                            className="sr-only peer"
                            onChange={() => {
                              isPublic.current = !isPublic.current;
                              handleSlider();
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center text-white/70">
                    {lobbyState.public
                      ? "Kdokoliv se může připojit"
                      : "Přístup pouze přes kód"}
                  </div>
                )}
              </div>
              <Chat socket={socket} username={username} roomCode={roomCode} />
            </div>
            <div className="flex justify-center gap-5">
              {lobbyState["owner"] === username ? (
                <>
                  {lobbyState["players"].length < 3 ? (
                    <button
                      disabled
                      type="submit"
                      className="border-2 border-slate-400/40 sm:w-1/3 text-green-500/50 w-full bg-slate-900/50 font-semibold rounded-lg text-lg py-2.5 text-center"
                    >
                      Spustit hru
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="border-2 border-slate-400/40 sm:w-1/3 text-green-500 w-full bg-slate-900/50 font-semibold rounded-lg text-lg py-2.5 text-center"
                    >
                      Spustit hru
                    </button>
                  )}

                  <button
                    onClick={cancelRoom}
                    type="submit"
                    className="border-2 border-slate-400/40 sm:w-1/3 w-full text-rose-500 bg-slate-900/50 font-semibold rounded-lg text-lg py-2.5 text-center"
                  >
                    Zrušit
                  </button>
                </>
              ) : (
                <button
                  onClick={leaveRoom}
                  type="submit"
                  className="border-2 border-slate-400/40 sm:w-1/3 w-full text-rose-500 bg-slate-900/50 font-semibold rounded-lg text-lg py-2.5 text-center"
                >
                  Opustit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else return <LoadingScreen />;
}
