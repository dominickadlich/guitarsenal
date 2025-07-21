import { useParams } from "react-router-dom";
import { API_BASE_URL, GUITAR_ENDPOINTS } from "../constants";
import useFetch from "./useFetch";
import { useActionState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputGroup from "./InputGroup";
import SubmitButton from "./SubmitButton";

const stringChangeFormFields = [
        {
            id: 'tuning',
            name: 'tuning',
            type: 'text',
            label: 'Tuning',
            placeholder: "Standard, Drop D, Drop C",
            required: true
        },
        {
            id: 'string_gauge',
            name: 'string_gauge',
            type: 'text',
            label: 'String Gauge',
            placeholder: '9-42, 10-48, 10-52',
            required: true,
        },
        {
            id: 'string_brand',
            name: 'string_brand',
            type: 'text',
            label: 'String Brand',
            placeholder: "D'addario, Ernie Ball, Elixir",
            required: false
        },
        {
            id: 'string_change_date',
            name: 'string_change_date',
            type: 'date',
            label: 'Date of String Change',
            placeholder: '',
            required: true
        }
    ]
    

async function updateStringChangeDetails(prevState, formData) {
    const guitarId = formData.get('guitarId');
    const setupId = formData.get('setupId');
    const url = `${API_BASE_URL}${GUITAR_ENDPOINTS.setup(guitarId)}`;

    const stringChangeDetail = {
        tuning: formData.get('tuning'),
        string_gauge: formData.get('string_gauge'),
        string_brand: formData.get('string_brand'),
        string_change_date: formData.get('string_change_date'),
    }

    const newErrors = {};

    if (!stringChangeDetail.tuning?.trim()) {
        newErrors.tuning = 'Please specify a brand.'
    }
    if (!stringChangeDetail.string_gauge?.trim()) {
        newErrors.string_gauge = 'Please specify a string gauge.'
    }
    if (!stringChangeDetail.string_change_date?.trim()) {
        newErrors.string_change_date = 'Please enter a date.'
    }

    if (Object.keys(newErrors).length > 0) {
        return { errors: newErrors };
    }

    try {
    const stringChangeResponse = await axios.put(
                `${API_BASE_URL}/guitars/${guitarId}/setup/${setupId}/`, 
                stringChangeDetail
            );

        return { success: true };
    } catch (error) {
        return {
            errors: {
                general: 'Failed to add string change. Please try again.'
            }
        }
    }
};

function EditStringChange() {
    const { guitarId, setupId } = useParams();
    const url = `${API_BASE_URL}/guitars/${guitarId}/setup/${setupId}/`;
    const { data: setup, loading, error } = useFetch(url);

    const navigate = useNavigate();
    const [formState, formAction] = useActionState(updateStringChangeDetails, {
        errors: {},
    });

    useEffect(() => {
        if (formState.success) {
            navigate(`/guitars/${guitarId}`);
        }
    }, [formState.success, navigate, guitarId]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!setup) return <div>Guitar not found</div>;

    return (
         <>
            <div className="flex justify-center">
                <form action={formAction}>
                    <div className="grid grid-cols-1 gap-6">
                    <input type="hidden" name="guitarId" value={guitarId} />
                    <input type="hidden" name="setupId" value={setupId} />
                        {stringChangeFormFields.map((field) => (
                            <div key={field.id}>
                                <InputGroup 
                                    {...field}
                                    defaultValue={setup[field.name] || ''}
                                    error={formState.errors?.[field.name]}
                                />
                            </div>
                        ))}

                    </div>
                    <div className="pt-6">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditStringChange;