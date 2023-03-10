import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import DisplayMeaning from "./components/DisplayMeaning";
// import getData from "./hooks/useGetData";

const App = () => {
  return (
    <div className="App">
      {/* <SearchBar /> */}
      <DisplayMeaning />
    </div>
  );
};

export default App;
