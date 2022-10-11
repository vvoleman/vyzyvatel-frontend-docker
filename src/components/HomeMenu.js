import React, { useCallback, useEffect, useState } from "react";
import PublicRooms from "./PublicRooms";

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
  const [publicRooms, setPublicRooms] = useState(null);

  const getPublicRooms = useCallback(() => {
    socket.emit("public-rooms", (response) => {
      if (response) {
        setPublicRooms(response);
      }
    });
  }, [socket]);

  const joinPublicRoom = (roomCode) => {
    socket.emit("join-room", roomCode, username, (response) => {
      if (response === "404") {
        setCodeError("chybný kód");
        return;
      } else if (response === "full") {
        setCodeError("hra je plná");
        return;
      } else if (response === "banned") {
        setCodeError("v této hře nejste vítán/a");
        return;
      }
      setRoomCode(response.roomCode);
      setUserState(response.userState);
      setLobbyState(response.lobbyState);
      setCodeError(null);
    });
  };

  const joinRoom = useCallback(() => {
    socket.emit("join-room", code, username, (response) => {
      if (response === "404") {
        setCodeError("chybný kód");
        return;
      } else if (response === "full") {
        setCodeError("hra je plná");
        return;
      } else if (response === "banned") {
        setCodeError("v této hře nejste vítán/a");
        return;
      }
      setRoomCode(response.roomCode);
      setUserState(response.userState);
      setLobbyState(response.lobbyState);
      setCodeError(null);
    });
  }, [code, setLobbyState, setRoomCode, socket, username, setUserState]);

  useEffect(() => {
    if (publicRooms == null) {
      getPublicRooms();
    }
  }, [publicRooms, getPublicRooms]);

  useEffect(() => {
    setCodeError(null);

    if (code.length === 4) {
      joinRoom();
    }
  }, [code, setCodeError, joinRoom]);

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

  return (
    <div className="flex grow justify-center items-center bg-slate-900">
      <div className="sm:rounded-lg shadow sm:border w-full max-w-4xl  bg-slate-800 border-slate-600">
        <div className="space-y-6 p-7">
          <div className="flex justify-center">
            <button
              onClick={createRoom}
              type="submit"
              className="border-2 border-slate-400/40 w-64 text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
            >
              Vytvořit hru
            </button>
          </div>
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
                onFocus={() => setCode("")}
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
          <hr className="border border-slate-400/60" />
          <div>
            <div className="flex justify-center text-xl text-white font-semibold mb-2">
              Veřejné hry
            </div>
            <PublicRooms
              publicRooms={publicRooms}
              joinPublicRoom={joinPublicRoom}
              getPublicRooms={getPublicRooms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
