import { useState, useEffect } from 'react';



export default function UrlInputComponent({ onResponse, body }) {

    const [selectedMethod, setSelectedMethod] = useState('GET');
    //State for the selected method

    const [url, setUrl] = useState('');
    // State to store the full URL 
    const [displayUrl, setDisplayUrl] = useState('');
    // State to store the formatted URL for display
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Method Handlers
    const handleUrlChange = (e) => { setUrl(e.target.value); };
    const handleMethodChange = (e) => { 
        const selectedMethod=(e.target.value);
        setSelectedMethod(e); 
        // Pass the selected Method to HomeComponent
    };
    

    //Function to handle paste event
    const handlePaste = (e) => {
        //Get the pasted data as plain text
        const pastedData = e.clipboardData.getData('text');
        //Validate the pasted URL before allowing it to be processed
        try {
            const parsedURL = new URL(pastedData);
            //If valid then paste
            setUrl(pastedData);
            //Format the display URL to show only protocol, hostname, and pathname (no query params)
            const formattedUrl = `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.pathname}`;
            setDisplayUrl(formattedUrl);

        } catch (error) {
            e.preventDefault();
            alert('Invalid URL pasted');
        }
    };

    const fetchWithTimeout = (displayUrl, options, timeout = 5000) => {
        //debugger
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Request timed out"));
            }, timeout);
            fetch(displayUrl, options)
                .then((response) => {
                    clearTimeout(timer);
                    //Clear the timeout when the request is successful
                    resolve(response);

                })
                .catch((err) => {
                    clearTimeout(timer);
                    //Clear when there is an error
                    reject(err);
                })
        });
    };

    //Function to handle the form submission
    const handleSend = async () => {
        setError(null);
        setResponseData(null);
        setLoading(true);

        //debugger
        console.log(`Sending request to: /api/proxy?url=${displayUrl}`)
        try {
            if
                (selectedMethod === 'GET' || selectedMethod === 'DELETE') {

                const response = await fetchWithTimeout(`/api/proxy?url=${displayUrl}`, {
                    method: selectedMethod,
                }, 5000,

                );

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                console.log("Response Data: ", response);

                let data;
                try {
                    data = await response.text();
                } catch (jsonError) {
                    throw new Error("Invalid JSON received from the server");
                }
                setResponseData(data);
                onResponse(data);
                // onResponse passes response to HomeComponent

            } else if
                (selectedMethod === 'POST' || selectedMethod === 'PUT') {
                if (body) {
                    try {
                        requestData = JSON.parse(body);
                    } catch (parseError) {
                        throw new Error('Invalid JSON format in the request body');
                    }
                } else {
                    throw new Error('Request body is empty for POST/PUT method');
                }
            }

            const response = await fetchWithTimeout(`/api/proxy?url=${displayUrl}`, {
                method: selectedMethod,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: selectedMethod === 'POST' || selectedMethod === 'PUT' ? JSON.stringify(requestData) :
                    null, // Only include body for POST/PUT
            }, 5000);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            console.log("Response Data: ", response);

            let data;
            try {
                data = await response.text();
            } catch (jsonError) {
                throw new Error("Invalid JSON received from the server");
            }
            setResponseData(data);
            onResponse(data);
            // onResponse passes response to HomeComponent   
        } catch (error) {
            console.error('Error fetching data: ', error);
            onResponse(null, `An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }

    };

    return (
        <><div className="input-group mb-4">
            <label htmlFor="selectedMethod">Method: </label>
            <select className="form-select flex-grow-0 w-auto" id="selectedMethod" value={selectedMethod} onChange={handleMethodChange}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
            </select>

            {/* Input field */}
            <input required className="form-control"
                type="text"
                value={displayUrl}
                onChange={handleUrlChange}
                onPaste={handlePaste}
                placeholder="https://example.com" />



            {/* Button to trigger the send */}
            <button type="submit" className="btn btn-primary" onClick={handleSend}
                disabled={loading}>{loading ? 'Loading...' : 'Send'}
            </button>


        </div>


        </>
    );
}