import { useEffect, useState } from "react";
import axios from "axios";


function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}`);
                console.log('API Response:', response.data);
                setData(response.data);
                setLoading(false)
            } catch (err) {
                setError(`Failed to load guitar details`);
                setLoading(false);
            }
        };

        if (url) fetchData();
    }, [url]);

    return { data, loading, error }

}

export default useFetch;