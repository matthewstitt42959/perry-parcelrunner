import React, { useState } from 'react';
import { Button } from '@windmill/react-ui';
import { handlePaste } from '../lib/apiUtils';

/**
 * UrlInputComponent allows users to input a URL, select an HTTP method,
 * and sends requests based on the input.
 *

 * @param {function} sendRequest - Function to handle sending requests.
 */
export default function UrlInputComponent({ inputs, setInputs, loading }) {

    const [selectedMethod, setSelectedMethod] = useState('GET');
    const [status, setStatus] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Handle input change events for both URL and method
    const handleUrlChange = (event) => {
        setInputs((prev) => ({ ...prev, url: event.target.value }));
    }

    // Handle input change events for both URL and method
    const handleMethodChange = (event) => {
        setInputs((prev) => ({ ...prev, method: event.target.value }));
    }


    const handlePasteEvent = (event) => {
        const pastedData = event.clipboardData.getData('text');
        if (isValidUrl(pastedData)) {
            // Update URL state and lift to parent if valid
            setInputs((prev) => ({ ...prev, url: formatUrl(pastedData) }));
       
        } else {
            event.preventDefault(); // Prevent invalid URL from being pasted
            alert('Invalid URL pasted');
        }
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const formatUrl = (urlString) => {
        const parsedURL = new URL(urlString);
        return `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.pathname}`;
    };




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