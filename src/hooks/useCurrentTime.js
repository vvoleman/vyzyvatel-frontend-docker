import { useState, useEffect } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

export default useCurrentTime;
