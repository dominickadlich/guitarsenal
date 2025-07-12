import { useActionState, useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";


async function saveGuitarDetails(prevState, formData) {
    const url = 'http://127.0.0.1:8000/guitars/';
    const guitarDetail = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      serial_number: formData.get('serial_number'),
      purchase_date: formData.get('purchase_date'),
      purchase_price: formData.get('purchase_price'),
      number_of_strings: formData.get('number_of_strings')
     };

    const newErrors = {};

    if (!guitarDetail.brand?.trim()) {
        newErrors.brand = 'Please specify a brand.'
    }
    if (!guitarDetail.model?.trim()) {
        newErrors.model = 'Please specify a model.'
    }
    if (!guitarDetail.number_of_strings?.trim()) {
        newErrors.number_of_strings = 'Please specify the number of strings.'
    }
    
    if (Object.keys(newErrors).length > 0) {
        return { errors: newErrors };
    }

    const response = axios.post(url, guitarDetail)

    return { success: true };
};

function NewGuitarForm() {
    const navigate = useNavigate();
    const [formState, formAction] = useActionState(saveGuitarDetails, {
        errors: {},
    });

    useEffect(() => {
        if (formState.success) {
            navigate('/guitars');
        }
    }, [formState.success, navigate])

    const formFields = [
        {
            id: 'brand',
            name: 'brand',
            type: 'text',
            label: 'Brand',
            placeholder: 'Fender, Gibson, etc.',
            required: true
        },
        {
            id: 'model',
            name: 'model', 
            type: 'text',
            label: 'Model',
            placeholder: 'Stratocaster, Les Paul, etc.',
            required: true
        },
        {
            id: 'serial_number',
            name: 'serial_number',
            type: 'text', 
            label: 'Serial Number',
            placeholder: 'ABC123456',
            required: false
        },
        {
            id: 'purchase_date',
            name: 'purchase_date',
            type: 'date',
            label: 'Purchase Date',
            required: false
        },
        {
            id: 'purchase_price',
            name: 'purchase_price',
            type: 'number',
            label: 'Purchase Price',
            placeholder: '1299.99',
            required: false
        },
        {
            id: 'number_of_strings',
            name: 'number_of_strings',
            type: 'number',
            label: 'Number of Strings',
            placeholder: '6',
            required: true
        },
    ];

    return (
        <>
            <form action={formAction}>
                    {formFields.map((field) => (
                    <div className="pt-6">
                        <InputGroup 
                            key={field.id}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            label={field.label} 
                            placeholder={field.placeholder}
                            required={field.required}
                            error={formState.errors?.[field.name]}
                        />
                    </div>
                    ))}
                <div className="pt-6">
                    <SubmitButton onClick={navigate}/>
                </div>
            </form>
        </>
    )
}

export default NewGuitarForm;