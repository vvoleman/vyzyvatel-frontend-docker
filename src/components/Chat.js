import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, username, roomCode }) {
  const [currMess, setCurrMess] = useState("");
  const [messList, setMessList] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(JSON.stringify(data));
      setMessList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currMess !== "") {
      const messData = {
        author: username,
        message: currMess,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send-message", messData, username, roomCode);
      setMessList((list) => [...list, messData]);
      setCurrMess("");
    }
  };
  return (
    <div className="border rounded-md border-slate-500 p-2 bg-gradient-to-r from-slate-900/50 to-slate-900/30">
      <ScrollToBottom className="message-container">
        <div className="text-white/80 text-center text-sm">Chat místnosti</div>
        {messList.map((messContent, index) => {
          return (
            <div
              key={index}
              className={`flex text-white ${
                messContent.author === username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="m-1">
                {messContent.author !== username ? (
                  <div className="text-xs flex">
                    <div className="mr-1 mb-0.5"> {messContent.author} </div>
                    <div className="text-gray-400">{messContent.time}</div>
                  </div>
                ) : null}
                <div
                  className={`break-words border border-slate-800/80 w-fit max-w-[240px] p-1 px-3 rounded-lg text-white ${
                    messContent.author === username
                      ? "bg-blue-500"
                      : "bg-slate-500"
                  }`}
                >
                  {messContent.message}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="flex justify-center">
        <div className="w-full">
          <input
            className="border-b border-l border-t p-1 w-full rounded-l-md bg-slate-200 border-slate-400"
            value={currMess}
            type="text"
            onChange={(e) => {
              setCurrMess(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </div>
        <div className="">
          <button
            className="border p-1 px-2 w-full border-slate-400 rounded-r-md bg-slate-500 text-white font-semibold"
            onClick={sendMessage}
          >
            odeslat
          </button>
        </div>
      </div>
    </div>
  );
}
