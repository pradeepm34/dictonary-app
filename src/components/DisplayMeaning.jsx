import React, { useState, useEffect, useMemo } from "react";
import useGetData from "../hooks/useGetData";

const DisplayMeaning = () => {
  // UNNECESSARY STATE VARIABLES---------------->NOT NEEDED
  // const [noun, setNoun] = useState("");
  // const [verb, setVerb] = useState("");
  // const [phontics, setPhonetics] = useState("");
  // const [media, setMedia] = useState(null);

  // UNNECESSARY STATE VARIABLES---------------->NOT NEEDED

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

  const [input, setInput] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [errorToDisplay, setErrorToDisplay] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.cssText = "background-color: black";
    } else {
      document.documentElement.style.cssText = "background-color: white";
    }
  }, [darkMode]);

  // const { data, error } = useGetData(url);
  // if (error) throw new Error("ERROR:", error);
  // console.log(data);

  // let { data, error } = useGetData(url);
  // if (error) throw new Error("ERROR:", error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputVal = document.getElementById("input-id").value;
    console.log("input", inputVal);
    setInput(inputVal);
    setErrorToDisplay(false);
    setWordData(null);
  };

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

  const { data, error } = useGetData(url);

  useEffect(() => {
    if (data) setWordData(data);
    if (error) setErrorToDisplay(true);
  }, [data]);

  const audio = useMemo(
    () =>
      wordData?.[0]?.["phonetics"]?.find((phonetic) => phonetic?.audio !== ""),
    [wordData]
  );

  const firstPartOfSpeechMeanings = useMemo(
    () =>
      wordData?.[0]?.meanings?.[0]?.definitions?.map(
        (definition) => definition
      ),
    [wordData]
  );

  const firstPartOfSpeechSynonyms = useMemo(
    () => wordData?.[0]?.meanings?.[0]?.synonyms?.map((synonym) => synonym),
    [wordData]
  );

  const secondPartOfSpeechMeanings = useMemo(
    () =>
      wordData?.[0]?.meanings?.[1]?.definitions?.map(
        (definition) => definition
      ),
    [wordData]
  );

  const examples = useMemo(
    () =>
      wordData?.[0]?.meanings?.[1]?.definitions?.map(
        (definitions) => definitions?.example
      ),
    [wordData]
  );

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="input-id" />
          <input type="submit" />
        </form>
      </div>
      <div>
        <h1>{wordData?.[0]?.word}</h1>
        <div>{audio?.text}</div>
      </div>
      {errorToDisplay ? (
        <div>
          <MeaningDataToDisplay
            partOfSpeech={wordData?.[0]?.meanings?.[0]?.partOfSpeech}
            meanings={firstPartOfSpeechMeanings}
          />
          <PlayAudio audioUrl={audio?.audio} />
          <div>Synonyms</div>
          <div>
            {firstPartOfSpeechSynonyms?.map((synonym) => (
              <div key={synonym}>{synonym}</div>
            ))}
          </div>
          <MeaningDataToDisplay
            partOfSpeech={wordData?.[0]?.meanings?.[1]?.partOfSpeech}
            meanings={secondPartOfSpeechMeanings}
          />
          <div>
            {examples?.map((example) => (
              <div key={example}>{example}</div>
            ))}
          </div>
          <div>source</div>
          <div>
            {data?.[0]?.sourceUrls?.map((sources) => {
              return <div key={sources}>{sources}</div>;
            })}
          </div>
        </div>
      ) : (
        "Please check the word"
      )}
      <button onClick={handleDarkMode}>darkMode</button>
    </div>
  );
};

const MeaningDataToDisplay = ({ partOfSpeech, meanings }) => {
  return (
    <div>
      <div>{partOfSpeech}</div>
      <div>Meaning</div>
      <ul>
        {meanings?.map((meaninig) => (
          <li key={meaninig?.definition}>{meaninig?.definition}</li>
        ))}
      </ul>
    </div>
  );
};

const PlayAudio = ({ audioUrl }) => {
  const handlePlay = () => {
    const audio = new Audio(audioUrl);
    audio?.play();
  };
  return (
    <div>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default DisplayMeaning;
