import { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../utils/constants';

const useFetch = <T>(url: string, config: RequestInit | undefined = undefined) => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<undefined | unknown>();
  const [response, setResponse] = useState<Response | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const effectRef = useRef<boolean>(false);
  const requestConfig = useRef(config);

  useEffect(() => {
    const  controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/${url}`, {
          ...requestConfig.current,
          signal
        });
        const responseData = await response.json();
        setResponse(response);
        if(response.ok) {
          setData(responseData);
        }
        else {
          setError(responseData);
        }
      }
      catch(e) {
        setError(e);
      }
      finally {
        setIsLoading(false);
      }
    }

    if(effectRef.current === false) {
      return () => {
        effectRef.current = true;
      }
    }
    else {
      fetchData();

      return () => {
        controller.abort();
      }
    }
  }, [url]);

  return { data, isLoading, error, response };
}

export default useFetch;
