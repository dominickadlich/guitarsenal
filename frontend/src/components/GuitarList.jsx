import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function GuitarList() {
    const [guitars, setGuitars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuitars = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/guitars/');
                console.log('API Response:', response.data);
                setGuitars(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load guitars');
                setLoading(false)
            }
        };

        fetchGuitars();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {guitars.map(guitar => (
                <div key={guitar.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/guitars/${guitar.id}`}>
                        {guitar.primary_photo && 
                            <img src={`http://127.0.0.1:8000${guitar.primary_photo}`}
                            className="h-48 w-96 object-cover rounded"
                            alt={`${guitar.brand} ${guitar.model}`}/>}
                    </Link>
                    <div className="p-5">
                        <Link to={`/guitars/${guitar.id}`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{guitar.brand} {guitar.model}</h5>
                        </Link>   
                    </div>                
                </div>
            ))}
        </ul>
    );
}

export default GuitarList;