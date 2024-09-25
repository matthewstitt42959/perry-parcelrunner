import React from 'react'; 

export default function ResponseBody({responseData, errorMessage}) {
    return (
        
        <div>
        {/* Display the error message, if it exists */}
        {errorMessage &&(
            <div style={{color: 'red', marginBottom: '10px'}}>
              <pre>{errorMessage} </pre>
            </div>
        )}
        {/* Display the response data as formatted JSON */}
    
        <div>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
            
        </div>
  
    </div>
    );
}