import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import { loadUser } from "./redux/actions/authActions";

function App() {
  useEffect(() => {
    console.log("In App componentDidMount");
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
