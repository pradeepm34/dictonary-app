// makes API call and return data and perform error handling
import { useEffect, useState } from "react";

const handleFetch = (response) => {
  // if API call is failed check for response.ok . if it is false then throw Error with response.statusText +response.status code
  // but in this API case there is no statusText so throw response.
  if (!response.ok) throw response;
  return response;
};

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = () => {
      console.log("called", url);
      fetch(url)
        .then((response) => handleFetch(response))
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log("Error from hook:", error);
          setError(error);
        });
    };

    getData();
  }, [url]);

  return { data, error };
};

export default useGetData;
