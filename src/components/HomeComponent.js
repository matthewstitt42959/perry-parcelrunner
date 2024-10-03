import { useState } from 'react';
import axios from 'axios';
import UrlInputComponent from './UrlInputComponent';
import ResponseBody from './ResponseBodyComponent';

export default function HomeComponent() {

  const [responseData, setResponseData] = useState(null);
  // State to store API response data
  const [errorMessage, setErrorMessage] = useState(null);
  // State to store Error message
  const [body, setBody] = useState('');
  //State for Body, for POST and PUT
  const [selectedMethod, setSelectedMethod] = useState('GET');

  //Callback function to handle API response from UrlInputComponent
  const handleBodyChange = (e) => { 
    setBody(e.target.value); };

  const handleAPIResponse = (data, error = null) => {
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
      setResponseData(data);
      //Set Response data
    }
  }
  // Props that need to be passed to UrlInputComponent
  const urlInputProps = {
    body: body, 
    onResponse: handleAPIResponse,
  };

  return (
    <div className="container mt-4">
      <form data-form>
        <div className="input-group mb-4">
          {/* Render the UrlInputComponent and pass the callback for API Response */}
          <UrlInputComponent onResponse={handleAPIResponse}

          />

          <div className="tab-content p-3 border-top-0 border">
            <div className="tab-pane fade show active" id="query-params" role="tabpanel" aria-labelledby="query-params-tab">
              <div data-query-params></div>
              <button data-add-query-param-btn className="mt-2 btn btn-outline-success" type="button">Add</button>
            </div>
          </div>
        </div>
        </form>
        {/* Render the UrlInputComponent and pass the body state */}
        {/* Conditionally render the textarea for POST and PUT methods */}
        {(selectedMethod === 'POST' || selectedMethod === 'PUT') && (

          <div className='container'>

            <h5>Enter a Request Body</h5>
            <div className='row col-md-6'>

              <textarea className='form-control' value={body}
                style={{ minHeight: '200px', resize: 'none' }}
                onChange={handleBodyChange}
                placeholder="Enter request body as JSON"
              />
            </div>
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