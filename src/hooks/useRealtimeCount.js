import { useEffect, useState } from "react";

export const useRealtimeCount = ({
  socketCount,
  connected,
  fetchCountApi,
}) => {
  const [count, setCount] = useState(0);

  const loadCount = async () => {
    try {
      const data = await fetchCountApi();
      setCount(data || 0);
    } catch (err) {
      console.error("Failed to fetch count", err);
    }
  };

  // initial load
  useEffect(() => {
    loadCount();
  }, []);

  // websocket update
  useEffect(() => {
    if (typeof socketCount === "number") {
      setCount(socketCount);
    }
  }, [socketCount]);

  // fallback polling
  useEffect(() => {
    if (connected) return;

    const interval = setInterval(loadCount, 60000);
    return () => clearInterval(interval);
  }, [connected]);

  return count;
};