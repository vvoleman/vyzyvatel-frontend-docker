import React, { useEffect, useState } from "react";
import USER_STATES from "../global/constants";

export default function HomeMenu({
  socket,
  username,
  userState,
  setUserState,
  setRoomCode,
  setLobbyState,
}) {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);

  const handleCode = (e) => {
    e.preventDefault();

    if (e.target.value.length <= 4) setCode(e.target.value.toUpperCase());
  };

  const createRoom = () => {
    socket.emit("create-room", username, (response) => {
      if (response) {
        setRoomCode(response.roomCode);
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
      }
    });
  };

  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join-room", code, username, (response) => {
        if (response === "404") {
          setCodeError("chybný kód");
          return;
        }
        setRoomCode(response.roomCode);
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
        setCodeError(null);
      });
    };

    setCodeError(null);

    if (code.length === 4) {
      joinRoom();
    }
  }, [
    code,
    socket,
    setCodeError,
    setLobbyState,
    setRoomCode,
    setUserState,
    username,
  ]);

  return (
    <div className="flex grow justify-center items-center bg-slate-900">
      <div className="w-full sm:rounded-lg shadow sm:border max-w-md  bg-slate-800 border-slate-600">
        <div className="space-y-6 p-7">
          <button
            onClick={createRoom}
            type="submit"
            className="border-2 border-slate-400/40 w-full text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
          >
            Vytvořit hru
          </button>
          <hr className="border border-slate-400/60" />
          <div className="flex justify-center">
            <div>
              <label
                htmlFor="code"
                className="userdata-label text-center text-xl"
              >
                Připojit se do hry
              </label>
              <input
                value={code}
                type="text"
                name="code"
                placeholder="vložte kód"
                className={`tracking-widest border text-xl w-40 rounded-lg block text-center p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white`}
                onChange={handleCode}
              />
            </div>
          </div>
          <div className="text-center text-rose-500/90 text-lg te">
            {codeError ? codeError : null}
          </div>
        </div>
      </div>
    </div>
  );
}
