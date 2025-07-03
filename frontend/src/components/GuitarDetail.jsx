import { useEffect, useState } from "react";
import axios from "axios";

function GuitarDetail() {
    const [guitar, setGuitar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuitars = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/guitars/1');
                setGuitar(response.data);
                setLoading(false)
            } catch (err) {
                setError(`Failed to load guitar detail for id: ${guitar.id}`);
                setLoading(false);
            }
        };

        fetchGuitars();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <div>
                {guitar.map(g => (
                    <div key={guitar.id}>
                        <h2>{g.brand} {g.model}</h2>
                        <div>{g.tuning}</div>
                        <div>{g.string_gauge}</div>
                        <div>{g.string_brand}</div>
                        <div>{g.string_change_date}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GuitarDetail;