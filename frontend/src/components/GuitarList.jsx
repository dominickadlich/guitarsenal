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
                <div key={guitar.id} className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="px-4 py-5 sm:px-6">
                        <Link to={`/guitars/${guitar.id}`}>
                            {guitar.brand} {guitar.model}
                        </Link>   
                    </div>                
                    <div className="px-4 py-5 sm:p-6">
                        <Link to={`/guitars/${guitar.id}`}>
                            {guitar.primary_photo && 
                                <img src={`http://127.0.0.1:8000${guitar.primary_photo}`}
                                className="mx-auto size-32 shrink-0 rounded-lg"
                                alt={`${guitar.brand} ${guitar.model}`}/>}
                        </Link>
                    </div>  
                </div>
            ))}
        </ul>
    );
}

export default GuitarList;