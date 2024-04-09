import { FC, useEffect, useState } from "react";

interface TimerProps {
  initialSeconds: number;
}

const Timer: FC<TimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [displayTimer, setDisplayTimer] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      setDisplayTimer(false);
    }
    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return displayTimer ? (
    <p>The data will be updated through: {seconds} sec.</p>
  ) : (
    <p>The next data will be in a minute</p>
  );
};

export default Timer;
