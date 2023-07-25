import Viewpane from "../components/Viewpane";
import Clock from "../components/Clock";

export default function Home() {
  return (
    <Viewpane>
      <Clock />
      <h6 className="text-center">Welcome to MyTime!</h6>
    </Viewpane>
  );
}
