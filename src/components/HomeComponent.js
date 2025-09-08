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
    const [loading, setLoading] = useState('');
    const [activeTab, setActiveTab] = useState('tab1'); // State for the active tab


    // Function to handle submission from UrlInputComponent
    const [inputs, setInputs] = useState({
        url: '',
        method: 'GET',
        submitted: false,
        headers: HeaderTab.headers, // Initialize headers with the initial headerData
        params: queryParams // Initialize params with the initial queryParams
    });

    // Sync inputs with query parameters
    useEffect(() => {
        const urlWithParams = constructURLWithParams(inputs.url, queryParams);
        setInputs(prev => ({ ...prev, url: urlWithParams, params: queryParams }));
    }, [queryParams]); // Dependency on queryParams only

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
  

        if (!inputs.url.trim()) {
            alert('Please provide a valid URL.');
            return;
        }


        if (['POST', 'PUT', 'PATCH'].includes(inputs.method) && requestBody.trim() === '') {
                setErrorMessage("Request body is required for this method.");
            return;
        }

        setLoading(true);
       
        // Set to false, if submitted is true to avoid dups
        if (inputs.submitted) {
            setInputs((prev) => ({
                ...prev,
                submitted: false
            }));
        }

        // Construct the URL with query parameters
        const urlWithParams = constructURLWithParams(inputs.url, queryParams);



        // Update submitted to true and then send to API request component
        setTimeout(() => {
            setInputs((prev) => ({
                ...prev,
                url: urlWithParams,
                method: inputs.method || "GET",
                submitted: true
            }));
            setLoading(true);

            try {
                // API request will be handled by APIRequestComponent
            } catch (error) {
                // Handle error
            } finally {
                setLoading(false);
            }
        }, 0);
        sendRequest(e); // Pass the event object to sendRequest
    };

    // Callback function to handle API response from APIRequestComponent
    const handleAPIResponse = (data, method, error = null) => {
        if (error) {
            setErrorMessage(error); // Set error message if there's an error
            setResponseData(null); // Clear previous response data
        } else {
            setResponseData(data); // Set the response data
            setErrorMessage(null); // Clear error message
        }
        setLoading(false); // Ensure loading is set to false after response
    };

    // Callback function to handle header changes from MenuComponent
    const handleMenuChange = (updatedMenu) => {
        console.log('Updated Menu:', updatedMenu); // Log updated headers for debugging
        setHeaderData(updatedMenu); // Update header data state
    };

    // Callback function to handle changes in the request body
    const handleBodyChange = (requestData) => {
        setRequestBody(requestData); // Update the request body state
    };

    const handleParamChange = (params) => {
         debugger
        setQueryParams(params); // Update the query parameters state
    };

    const constructURLWithParams = (url, params) => {
        debugger    
        const queryString = params
            .filter(param => param.key && param.value)
            .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
            .join('&');
        return queryString ? `${url}?${queryString}` : url;
    };

    return (
        <div className="flex, home-container">
            <div className="container mt-4">
                <Heading level={2}>API Request Tool</Heading>
                <MenuComponent onMenuChange={handleMenuChange} />

                <div>
                    <UrlInputComponent
                        inputs={inputs} setInputs={setInputs}
                        sendRequest={handleSubmit}
                        loading={loading} // Pass loading state for button disabling
                        setLoading={setLoading} // Pass setLoading function to UrlInputComponent
                    />
                </div>
                                {/* Button to trigger the send */}
                <Button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Loading...' : 'Send'}
                </Button>

                {/* Render the tabbed interface */}
                <div className='container border mt-4'>
                    <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Conditionally render RequestBodyComponent for methods that require a body */}
                {['POST', 'PUT', 'PATCH'].includes(inputs.method) && (
                    <div className='container border mt-4'>
                        <Heading level={5}>Enter a Request Body</Heading>
                        <RequestBodyComponent
                            requestData={requestBody}
                            onBodyChange={handleBodyChange}
                        />
                    </div>
                )}



                {/* Render the API response and error messages */}
                <div className='border mt-4'>
                    <Heading level={3}>API Response</Heading>  {/* Set a valid level value */}
                    <APIRequestComponent
                        onResponse={handleAPIResponse}
                        requestData={requestBody}
                        inputs={inputs}
                        loading={loading} // Pass loading state to APIRequestComponent
                        setLoading={setLoading} // Pass setLoading function to APIRequestComponent
                    />

                    <ResponseBody responseData={responseData} />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}