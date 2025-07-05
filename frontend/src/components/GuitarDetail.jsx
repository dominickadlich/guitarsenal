import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GuitarDetail() {
    let { id } = useParams();

    const [guitar, setGuitar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuitar = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/guitars/${id}`);
                console.log('API Response:', response.data);
                setGuitar(response.data);
                setLoading(false)
            } catch (err) {
                setError(`Failed to load guitar details`);
                setLoading(false);
            }
        };

        fetchGuitar();
    }, [id]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <h2>Guitar Details</h2>
            <ul>
                <li>{guitar.brand} {guitar.model}</li>
                <li>Serial: {guitar.serial_number}</li>
                <li>Price: ${guitar.purchase_price}</li>
                <li>Strings: {guitar.number_of_strings}</li>
            </ul>

            <h2>Setup History</h2>
            {guitar.setup_history?.map(setup => 
                <div key={setup.id}>
                    <ul>
                        <li>Tuning: {setup.tuning}</li>
                        <li>Strings: {setup.string_brand}</li>
                        <li>Gauge: {setup.string_gauge}</li>
                        <li>Last String Change: {setup.string_change_date}</li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default GuitarDetail;