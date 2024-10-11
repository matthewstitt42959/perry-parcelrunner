import React from 'react'; 

export default function ResponseBody({responseData, errorMessage}) {
    const formattedData = JSON.stringify(responseData, null, 2).replace(/,/g, ',<br />');
   
    ({responseData}) => {
        if(!responseData){
            return null; 
            //return nothing if there is nothing
        }
    }
    return (
        
        <div className="border mt-4 bg-gray-100 p-4">
        {/* Display the error message, if it exists */}
        {errorMessage &&(
            <div style={{color: 'red', marginBottom: '10px'}}>
              <pre>{errorMessage} </pre>
            </div>
        )}
        {/* Display the response data as formatted JSON */}
    
        <pre dangerouslySetInnerHTML={{__html: formattedData }} />
    </div>
    );
}