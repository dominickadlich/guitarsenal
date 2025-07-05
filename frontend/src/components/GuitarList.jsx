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
        <div>
            {guitars.map(guitar => (
                <div key={guitar.id}>
                    <div className="guitar-card">
                        <Link to={`/guitars/${guitar.id}`}>
                            {guitar.brand} {guitar.model}
                        </Link>
                    </div>
                    {guitar.primary_photo && <img src={`http://127.0.0.1:8000${guitar.primary_photo}`} alt={`${guitar.brand} ${guitar.model}`}/>}
                </div>
                
            ))}
        </div>
    );
}

export default GuitarList;