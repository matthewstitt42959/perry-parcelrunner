import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * APIRequestComponent is responsible for sending API requests using
 * the provided URL and method. It updates the loading state and
 * status message based on the outcome of the request.
 * 
 * @param {Array} headers - Array of header objects.
 * @param {Object} requestBody - The request body for POST/PUT/PATCH.
 * @param {Object} inputs - Input data including URL, method.
 * @param {Function} onResponse - Callback fired with the response or error message.
 */
export default function APIRequestComponent({ onResponse, requestBody, headers, inputs }) {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null); // State to manage response data
    const [error, setError] = useState(null); // State to manage error
    useEffect(() => {
        if (inputs.submitted && !loading) {
            setError(null);
            setResponseData(null);
            setLoading(true);
            handleSend(inputs.url, inputs.method);
        }
    }, [inputs, loading, requestBody, headers]); // Add required dependencies

    // Function to construct the full API URL with query parameters
    const constructURL = (url, queryParam) => {
        const queryString = new URLSearchParams(queryParam).toString();
        return queryString ? `${url}?${queryString}` : url;
    };

    const handleSend = async (url, selectedMethod) => {
        console.log("handleSend Called!!!")

        setError(null);
        setResponseData(null);

        try {
            const urlWithProxy = `/api/proxy?url=${url}`;
            let options = {
                method: selectedMethod,
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
                if (requestBody) {
                    try {
                        const requestData = JSON.parse(requestBody);
                        options.body = JSON.stringify(requestData);
                    } catch (jsonError) {
                        const errorMsg = "Invalid JSON in request body.";
                        setError(errorMsg);
                        onResponse(null, errorMsg);
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
        } finally {
            setLoading(false);
        }
    };

    const fetchWithTimeout = (url, options, timeout = 5000) => {
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
    requestBody: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })),
    inputs: PropTypes.shape({
        url: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        submitted: PropTypes.bool.isRequired
    }).isRequired
};
