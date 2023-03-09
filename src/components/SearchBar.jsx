import React from "react";

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputVal = document.getElementById("input-id").value;
  };

  //   onChange={(e) => handleOnChange(e)}
  //   const handleOnChange = (e) => {
  //     e.preventDefault();
  //     console.log("e", e.target.value);
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="input-id" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
