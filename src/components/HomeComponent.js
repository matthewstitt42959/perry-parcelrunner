import React, { useState } from 'react';
import MenuComponent from './MenuComponent'; // Component for managing headers
import UrlInputComponent from './UrlInputComponent'; // Component for API calls
import ResponseBody from './Body/ResponseBodyComponent'; // Component for displaying the response
import RequestBodyComponent from './Body/RequestBodyComponent'; // Component for editing request body
import TabsComponent from './TabsComponent'; // Component for tabbed UI
import Heading from './FormatUtilites/Format_Heading'; // Heading component for titles
import HeaderTab from './HeaderTabComponent';




export default function HomeComponent({ }) {
    const [headerData, setHeaderData] = useState([]); // State for header information
    const [responseData, setResponseData] = useState(null); // State for API response data
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages
    const [requestBody, setRequestBody] = useState(''); // State for request body
    const [selectedMethod, setSelectedMethod] = useState(''); // State for selected API method
    const [activeTab, setActiveTab] = useState('tab1'); // State for the active tab

    // Callback function to handle API response from UrlInputComponent
    const handleAPIResponse = (data, method, error = null) => {
        if (error) {
            setErrorMessage(error); // Set error message if there's an error
            setResponseData(null); // Clear previous response data
        } else {
            setErrorMessage(null); // Clear error message
            setResponseData(data); // Set the response data
            setSelectedMethod(method); // Set the selected method
        }
    };

    // Callback function to handle header changes from MenuComponent
    const handleMenuChange = (updatedMenu) => {
        console.log('Updated Menu:', updatedMenu); // Log updated headers for debugging
        setMenuData(updatedMenu); // Update header data state
    };

    // Callback function to handle changes in the request body
    const handleBodyChange = (e) => {
        setRequestBody(e.target.value); // Update the request body state
    };
      // Callback function for managing headers within HomeComponent
      const handleHeaderChange = (newHeaders) => {
        console.log('Accepting headerData from HeadeTab: ', headerData);
        setHeaderData(newHeaders); // Update header data state
    };

    return (
        <div className="container mt-4">
            <Heading level={2}>API Request Tool</Heading>
            {/* Render the HeaderComponent that manages headers */}
            <MenuComponent onMenuChange={handleMenuChange} />
            {/* Render the UrlInputComponent for making the API calls */}
            <UrlInputComponent 
                onResponse={handleAPIResponse} 
                requestBody={requestBody} 
                method={selectedMethod} 
                headers={headerData}
            />
            
            {/* Render the tabbed interface */}
            <div className='container border mt-4'>
                <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Conditionally render RequestBodyComponent for methods that require a body */}
            {['POST', 'PUT', 'PATCH'].includes(selectedMethod) && (
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
                <Heading>API Response</Heading>
                <ResponseBody responseData={responseData} />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
}