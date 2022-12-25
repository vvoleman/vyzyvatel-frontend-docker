import React from "react";
import {
  BsCircleFill,
  BsFillCaretDownFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { PLAYER_COLORS } from "../../constants.js";

const Point = ({ color, current }) => {
  const circleSize = 25;
  return (
    <div className="p-2 text-white">
      {current === false ? (
        <BsCircleFill size={circleSize} color={color} />
      ) : (
        <>
          <BsFillArrowRightCircleFill
            size={circleSize}
            color={color}
            className="bg-black/80 rounded-full"
          />
          <div className="flex justify-center">
            <BsFillCaretDownFill size="34" className="absolute bottom-[28px]" />
          </div>
        </>
      )}
    </div>
  );
};

const GameQueue = () => {
  return (
    <div className="absolute text-white px-4 bottom-[14%] left-[84%]">
      <div className="bg-slate-600/80 rounded-full flex px-1">
        <Point color={PLAYER_COLORS.RED} current={false} />
        <Point color={PLAYER_COLORS.GREEN} current={true} />
        <Point color={PLAYER_COLORS.BLUE} current={false} />
      </div>
    </div>
  );
};

export default GameQueue;
