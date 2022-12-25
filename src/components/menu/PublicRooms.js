import React from "react";
import TextCategories from "./TextCategories";

export default function PublicRooms({
  publicRooms,
  socketJoinPublicRoom,
  setCodeError,
}) {
  if (publicRooms)
    return (
      <div className="text-white border-2 rounded-md border-slate-400/50 font-semibold">
        <div className="grid grid-cols-4 p-2 py-1">
          <div>Zakladatel</div>
          <div>Hráči</div>
          <div>Témata</div>
        </div>
        {publicRooms.map((room, idx) => {
          return (
            <div
              key={idx}
              className="grid grid-cols-4 p-2 py-1 border-t border-slate-400/50 text-slate-200 font-normal"
            >
              <div>{room.owner}</div>
              <div>{room.capacity}/3</div>
              <div>
                <TextCategories room={room} />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    socketJoinPublicRoom(room.roomCode, setCodeError);
                  }}
                  className="border border-slate-500 m-1 px-5 p-2 rounded-lg bg-slate-900/80 font-semibold text-slate-200"
                >
                  <div>připojit</div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
}
