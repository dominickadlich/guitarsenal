export const guitarFormFields = [
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
        {
            id: 'body_wood',
            name: 'body_wood',
            type: 'text',
            label: 'Body Wood',
            placeholder: 'Poplar, Ash, Mahogany',
            required: false
        },
        {
            id: 'top_wood',
            name: 'top_wood',
            type: 'text',
            label: 'Top Wood',
            placeholder: 'Quilted Maple, Flamed Maple, Ash',
            required: false,
        },
        {
            id: 'neck_wood',
            name: 'neck_wood',
            type: 'text',
            label: 'Neck Wood',
            placeholder: 'Mahogany, Maple, Walnut',
            required: false
        },
        {
            id: 'fretboard_wood',
            name: 'fretboard_wood',
            type: 'text',
            label: 'Fretboard Material',
            placeholder: 'Ebony, Richlite, Maple',
            required: false
        },
        {
            id: 'scale_length',
            name: 'scale_length',
            type: 'text',
            label: 'Scale Length',
            placeholder: '25.5", 27", 25"',
            required: false
        },
        {
            id: 'num_frets',
            name: 'num_frets',
            type: 'number',
            label: 'Number of Frets',
            placeholder: '22, 24, 27',
            required: false
        },
        {
            id: 'pickup_model',
            name: 'pickup_model',
            type: 'text',
            label: 'Pickup Models',
            placeholder: 'Juggernauts, Fluence, Dimarzio',
            required: false
        },
        {
            id: 'additional_features',
            name: 'additional_features',
            type: 'textarea',
            label: 'Additional Features',
            placeholder: 'Floating Trem, Locking Tuners, etc.',
            required: false,
        },
    ];