import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast


export default function UrlInputComponent({ onResponse, requestBody, method, headers }) {
    const [selectedMethod, setSelectedMethod] = useState('GET');
    const [url, setUrl] = useState(''); // Consolidated state for URL
    const [responseBody, setResponseBody] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUrl(''); // Initialize `url` on mount
    }, []);

    // Method Handlers
    const handleUrlChange = (e) => { setUrl(e.target.value); };
    const handleMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setSelectedMethod(selectedMethod); //Set the selected method state
        // Pass the selected Method to HomeComponent
        onResponse(null, selectedMethod);
    };


    //Function to handle paste event
    const handlePaste = (e) => {
        //Get the pasted data as plain text
        const pastedData = e.clipboardData.getData('text');
        //Validate the pasted URL before allowing it to be processed
        try {
            const parsedURL = new URL(pastedData);
            //If valid then paste
            //setUrl(pastedData);
            //Format the display URL to show only protocol, hostname, and pathname (no query params)
            const formattedUrl = `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.pathname}`;
            debugger
            // setUrl(formattedUrl);

        } catch (error) {
            e.preventDefault();
            alert('Invalid URL pasted');
        }
    };

    const fetchWithTimeout = (url, options, timeout = 5000) => {
        debugger
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Request timed out"));
            }, timeout);
            fetch(url, options)
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
    const handleSend = async (event) => {

        console.log("handleSend Called!!!")

        event.preventDefault();

        setError(null);
        setResponseData(null);
        setLoading(true);

        try {
            const urlWithProxy = `/api/proxy?url=${url}`;
            let options = {
                method: selectedMethod,
                body: requestBody,
                headers: {
                    ...headers.reduce((acc, header) => {
                        if (header.key) {
                            acc[header.key] = header.value;
                        }
                        return acc;
                    }, {}),
                }
            };

            if (['POST', 'PUT', 'PATCH'].includes(selectedMethod) && !requestBody) {

                try {
                    const requestData = JSON.parse(requestBody);
                    options.body = JSON.stringify(requestData);

                } catch (jsonError) {
                    const errorMsg = "Invalid JSON received from the server.";
                    setError(errorMsg);
                    onResponse(null, errorMsg);
                    return;
                }
            } else if (['GET', 'HEAD'].includes(selectedMethod)) {
                delete options.body; // Remove the body
            }
            let response = await fetchWithTimeout(urlWithProxy, options, 5000);

            const data = await response.text();
            setResponseData(data);
            onResponse(data, selectedMethod);
        } catch (error) {
            const errorMsg = `An error occurred: ${error.message}`;
            console.error('Error fetching data: ', errorMsg);
            setError(errorMsg);
            onResponse(null, errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className='input-group mb-4'>

                <select className="form-select flex-grow-0 w-auto"
                    id="selectedMethod"
                    value={selectedMethod}
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
                    value={url}
                    onChange={handleUrlChange}
                    onPaste={handlePaste}
                    placeholder="https://example.com" />

                {/* Button to trigger the send */}
                <button type="submit" className="btn btn-primary" onClick={handleSend}
                    disabled={loading ||
                        (['POST', 'PUT'].includes(selectedMethod) && !requestBody)}>
                    {loading ? 'Loading...' : 'Send'}
                </button>
            </form>



        </>
    );
}