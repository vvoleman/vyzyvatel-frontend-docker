import React from "react";
import { FiStar } from "react-icons/fi";
import { MdCancelPresentation } from "react-icons/md";

export default function LobbyPlayers({
  socket,
  roomCode,
  lobbyState,
  username,
}) {
  const kickPlayer = (player) => {
    socket.emit("kick-room", roomCode, username, player);
  };

  return (
    <div className="text-white px-4">
      <div className="text-center p-1 text-md">
        Připojení hráči
        <span className="ml-2 font-semibold">
          ({lobbyState.players.length}/3)
        </span>
      </div>
      {lobbyState.players.map((player, idx) => {
        return (
          <div
            key={idx}
            className={`flex items-end text-lg justify-center rounded-lg pb-2.5 pt-1.5 border my-2 ${
              player === username
                ? "border-white font-semibold"
                : "border-slate-400"
            } `}
          >
            {idx === 0 ? (
              <div className="absolute">
                <FiStar className="ml-0 m-1 relative right-[36px]" size={18} />
              </div>
            ) : null}
            {player}
            {idx !== 0 && username === lobbyState.owner ? (
              <div className="relative">
                <button
                  className="absolute text-rose-400 top-[-25px] left-[10px]"
                  onClick={() => {
                    kickPlayer(player);
                  }}
                >
                  <MdCancelPresentation size={25} />
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
