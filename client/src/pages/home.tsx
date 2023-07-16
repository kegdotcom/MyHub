import React from "react";
import Icon from "../components/Icon";
import Viewpane from "../components/Viewpane";

export default function Home() {
  return (
    <Viewpane>
      <h1>Hello</h1>
      <p>
        welcome home <Icon name="activity" />
      </p>
    </Viewpane>
  );
}
