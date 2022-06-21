import { useState, useEffect } from 'react';


const useFetch = (url) => {

  const [ data, setData ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState(null);


  useEffect(() => {
		setTimeout(() => {
			fetch(url)
				.then((res) => {
					if(!res.ok){
						throw Error("You don't deserve the data, lol")
					}
					return res.json();
				})
				.then((data) => {
					setData(data);
					setIsLoading(false);
					setError(null);
				})
				.catch(err => {
					setIsLoading(false)
					setError(err.message);
				})
		}, 0);
	}, [url]);


  return { data, isLoading, error };
}

export default useFetch;