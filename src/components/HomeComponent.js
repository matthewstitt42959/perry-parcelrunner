import React, { useState, useEffect } from 'react';
import MenuComponent from './MenuComponent'; // Component for managing headers
import UrlInputComponent from './UrlInputComponent'; // Component for API calls
import ResponseBody from './Body/ResponseBodyComponent'; // Component for displaying the response
import RequestBodyComponent from './Body/RequestBodyComponent'; // Component for editing request body
import Heading from './FormatUtilites/Format_Heading'; // Heading component for titles
import APIRequestComponent from './APIRequestComponent';
import TabsComponent from './TabsComponent';
import HeaderTab from './HeaderTabComponent'; // Import HeaderTabComponent
import ParamsTab from './ParamsTabComponent';
import { Button } from '@windmill/react-ui';


export default function HomeComponent() {
    const [queryParams, setQueryParams] = useState([]); // Initialize as an array
    const [body, setBody] = useState('');
    const [responseData, setResponseData] = useState(null); // State for API response data
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages
    const [requestBody, setRequestBody] = useState(''); // State for request body
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [activeTab, setActiveTab] = useState('tab1'); // State for the active tab


    // Function to handle submission from UrlInputComponent
    const [inputs, setInputs] = useState({
        url: '',
        method: 'GET',
        submitted: false,
        params: queryParams // Initialize params with the initial queryParams
    });

       const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setErrorMessage(null); // Clear previous error messages

        if (!inputs.url || !inputs.url.trim()) {
            setErrorMessage("Please enter a valid URL.");
            return;
        }

        if (['POST', 'PUT', 'PATCH'].includes(inputs.method) && !requestBody.trim()) {
            setErrorMessage("Request body is required for this method.");
            return;
        }

        // Build the final URL with latest params
        const finalUrl = constructURLWithParams(inputs.url, queryParams);

        setLoading(true);
        setInputs((prev) => ({
            ...prev,
            url: finalUrl,
            method: inputs.method || "GET",
            submitted: true
        }));
    };

    // APIRequestComponent callback
    const handleAPIResponse = (data, method, error = null) => {
        if (error) {
            setErrorMessage(error);
            setResponseData(null);
        } else {
            setResponseData(data);
            setErrorMessage(null);
        }
        setLoading(false); // stop spinner once child finishes
        setInputs(prev => ({ ...prev, submitted: false })); // reset submitted flag
    };

    // If you want MenuComponent to update headers later, wire a real setter:
    const handleMenuChange = (updatedMenu) => {
        console.log('Updated Menu:', updatedMenu);
        // setHeaderData(updatedMenu);
        // setInputs(prev => ({ ...prev, headers: updatedMenu, submitted: false }));
    };

    const handleBodyChange = (requestData) => setRequestBody(requestData);
    const handleParamChange = (params) => setQueryParams(params);

    // Builds URL+params safely (respects existing ? or &)
    function constructURLWithParams(url, params) {
        if (!url) return '';
        const usable = (params || []).filter(p => p?.key && p?.value);
        if (usable.length === 0) return url;

        const qs = usable
            .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
            .join('&');

        return url.includes('?') ? `${url}&${qs}` : `${url}?${qs}`;
    }

    return (
        <div className="flex home-container">
            <div className="container mt-4">
                <Heading level={2}>API Request Tool</Heading>

                <MenuComponent onMenuChange={handleMenuChange} />

                <div className="flex gap-2 items-center w-full mt-2">
                    <UrlInputComponent
                        inputs={inputs}
                        setInputs={setInputs}
                        loading={loading}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? 'Loading…' : 'Send'}
                    </button>
                </div>

                <div className="container border mt-4">
                    <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {['POST', 'PUT', 'PATCH'].includes(inputs.method) && (
                    <div className="container border mt-4">
                        <Heading level={5}>Enter a Request Body</Heading>
                        <RequestBodyComponent
                            requestData={requestBody}
                            onBodyChange={handleBodyChange}
                        />
                    </div>
                )}

                <div className="border mt-4">
                    <Heading level={3}>API Response</Heading>

                    <APIRequestComponent
                        onResponse={handleAPIResponse}
                        requestData={requestBody}
                        inputs={inputs}
                        loading={loading}
                        setLoading={setLoading}
                    />

                    <ResponseBody responseData={responseData} />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}