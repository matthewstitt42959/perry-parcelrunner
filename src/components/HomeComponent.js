import { useState } from 'react';
import axios from 'axios';
import UrlInputComponent from './UrlInputComponent';
import ResponseBody from './ResponseBodyComponent';

export default function
  HomeComponent() {

  const [responseData, setResponseData] = useState(null);
  // State to store API response data
  const [errorMessage, setErrorMessage] = useState(null);
  // State to store Error message

  //Callback function to handle API response from UrlInputComponent
  const handleAPIResponse = (data, error = null)=> {
    if(error){
      setErrorMessage(error); 
    //Set Error message
      setResponseData(null); 
    //Clear if there is an error 
  }else{
    setErrorMessage(null); 
    //Clear previous errors
    setResponseData(data); 
    //Set Response data
  }
}

  return (
    <div className="p-4">
      <form data-form>
        <div className="input-group mb-4">
          {/* Render the UrlInputComponent and pass the callback for API Response */}
          <UrlInputComponent onResponse={handleAPIResponse} />

        </div>

        <div className="tab-content p-3 border-top-0 border">
          <div className="tab-pane fade show active" id="query-params" role="tabpanel" aria-labelledby="query-params-tab">
            <div data-query-params></div>
            <button data-add-query-param-btn className="mt-2 btn btn-outline-success" type="button">Add</button>
          </div>
        </div>
      </form>

      <form>
          <h3>API Response</h3>
          {/* Conditionally render the Body component */}
          {responseData || <ResponseBody responseData={responseData} />}

          {/* Display an Error, if any */}
          {errorMessage && <p style={{ color: 'red'}}> {error}</p>}
                 
       
      </form>

    </div>
  );
}