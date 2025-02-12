import React, { useState } from 'react';
import MenuComponent from './MenuComponent'; // Component for managing headers
import UrlInputComponent from './UrlInputComponent'; // Component for API calls
import ResponseBody from './Body/ResponseBodyComponent'; // Component for displaying the response
import RequestBodyComponent from './Body/RequestBodyComponent'; // Component for editing request body
import Heading from './FormatUtilites/Format_Heading'; // Heading component for titles
import APIRequestComponent from './APIRequestComponent';
import TabsComponent from './TabsComponent';

export default function HomeComponent() {
    const [urlData, setUrlData] = useState({ URL: ' ', method: 'GET' });
    const [headerData, setHeaderData] = useState([{ key: 'Content-Type', value: 'application/json' }]); // State for header information
    const [queryParams, setQueryParams] = useState({});
    const [body, setBody] = useState('');
    const [responseData, setResponseData] = useState(null); // State for API response data
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages
    const [requestBody, setRequestBody] = useState(''); // State for request body
    const [submitted, setSubmitted] = useState(false); // Track if send button is pressed
    const [activeTab, setActiveTab] = useState('tab1'); // State for the active tab
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    // Function to handle submission from UrlInputComponent
    const [inputs, setInputs] = useState({
        url: '',
        method: 'GET',
        submitted: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!inputs.url.trim()) {
            alert('Please provide a valid URL.');
            return;
        }
        // Set to false, if submitted is true to avoid dups
        if (inputs.submitted) {
            setInputs((prev) => ({ ...prev, 
                submitted: false }));
        }
        // Update submitted to true and then send to API request component
        setTimeout(() => {
        setInputs((prev) => ({ ...prev, 
            method: inputs.method || "GET", 
            submitted: true }));
        setLoading(true);
 
        try {
            // API request will be handled by APIRequestComponent
        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    }, 0); 
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
    };

    // Callback function to handle header changes from MenuComponent
    const handleMenuChange = (updatedMenu) => {
        console.log('Updated Menu:', updatedMenu); // Log updated headers for debugging
        setHeaderData(updatedMenu); // Update header data state
    };

    // Callback function to handle changes in the request body
    const handleBodyChange = (e) => {
        setRequestBody(e.target.value); // Update the request body state
    };

    return (
        <div className="flex">
            <div className="container mt-4">
                <Heading level={2}>API Request Tool</Heading>
                {/* Render the HeaderComponent that manages headers */}
                <MenuComponent onMenuChange={handleMenuChange} />
                {/* Render the UrlInputComponent for making the API calls */}
                <div>
                    <UrlInputComponent
                        inputs={inputs} setInputs={setInputs}
                        sendRequest={handleSubmit}
                        loading={loading} // Pass loading state for button disabling
                    />

                    {/* Button to trigger the send */}
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}
                        disabled={loading ||
                            (['POST', 'PUT'].includes(inputs.method) && !requestBody)}>
                        {loading ? 'Loading...' : 'Send'}
                    </button>
                </div>

                {/* Render the tabbed interface */}
                <div className='container border mt-4'>
                    <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Conditionally render RequestBodyComponent for methods that require a body */}
                {['POST', 'PUT', 'PATCH'].includes(urlData.method) && (
                    <div className='container border mt-4'>
                        <Heading level={5}>Enter a Request Body</Heading>
                        <RequestBodyComponent
                            requestBody={requestBody}
                            onBodyChange={handleBodyChange}
                        />
                    </div>
                )}

                {/* Render the API response and error messages */}
                <div className='border mt-4'>
                    <Heading level={3}>API Response</Heading>  {/* Set a valid level value */}
                    <APIRequestComponent
                        onResponse={handleAPIResponse}
                        requestBody={requestBody}
                        headers={headerData}
                        inputs={inputs}
                    />

                    <ResponseBody responseData={responseData} />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}