import React, { useEffect, useState } from "react";
import USER_STATES from "../global/constants";

export default function HomeMenu({
  socket,
  username,
  userState,
  setUserState,
  setRoomCode,
}) {
  const [code, setCode] = useState("");

  const handleCode = (e) => {
    e.preventDefault();

    if (e.target.value.length <= 4) setCode(e.target.value.toUpperCase());
  };

  const createRoom = () => {
    socket.emit("create-room", username, (response) => {
      if (response) {
        setRoomCode(response);
        setUserState({ ...userState, isOwner: true, state: USER_STATES.LOBBY });
      }
    });
  };

  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join-room", code);
    };

    if (code.length === 4) {
      joinRoom();
    }
  }, [code, socket]);

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
          <label htmlFor="code" className="userdata-label text-center">
            Kód do hry
          </label>
          <input
            value={code}
            type="text"
            name="code"
            placeholder="CODE"
            className={`userdata-input`}
            onChange={handleCode}
          />
        </div>
      </div>
    </div>
  );
}
