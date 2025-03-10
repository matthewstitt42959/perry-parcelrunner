import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderData_json from '../lib/user.json'; // Import Authorization
/**
 * APIRequestComponent is responsible for sending API requests using
 * the provided URL and method. It updates the loading state and
 * status message based on the outcome of the request.
 * 
 * @param {Array} headers - Array of header objects.
 * @param {Object} requestData - The request body for POST/PUT/PATCH.
 * @param {Object} inputs - Input data including URL, method.
 * @param {Function} onResponse - Callback fired with the response or error message.
 */
export default function APIRequestComponent({onResponse,  requestData, inputs, setLoading  }) {
    const [responseData, setResponseData] = useState(null); // State to manage response data
    const [error, setError] = useState(null); // State to manage error

       // Initial header data
       const [headers, setHeaders] = useState([
        { key: 'Authorization', value: HeaderData_json.token },
        { key: 'Cache-Control', value: HeaderData_json.cacheControl },
        { key: 'Content-Type', value: HeaderData_json.contentType},
        { key: 'Accept', value: HeaderData_json.accept },
    ]);
   

    useEffect(() => {
     
        if (inputs.submitted) {
            setError(null);
            setResponseData(null);
            handleSend(inputs.url, inputs.method, requestData);
        }
    }, [inputs, requestData, headers]); // Add required dependencies

    // Function to construct the full API URL with query parameters
    const constructURL = (url, queryParam) => {

        // Validate the URL
        if (!url) {
            const errorMsg = "Invalid URL.";
            setError(errorMsg);
            onResponse(null, errorMsg);
            return;
        }
        const queryString = new URLSearchParams(queryParam).toString();
        console.log("constructURL Called!!!"); 
        return queryString ? `${url}?${queryString}` : url;

    };

    const handleSend = async (url, selectedMethod, requestData) => {
        debugger
        console.log('handleSend Called!!!')

        /**
         * Essential items to send for API request
         * URL - Should be String
         * Method - Should be String
         * Headers - Should be a List of Objects
         * Request Body (for POST, PUT, PATCH) - Should be a JSON
         *  */
        setError(null);
        setResponseData(null)

        // Construct the full URL with query parameters
       // const fullURL = constructURL(url, inputs.parameters_list);

        try {
            debugger
            const urlWithProxy = `/api/proxy?url=${url}`;
            let options = {
                method: selectedMethod,
                body: selectedMethod === 'POST' || selectedMethod === 'PUT' ? JSON.stringify(requestData) :
                null, // Only include body for POST/PUT
                headers: {
                    ...headers.reduce((acc, header) => {
                        if (header.key) {
                            acc[header.key] = header.value;
                        }
                        return acc;
                    }, {}),
                }
            };

            if (['POST', 'PUT', 'PATCH'].includes(selectedMethod)) {
                
                if (requestData) {
                    try {
                        const request = JSON.parse(requestData);
                        options.body = JSON.stringify(request);
                    } catch (jsonError) {
                        const errorMsg = "Invalid JSON in request body.";
                        setError(errorMsg);
                        onResponse(null, errorMsg);
                        setLoading(false); // Ensure loading is set to false after error
                        return;
                    }
                } else {
                    options.body = null; // Handle the case where there's no body.
                }

            } else if (['GET', 'HEAD'].includes(selectedMethod)) {
                delete options.body; // Remove the body
            }

            let response = await fetchWithTimeout(urlWithProxy, options, 5000);
            const contentType = response.headers.get("content-type");

            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            setResponseData(data);
            onResponse(data, selectedMethod); // Call onResponse with data and selectedMethod

        } catch (error) {
            const errorMsg = `An error occurred: ${error.message}`;
            console.error('Error fetching data: ', errorMsg);
            setError(errorMsg);
            onResponse(null, errorMsg); // Call onResponse with null and errorMsg
        } finally{
            setLoading(false); 
        }
    };

    const fetchWithTimeout =(url, options, timeout = 5000) => {
 
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Request timed out"));
            }, timeout);
            fetch(url, options)
                .then((response) => {
                    clearTimeout(timer);
                    resolve(response);
                })
                .catch((err) => {
                    clearTimeout(timer);
                    reject(err);
                });
        });
    };

    // This component does not render anything
    return null;
}

APIRequestComponent.propTypes = {
    onResponse: PropTypes.func.isRequired,
    requestData: PropTypes.string,
    // headers: PropTypes.arrayOf(PropTypes.shape({
    //     key: PropTypes.string,
    //     value: PropTypes.string
    // })),
    inputs: PropTypes.shape({
        url: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        submitted: PropTypes.bool.isRequired
    }).isRequired,
    setLoading: PropTypes.func.isRequired
};
