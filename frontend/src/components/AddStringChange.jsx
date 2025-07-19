import useFetch from "./useFetch";
import { useNavigate, useParams } from "react-router-dom";
import InputGroup from "./InputGroup";
import SubmitButton from "./SubmitButton";
import { useEffect, useState, useActionState } from "react";
import axios from "axios";
import { guitarFormFields, API_BASE_URL, GUITAR_ENDPOINTS } from "../constants";


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

async function saveStringChangeDetails(prevState, formData) {
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
        const guitarId = formData.get('guitarId');
        const stringChangeResponse = await axios.post(`${API_BASE_URL}${GUITAR_ENDPOINTS.setup(guitarId)}`, stringChangeDetail)

        return { success: true };
    } catch (error) {
        return {
            errors: {
                general: 'Failed to add string change. Please try again.'
            }
        }
    }
};

function AddStringChange() {
    const { id } = useParams();
    const url = `${API_BASE_URL}${GUITAR_ENDPOINTS.detail(id)}`;
    const { data: guitar, loading, error } = useFetch(url)
    console.log(url)


    const navigate = useNavigate();
    const [formState, formAction] = useActionState(saveStringChangeDetails, {
        errors: {},
    });

    useEffect(() => {
        if (formState.success) {
            navigate(`/guitars/${id}`);
        }
    }, [formState.success, navigate, id]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!guitar || !guitar.id) return <div>Guitar not found</div>;

    return (
         <>
            <div className="flex justify-center">
                <form action={formAction}>
                    <div className="grid grid-cols-1 gap-6">
                    <input type="hidden" name="guitarId" value={id} />
                        {stringChangeFormFields.map((field) => (
                            <div key={field.id}>
                                <InputGroup 
                                    {...field}
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

export default AddStringChange;