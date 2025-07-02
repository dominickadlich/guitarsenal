import { useEffect, useState } from "react";
import axios from "axios";

function GuitarList() {
    const [guitars, setGuitars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuitars = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/guitars/');
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
                    <h3>{guitar.brand} {guitar.model}</h3>
                    {guitar.primary_photo && <img src={guitar.primary_photo} alt="Guitar" />}
                </div>
            ))}
        </div>
    );
}

export default GuitarList;