import { Outlet } from "react-router-dom";
import Nav from "../components/NavBar";
import NavBarBottom from "./NavBarBottom";
import styles from "./App.module.css";
import "./App.font.css";

function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <NavBarBottom className={styles.navbarbottom} />
    </>
  );
}

export default App;
