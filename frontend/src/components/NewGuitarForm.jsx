import { useState } from "react";
import InputGroup from "./InputGroup";

function NewGuitarForm() {

async function storeFeedback(prevState, formData) {
    const feedbackMessage = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      serial_number: formData.get('serial_number'),
      purchase_date: formData.get('purchase_date'),
      purchase_price: formData.get('purchase_price'),
      number_of_strings: formData.get('number_of_strings')
    };
}

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
        <div>
            {formFields.map((field) => (
                <InputGroup 
                    id={field.id}
                    name={field.brand}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={onChange}
                    required={required}
                />
            ))}
        </div>
    )
}

export default NewGuitarForm;