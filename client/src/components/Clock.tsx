import React, { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ margin: "25px" }}>
      <h5 className="text-capitalize text-center">
        {time.toLocaleDateString()}
      </h5>
      <h1 className="text-center fw-bold">
        {time.toLocaleTimeString().split(":")[0] +
          ":" +
          time.toLocaleTimeString().split(":")[1] +
          " " +
          time.toLocaleTimeString().split(" ")[1]}
      </h1>
    </div>
  );
}
