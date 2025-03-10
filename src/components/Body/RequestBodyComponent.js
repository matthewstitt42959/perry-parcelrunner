import React, { useState } from 'react';

export default function RequestBodyComponent({ requestData, onBodyChange }) {
    const [inputValue, setInputValue] = useState(requestData);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        try {
          if (value.trim() === "") {
            throw new Error("Request body cannot be empty. Please enter a valid JSON string.");
          }
            JSON.parse(value);
            setError(null);
            onBodyChange(value); // Pass the valid JSON string to the parent component
        } catch (err) {
            setError('Invalid JSON format');
        }
    };


    return (
        <div>
            <textarea
                className='form-control'
                value={inputValue}
                onChange={handleChange}
                style={{ minHeight: '200px', resize: 'none' }}
                placeholder="Enter request body as JSON"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
