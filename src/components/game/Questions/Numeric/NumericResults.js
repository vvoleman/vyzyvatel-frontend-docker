import React, { useContext } from "react";
import SocketContext from "../../../../context/SocketContext";
import { Gravatar } from "../../../Gravatar";
import { BsClock } from "react-icons/bs";
import { IoMdStats } from "react-icons/io";

const NumericResults = ({ answer }) => {
  const { roomInfo } = useContext(SocketContext);

  if (!roomInfo.currentQuestion.answers)
    return (
      <div className="absolute w-full h-full bg-black/75 m-0 p-0 top-[0%] flex justify-center items-center transition-all">
        <div className="border-white/40 p-2 border-2 rounded-md bg-slate-900/70 text-white drop-shadow-[0_1px_40px_rgba(0,0,0,0.5)]">
          {answer ? answer : "nic"}
        </div>
      </div>
    );

  return (
    <div className="absolute w-full h-full bg-black/75 m-0 p-0 top-[0%] flex justify-center items-center transition-all">
      <div className="border-white/40 border-2 rounded-md bg-slate-900/70 text-white drop-shadow-[0_1px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center items-center p-2 bg-slate-200 rounded-t-md">
          <div className="text-3xl text-slate-900 font-normal px-4 py-2">
            {roomInfo.currentQuestion.question}
          </div>
        </div>
        <div className="flex justify-center items-center p-2 bg-slate-100 text-3xl font-semibold text-black border-t-2 border-slate-400/50">
          {roomInfo.currentQuestion.rightAnswer}
        </div>
        <div className="flex justify-center items-center my-2">
          {roomInfo.currentQuestion.answers.map((ans) => (
            <div className="border-2 m-2 mx-4 rounded-lg border-slate-500">
              <div className="flex justify-start items-center bg-slate-700 rounded-t-lg">
                <Gravatar
                  style={{
                    borderColor: roomInfo.playersColor[ans.username],
                  }}
                  className={`ml-3 m-2 border-2 rounded-full`}
                  email={
                    roomInfo.emails[ans.username]
                      ? roomInfo.emails[ans.username]
                      : ""
                  }
                  size={36}
                />
                <div className="text-lg pr-2">{ans.username}</div>
              </div>
              <div
                className="flex justify-center items-center text-black text-2xl font-bold p-1 border-y border-slate-300/50"
                style={{
                  backgroundColor: roomInfo.playersColor[ans.username],
                }}
              >
                {ans.answer}
              </div>
              <div className="flex justify-between items-center gap-10 bg-slate-600/80 rounded-b-lg">
                <div className="flex justify-center items-center">
                  <IoMdStats size={20} className="m-1.5" />
                  <p className="">{ans.difference}</p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="">
                    {Math.round(
                      (ans.time - roomInfo.currentQuestion.startTime) / 10
                    ) / 100}
                  </p>
                  <BsClock size={20} className="m-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumericResults;
