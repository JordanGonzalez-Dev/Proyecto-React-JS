import "./App.css";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import {NavBar} from "./components/NavBar/NavBar.js";
// import {ItemListContainer} from "./components/ItemListContainer/ItemListContainer.js";

function App() {
  return (
    <>
      <NavBar/>
      {/* <ItemListContainer texto="Productos"/> */}
      <ItemDetailContainer/>
    </>
  );
};

export default App;
