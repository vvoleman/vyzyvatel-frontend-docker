import React, { useState } from "react";
import MapSVG from "../components/MapSVG";

const MapTest = () => {
  const [kraj, setKraj] = useState(null);

  return (
    <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
      <div className="w-7/12">
        <div className="text-white text-2xl">{kraj}</div>
        <MapSVG setKraj={setKraj} kraj={kraj} />
      </div>
    </div>
  );
};

export default MapTest;
