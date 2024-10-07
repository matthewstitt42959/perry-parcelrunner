import React, { useState } from 'react';
import UrlInputComponent from './UrlInputComponent';
import ResponseBody from './ResponseBodyComponent';
import RequestBodyComponent from './RequestBodyComponent';
import TabsComponent from './TabsComponent';
import HeaderTab from './HeaderTabComponent'; 

export default function HomeComponent({ }) {

  const [responseData, setResponseData] = useState(null);
  // State to store API response data
  const [errorMessage, setErrorMessage] = useState(null);
  // State to store Error message
  const [requestBody, setRequestBody] = useState('');
  // State for Body, for POST and PUT
  const [selectedMethod, setSelectedMethod] = useState('');
  // State for Selected Method GET, POST, PUT
  const [activeTab, setActiveTab] = useState('tab1');
  // State to select the Tab
  const [headerData, setHeaderData] = useState([]); 
  // State to get the Header info from the UI  

  //Callback function to handle API response from UrlInputComponent
  const handleBodyChange = (e) => { setRequestBody(e.target.value); };

  //Callback function to handle Header JSON from HeaderComponent
  const handleHeaderChange = (headerData) =>{
    setHeaderData(headerData); 
  };

  const handleAPIResponse = (data, selectedMethod, error = null) => {
    if (error) {
      setErrorMessage(error);
      //Set Error message
      setResponseData(null);
      //Clear if there is an error 
    } else {
      setErrorMessage(null);
      //Clear previous errors
      if (data === undefined) {
        setResponseData("undefined");
      }
      setResponseData(data); //Set Response data
      setSelectedMethod(selectedMethod); //Set selected Method
    };
  }

  return (
    <div className="container mt-4">
          {/* Render the UrlInputComponent and pass the callback for API Response */}
      <UrlInputComponent 
      onResponse={handleAPIResponse} 
      requestBody={requestBody} 
      method={selectedMethod}
      headers={headerData}
      />
      {/* Below is the Tab Component - Which will show tabs like parameter */}
      <div>

      <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} /> 
      </div>

      {/* Render the UrlInputComponent and pass the body state */}
      {/* Conditionally render the textarea for POST and PUT methods */}
      {(selectedMethod === 'POST' || selectedMethod === 'PUT' || selectedMethod === 'PATCH') && (

        <div className='container'>

          <h5>Enter a Request Body</h5>
          <RequestBodyComponent requestBody={requestBody} onBodyChange={handleBodyChange}/>{}
        </div>
      )}

      <div>
        <h3>API Response</h3>
        {/* Conditionally render the Body component */}
        {<ResponseBody responseData={responseData} />}

        {/* Display an Error, if any */}
        {errorMessage && <p style={{ color: 'red' }}> {errorMessage}</p>}
      </div>

    </div>
  );
}