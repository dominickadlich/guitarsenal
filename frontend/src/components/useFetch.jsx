import { useEffect, useState } from "react";
import axios from "axios";


function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('useFetch: Starting fetch for URL:', url);
            try {
                const response = await axios.get(`${url}`);
                console.log('useFetch: Success response:', response.data);
                setData(response.data);
                setLoading(false)
            } catch (err) {
                console.error('useFetch: Error occurred:', err);
                console.error('useFetch: Error response:', err.response);
                setError(`Failed to load guitar details`);
                setLoading(false);
            }
        };

        if (url) fetchData();
    }, [url]);

    return { data, loading, error }

}

export default useFetch;