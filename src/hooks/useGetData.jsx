// makes API call and return data and perform error handling
import { useEffect, useState } from "react";

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = () => {
      console.log("called", url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log("error", error);
          setError(error);
        });
    };

    getData();
  }, [url]);

  return { data, error };
};

export default useGetData;
