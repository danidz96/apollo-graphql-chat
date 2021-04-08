import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['week', 604000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const milliseconds = new Date(timestamp).getTime();
  const elapsed = (milliseconds - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

const getTime = (timestamp, unit) => {
  if (!timestamp) {
    return null;
  }
  const date = new Date(timestamp);

  if (unit === 'second' || unit === 'minute' || unit === 'hour') {
    return `${date.getHours()}:${date.getMinutes()}`;
  } else if (unit === 'day') {
    return WEEKDAY[date.getDay()];
  } else {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }
};

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeago(newTimeAgo);
    }, 1000 * 60 * 60 * 60);

    return () => clearInterval(interval);
  }, [timestamp]);

  const { unit } = timeago;
  return getTime(timestamp, unit);
}
