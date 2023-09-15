import { FC, useEffect, useState } from 'react';

interface TimerProps {
  initialSeconds: number;
}

const Timer: FC<TimerProps> = ({ initialSeconds}) => {
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
    console.log()
    return () => {
      clearInterval(timer);
    };
  }, [seconds, ]);

  return (
    displayTimer ? (
      <p>Дані оновляться через: {seconds} сек.</p>
    ) : (
      <p>Наступні дані будуть через хвилину</p>
    )
  );
};

export default Timer;