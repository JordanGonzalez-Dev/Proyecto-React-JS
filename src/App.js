import "./App.css";
import {NavBar} from "./components/NavBar/NavBar.js";
import {ItemListContainer} from "./components/ItemListContainer/ItemListContainer.js";

function App() {
  return (
    <>
      <NavBar/>
      <ItemListContainer texto="Productos"/>
    </>
  );
};

export default App;
