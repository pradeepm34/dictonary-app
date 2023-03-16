import "./App.css";
import DisplayMeaning from "./components/DisplayMeaning";
import HeaderComponent from "./components/HeaderComponent";

const App = () => {
  return (
    <div className="App sm:max-w-sm sm:h-full">
      <HeaderComponent />
      <DisplayMeaning />
    </div>
  );
};

export default App;
