import { React } from "react";
import home from "../home.png";

/* composant Home: simple composant qui affiche une page Home     */
export default function Home() {
  return (
    <div>
      <img src={home} alt="home" className="homeContainer" />
    </div>
  );
}
