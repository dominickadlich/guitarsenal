import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import InputGroup from "./InputGroup";
import SubmitButton from "./SubmitButton";
import InputMedia from "./InputMedia";
import { useEffect, useState, useActionState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


async function updateGuitarDetails(prevState, formData) {
    const guitarId = formData.get('guitarId');
    const url = `http://127.0.0.1:8000/guitars/${guitarId}/`;
    const imageFiles = formData.getAll('images')
    console.log('Image files:', imageFiles)

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

    try {
        const guitarResponse = await axios.put(url, guitarDetail);
        const guitarId = guitarResponse.data.id;

        const imageFiles = formData.getAll('images');

        if (imageFiles.length > 0) {
            console.log(`Found ${imageFiles.length} images to upload`);

            for (let i = 0; i < imageFiles.length; i++) {
                const imageFile = imageFiles[i];
                console.log('Processing file:', imageFile.name, imageFile.size);

                if (imageFile.size > 0) {
                    console.log(`About to upload:`, imageFile.name);

                    const imageFormData = new FormData();
                    imageFormData.append('image', imageFile);
                    imageFormData.append('is_primary', i === 0);

                    try {
                        const response = await axios.post(`http://127.0.0.1:8000/guitars/${guitarId}/photos/`, imageFormData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        console.log('Upload successful:', response.data);
                    } catch (error) {
                        console.error('Upload failed:', error.response?.data); 
                    }
                }
            }
        }
        return { success: true };
    } catch (error) {
        return {
            errors: {
                general: 'Failed to create guitar. Please try again.'
            }
        }
    }
};


function EditGuitarForm() {
    const { id } = useParams();
    const url = `http://127.0.0.1:8000/guitars/${id}`;
    const { data: guitar, loading, error } = useFetch(url)


    const navigate = useNavigate();
    const [formState, formAction] = useActionState(updateGuitarDetails, {
        errors: {},
    });

    useEffect(() => {
        if (formState.success) {
            navigate(`/guitars/${id}`);
        }
    }, [formState.success, navigate]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!guitar || !guitar.id) return <div>Guitar not found</div>;

    // console.log('Guitar data:', guitar);
    // console.log('Loading:', loading);
    // console.log('Error:', error);

    // console.log('Brand defaultValue:', guitar.brand || '');


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

    // console.log('Guitar object keys:', Object.keys(guitar));
    // console.log('Form field names:', formFields.map(f => f.name));

    // console.log('guitar.brand:', guitar.brand);
    // console.log('guitar.model:', guitar.model);

    return (
        <>
            <div className="flex items-center justify-center">
                <form action={formAction}>
                    <input type="hidden" name="guitarId" value={id} />

                    {formFields.map((field) => (
                        <div key={field.id} className="pt-6">
                            <InputGroup 
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                label={field.label} 
                                placeholder={field.placeholder}
                                required={field.required}
                                defaultValue={guitar[field.name] || ''}
                                error={formState.errors?.[field.name]}
                            />
                        </div>
                    ))}

                    <div className="pt-6">
                        <InputMedia />
                    </div>
                    <div className="pt-6">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditGuitarForm;