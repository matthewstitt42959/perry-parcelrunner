import React, { useState } from 'react';

/**
 * UrlInputComponent allows users to input a URL, select an HTTP method,
 * and sends requests based on the input.
 *
 */
export default function UrlInputComponent({ inputs, setInputs, loading, sendRequest, setLoading }) {

    const [selectedMethod, setSelectedMethod] = useState('GET');
    const [status, setStatus] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Handle input change events for both URL and method
    const handleUrlChange = (event) => {
        const newUrl = event.target?.value; // Adding optional chaining
        if (newUrl !== undefined) {
            setInputs((prev) => ({ ...prev, url: newUrl }));
            console.log("URL changed:", newUrl); // Debugging line
            handleUrlChange(newUrl); // Call the onUrlChange prop to update HomeComponent
        }
    };

    // Handle input change events for both URL and method
    const handleMethodChange = (event) => {
        setInputs((prev) => ({ ...prev, method: event.target.value }));
    }

    return (
        <>
            <form className='input-group mb-4'>
                <select className="form-select flex-grow-0 w-auto"
                    id="selectedMethod"
                    value={inputs.method}
                    onChange={handleMethodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                </select>

                {/* Input field */}
                <input required className="form-control"
                    type="text"
                    value={inputs.url || ""}
                    onChange={handleUrlChange}
                  //  onPaste={handlePasteEvent}
                    placeholder="https://example.com" />
                
            </form>
        </>
    );
}