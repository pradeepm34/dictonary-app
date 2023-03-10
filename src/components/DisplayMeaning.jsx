import React, { useState, useEffect, useMemo } from "react";
import useGetData from "../hooks/useGetData";

const DisplayMeaning = () => {
  // UNNECESSARY STATE VARIABLES---------------->NOT NEEDED
  // const [noun, setNoun] = useState("");
  // const [verb, setVerb] = useState("");
  // const [phontics, setPhonetics] = useState("");
  // const [media, setMedia] = useState(null);
  // const [wordData, setWordData] = useState("");
  // const [errorToDisplay, setErrorToDisplay] = useState(null);
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
    // document.getElementById("input-id").value = "";
  };
  // const { data, error } = useGetData(url);

  // SHOULD ONLY MAKE API CALL AFTER USER ENTER THE WORD IN SEARCH BAR

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
  console.log(url);
  const { data, error } = useGetData(url);
  console.log("data", data);
  console.log("error", error);
  // useEffect(() => {
  // }, [input]);

  const audio = data?.[0]?.["phonetics"]?.find(
    (phonetic) => phonetic?.audio !== ""
  );

  const firstPartOfSpeechMeanings = useMemo(
    () =>
      data?.[0]?.meanings?.[0]?.definitions?.map((definition) => definition),
    [data]
  );

  const firstPartOfSpeechSynonyms = useMemo(
    () => data?.[0]?.meanings?.[0]?.synonyms?.map((synonym) => synonym),
    [data]
  );

  const secondPartOfSpeechMeanings = useMemo(
    () =>
      data?.[0]?.meanings?.[1]?.definitions?.map((definition) => definition),
    [data]
  );

  const examples = useMemo(
    () =>
      data?.[0]?.meanings?.[1]?.definitions?.map(
        (definitions) => definitions?.example
      ),
    [data]
  );

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="input-id" />
          <input type="submit" />
        </form>
      </div>
      <div>
        <h1>Keyboard</h1>
        <div>{audio?.text}</div>
      </div>
      <div>
        <MeaningDataToDisplay
          partOfSpeech={data?.[0]?.meanings?.[0].partOfSpeech}
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
          partOfSpeech={data?.[0]?.meanings?.[1].partOfSpeech}
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
