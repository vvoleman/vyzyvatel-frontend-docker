import React, { useState } from "react";
import MapSVG from "../components/MapSVG";

const MapTest = () => {
  const [click, setClick] = useState(0);
  const [bodyClick, setBodyClick] = useState(0);
  const [centerClick, setCenterClick] = useState(0);

  return (
    <div
      className="flex grow justify-center items-center bg-slate-900 text-white/50"
      onClick={() => {
        console.log("click");
        setClick((prev) => prev + 1);
      }}
    >
      <div className="w-7/12">
        <div className="text-white text-2xl">click: {click}</div>
        <div className="text-white text-2xl">
          Středočeský click: {bodyClick}
        </div>
        <div className="text-white text-2xl">Praha click: {centerClick}</div>
        <MapSVG
          setClick={setBodyClick}
          setCenter={setCenterClick}
          stred={bodyClick}
          praha={centerClick}
        />
      </div>
    </div>
  );
};

export default MapTest;
