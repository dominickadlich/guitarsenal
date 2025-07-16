import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import InputGroup from "./InputGroup";
import SubmitButton from "./SubmitButton";
import InputMedia from "./InputMedia";
import { useEffect, useState, useActionState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { guitarFormFields ,API_BASE_URL ,GUITAR_ENDPOINTS } from "../constants";

async function updateGuitarDetails(prevState, formData) {
    const guitarId = formData.get('guitarId');
    const url = `${API_BASE_URL}${GUITAR_ENDPOINTS.detail(guitarId)}`;
    const imageFiles = formData.getAll('images')
    console.log('Image files:', imageFiles)

    const guitarDetail = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      serial_number: formData.get('serial_number'),
      purchase_date: formData.get('purchase_date'),
      purchase_price: formData.get('purchase_price'),
      number_of_strings: formData.get('number_of_strings'),
      body_wood: formData.get('body_wood'),
      top_wood: formData.get('top_wood'),
      neck_wood: formData.get('neck_wood'),
      fretboard_wood: formData.get('fretboard_wood'),
      scale_length: formData.get('scale_length'),
      num_frets: formData.get('num_frets'),
      pickup_model: formData.get('pickup_model'),
      additional_features: formData.get('additional_features')
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
        const guitarResponse = await axios.put(`${API_BASE_URL}${GUITAR_ENDPOINTS.detail(guitarId)}`, guitarDetail);

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
                        const response = await axios.post(`${API_BASE_URL}${GUITAR_ENDPOINTS.photos(guitarId)}`, imageFormData, {
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
    const url = `${API_BASE_URL}${GUITAR_ENDPOINTS.detail(id)}`;
    const { data: guitar, loading, error } = useFetch(url)
    console.log(url)


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

    return (
        <>
            <div className="flex items-center justify-center">
                <form action={formAction}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="hidden" name="guitarId" value={id} />
                    {guitarFormFields.map((field) => (
                        <div key={field.id}>
                            <InputGroup 
                                {...field}
                                defaultValue={guitar[field.name] || ''}
                                error={formState.errors?.[field.name]}
                            />
                        </div>
                    ))}
                    </div>
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