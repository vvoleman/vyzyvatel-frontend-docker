import React, { useRef, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import SocketContext from "../../context/SocketContext";
import AuthContext from "../../context/AuthContext";

export default function ChooseCategories() {
  const { username } = useContext(AuthContext);
  const { lobbyState, socketUpdateRoom } = useContext(SocketContext);

  const checkedAll = useRef(true);

  const updateCategory = (id) => {
    let categories = lobbyState.categories;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        categories[i] = { ...categories[i], active: !categories[i]["active"] };
      }
    }
    socketUpdateRoom({
      ...lobbyState,
      categories: categories,
    });
  };

  const updateAllCategories = () => {
    let categories = lobbyState.categories;
    for (let i = 0; i < categories.length; i++) {
      categories[i] = { ...categories[i], active: checkedAll.current };
    }
    socketUpdateRoom({
      ...lobbyState,
      categories: categories,
    });
  };

  return (
    <div className="border rounded-md border-slate-500 py-2 px-4 bg-gradient-to-r from-slate-900/30 to-slate-900/50">
      <ScrollToBottom className="categories-container text-white">
        <div className="text-white/100 text-center text-md">Výběr témat</div>
        {lobbyState.owner === username ? (
          <div
            key="0"
            className="flex justify-between border rounded-md my-2 px-1 py-0.5 border-slate-200/20 bg-slate-800"
          >
            <div className="p-2 py-1">Vybrat vše</div>
            <div className="p-2 py-1 flex items-center">
              {lobbyState.owner === username ? (
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
        {lobbyState.categories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex justify-between border rounded-md my-2 px-1 py-0.5 border-slate-200/50 bg-slate-800"
            >
              <div className="p-2 py-1">{category.name}</div>
              <div className="p-2 py-1 flex items-center">
                {lobbyState.owner === username ? (
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
