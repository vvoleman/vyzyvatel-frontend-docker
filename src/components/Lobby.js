import React, { useState, useEffect } from "react";
import USER_STATES from "../global/constants";

export default function Lobby({
  socket,
  username,
  roomCode,
  setUserState,
  setRoomCode,
  userState,
}) {
  const cancelRoom = () => {
    socket.emit("cancel-room", roomCode, username, (callback) => {
      if (callback === "ok") {
        setRoomCode(null);
        setUserState({ ...userState, isOwner: false, state: USER_STATES.MENU });
      }
    });
  };

  /*
  const sendMessage = async () => {
    if (username === "") {
      alert("you must enter username");
      return;
    }
    if (currMess !== "") {
      const messData = {
        room: room,
        author: username,
        message: currMess,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messData);
      setMessList((list) => [...list, messData]);
      setCurrMess("");
    }
  };
  */
  return (
    <div className="flex grow justify-center items-center bg-slate-900">
      <div className="w-full sm:rounded-lg shadow sm:border max-w-md  bg-slate-800 border-slate-600">
        <div className="space-y-6 p-7">
          <div className="text-white text-lg text-center">
            Kód místnosti:
            <div className="font-semibold text-2xl">
              {roomCode ? roomCode : ""}
            </div>
          </div>
          <button
            onClick={cancelRoom}
            type="submit"
            className="border-2 border-slate-400/40 w-full text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
          >
            Zrušit hru
          </button>
        </div>
      </div>
    </div>
  );
}
