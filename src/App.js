import "./App.css";
import Header from "./component/Layout/Header";
import { Fragment } from "react";
import Meals from "./component/Meals/Meals";
function App() {
  return (
    <Fragment>
      <Header></Header>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
