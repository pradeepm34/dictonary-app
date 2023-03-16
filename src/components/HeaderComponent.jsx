import React, { useState, useEffect } from "react";
import moonIcon from "../assets/images/icon-moon.svg";
import logo from "../assets/images/logo.svg";

const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.cssText = "background-color: black";
    } else {
      document.documentElement.style.cssText = "background-color: white";
    }
  }, [darkMode]);

  const handleOnChange = (e) => {
    const selectedFontValue = document.getElementById("selectedFont").value;
    console.log("selectedFontValue", selectedFontValue);
    // use border-none in styling.
  };

  const handleToggleChange = () => {
    // console.log("e", e);
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex sm:w-full">
      <img src={logo} />
      <div className="flex justify-between sm:w-full">
        <div className="flex">
          <select onChange={(e) => handleOnChange(e)} id="selectedFont">
            <option defaultValue="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Mono</option>
          </select>
        </div>
        <div className="flex">
          <label className="switch mr-3">
            <input type="checkbox" onChange={handleToggleChange} />
            <span className="slider round"></span>
          </label>
          <img src={moonIcon} />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
