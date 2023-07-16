import React, { ReactNode } from "react";

interface ViewpaneProps {
  children?: ReactNode;
}

function Viewpane({ children }: ViewpaneProps) {
  return (
    <div className="container" style={{ height: "90vh" }}>
      {children}
    </div>
  );
}

export default Viewpane;
