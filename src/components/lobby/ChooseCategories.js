import React, { useRef, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import SocketContext from "../../context/SocketContext";
import AuthContext from "../../context/AuthContext";

export default function ChooseCategories() {
  const { username } = useContext(AuthContext);
  const { roomInfo, socketUpdateRoom } = useContext(SocketContext);

  const checkedAll = useRef(true);

  const updateCategory = (id) => {
    let categories = roomInfo.categories;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        categories[i] = { ...categories[i], active: !categories[i]["active"] };
      }
    }
    socketUpdateRoom({
      ...roomInfo,
      categories: categories,
    });
  };

  const updateAllCategories = () => {
    let categories = roomInfo.categories;
    for (let i = 0; i < categories.length; i++) {
      categories[i] = { ...categories[i], active: checkedAll.current };
    }
    socketUpdateRoom({
      ...roomInfo,
      categories: categories,
    });
  };

  return (
    <div className="border rounded-md border-slate-500 py-2 px-4 bg-gradient-to-r from-slate-900/30 to-slate-900/50">
      <ScrollToBottom className="categories-container text-white">
        <div className="text-white/100 text-center text-md">Výběr témat</div>
        {roomInfo.owner === username ? (
          <div
            key="0"
            className="flex justify-between border rounded-md my-2 px-1 py-0.5 border-slate-200/10 bg-slate-800 text-white/70"
          >
            <div className="p-2 py-1">Vybrat vše</div>
            <div className="p-2 py-1 flex items-center">
              {roomInfo.owner === username ? (
                <input
                  checked={checkedAll.current}
                  className="w-6 h-5"
                  type="checkbox"
                  onChange={() => {
                    checkedAll.current = !checkedAll.current;
                    updateAllCategories();
                  }}
                />
              ) : (
                <input className="w-6 h-5" type="checkbox" readOnly />
              )}
            </div>
          </div>
        ) : null}
        {roomInfo.categories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex justify-between border rounded-md my-2 px-1 py-0.5 border-slate-200/50 bg-slate-800"
            >
              <div className="p-2 py-1">{category.name}</div>
              <div className="p-2 py-1 flex items-center">
                {roomInfo.owner === username ? (
                  <input
                    className="w-6 h-5"
                    type="checkbox"
                    checked={category.active}
                    onChange={() => {
                      updateCategory(category.id);
                    }}
                  />
                ) : (
                  <input
                    className="w-6 h-5"
                    type="checkbox"
                    checked={category.active}
                    readOnly
                  />
                )}
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
  );
}
