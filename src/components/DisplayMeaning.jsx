import React, { useState } from "react";
import useGetData from "../hooks/useGetData";

const DisplayMeaning = () => {
  // UNNECESSARY STATE VARIABLES---------------->NOT NEEDED
  // const [noun, setNoun] = useState("");
  // const [verb, setVerb] = useState("");
  // const [phontics, setPhonetics] = useState("");
  // const [media, setMedia] = useState(null);
  // UNNECESSARY STATE VARIABLES---------------->NOT NEEDED

  const [wordData, setWordData] = useState("");
  const [errorToDisplay, setErrorToDisplay] = useState(null);

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/keyboard";

  const { data, error } = useGetData(url);
  if (error) throw new Error("ERROR:", error);
  console.log(data);

  // calling setWordData here causes infinte loop
  // https://stackoverflow.com/questions/72450977/error-too-many-re-renders-with-usestate
  // inital render --->setWordData(setstate)-->re-render-->setworddata
  // if (data) setWordData(data);-->should setword data like below line23

  // useEffect(() => {
  //   // if (data) setWordData(data);
  //   // if (error) setErrorToDisplay(error);
  //   console.log("data", data);
  // }, [data, error]);

  // -----------UNNECESSARY USE EFFECTS------

  //  Once the data is available you can directly use that data to render the value avoid setting state in useeffects which avoids multiple re-renders which are expensive.

  // const nounData = wordData[0]?.["meanings"]?.find(
  //   (meaning) => meaning?.partOfSpeech === "noun"
  // );

  // useEffect(() => {
  //   if (nounData) setNoun(nounData);
  // }, [nounData]);

  // const verbData = wordData[0]?.["meanings"]?.find(
  //   (meaning) => meaning?.partOfSpeech === "verb"
  // );

  // useEffect(() => {
  //   if (verbData) setVerb(nounData);
  // }, [verbData]);

  // -----------UNNECESSARY USE EFFECTS------

  const nounData = data?.[0]?.["meanings"]?.find(
    (meaning) => meaning?.partOfSpeech === "noun"
  );

  const verbData = data?.[0]?.["meanings"]?.find(
    (meaning) => meaning?.partOfSpeech === "verb"
  );

  const audio = data?.[0]?.["phonetics"]?.find(
    (phonetic) => phonetic?.audio !== ""
  );

  console.log("nounData", nounData);
  console.log("verbData", verbData);
  console.log("audio", audio);

  return <div>DisplayMeaning</div>;
};

export default DisplayMeaning;
