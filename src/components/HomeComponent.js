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


export default function HomeComponent() {
    const [urlData, setUrlData] = useState({ URL: ' ', method: 'GET' });
    const [queryParams, setQueryParams] = useState({});
    const [body, setBody] = useState('');
    const [responseData, setResponseData] = useState(null); // State for API response data
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages
    const [requestBody, setRequestBody] = useState(''); // State for request body
    const [submitted, setSubmitted] = useState(false); // Track if send button is pressed
    const [activeTab, setActiveTab] = useState('tab1'); // State for the active tab
    const [loading, setLoading] = useState('');
    const [status, setStatus] = useState('');
    const [showHeaders, setShowHeaders] = useState(false); // State to track if Headers button is clicked




    // Function to handle submission from UrlInputComponent
    const [inputs, setInputs] = useState({
        url: '',
        method: 'GET',
        submitted: false,
        headers: HeaderTab.headers // Initialize headers with the initial headerData
    });

    // Synchronize inputs with headerData
    useEffect(() => {
  
        setInputs((prev) => ({
            ...prev,
            headers: HeaderTab.headers
        })

        );
    }, [HeaderTab.headers]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!inputs.url.trim()) {
            alert('Please provide a valid URL.');
            return;
        }
        // Set to false, if submitted is true to avoid dups
        if (inputs.submitted) {
            setInputs((prev) => ({
                ...prev,
                submitted: false
            }));
        }

        // Check if request body is required and not provided
   
        if (['POST', 'PUT', 'PATCH'].includes(inputs.method) && requestBody.trim() === ""   ) {
            setLoading(false);
            setErrorMessage("Request body is required for this method.");
            setSubmitted(false); // Reset the submitted state
            return;
        }

        // Set to false, if submitted is true to avoid dups
        if (inputs.submitted) {
            setInputs((prev) => ({
                ...prev,
                submitted: false
            }));
        }
        // Update submitted to true and then send to API request component
        setTimeout(() => {
            setInputs((prev) => ({
                ...prev,
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

    return (
        <div className="flex">
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
                        // headers={handleHeaderButtonChange} // Pass the latest headers from inputs to APIRequestComponent
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