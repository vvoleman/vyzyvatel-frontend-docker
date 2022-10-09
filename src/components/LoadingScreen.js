import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingScreen() {
  const [timer, setTimer] = useState(0);
  const loading = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.1);
      if (timer > 0.5) {
        loading.current = true;
      }
    }, 100);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
      {loading.current ? (
        <AiOutlineLoading size={120} className="sm:mr-5 mr-1 animate-spin" />
      ) : null}
    </div>
  );
}
