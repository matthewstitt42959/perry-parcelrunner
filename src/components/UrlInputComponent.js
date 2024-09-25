import { useState } from 'react';
import axios from 'axios'; 


export default function UrlInputComponent({onResponse}) {

    const [selectedOption, setSelectedOption] = useState('');
    //State for the selected option
    const [fullUrl, setFullUrl] = useState('');
    // State to store the full URL 
    const [displayUrl, setDisplayUrl] = useState('');
    // State to store the formatted URL for display


    const handleUrlChange = (e) => {
        const url = e.target.value;

        //Save the full URL
        setFullUrl(url);

        //Check if the URL is not empty and valid
        if (url.trim() === '') {
            setDisplayUrl('');
            return;
        }

        try {
            //Use the URL API to parse the URL
            const parsedURL = new URL(url);

            //Format the display URL to show only protocol, hostname, and pathname (no query params)
            const formattedUrl = `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.pathname}`;

            // Update the display URL with the formatted version
            setDisplayUrl(formattedUrl);
        } catch (error) {
            //If the URL is invalid, show it as-is
            setDisplayUrl(url);
        }
    };

    //Function to handle paste event
    const handlePaste = (e) => {
        //Get the pasted data as plain text
        const pastedData = e.clipboardData.getData('text');
        //Validate the pasted URL before allowing it to be processed
        try {
            const parsedURL = new URL(pastedData);
            //If valid then paste
            setFullUrl(pastedData);
            //Format the display URL to show only protocol, hostname, and pathname (no query params)
            const formattedUrl = `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.pathname}`;
            setDisplayUrl(formattedUrl);
        } catch (error) {
            e.preventDefault();
            alert('Invalid URL pasted');
        }
    };


    //Function to handle the form submission
    const handleSend = async () => {
        
        try {
          
            console.log(`Fetching: /api/proxy?url=${fullUrl}`)
            //Send the data to the proxy
 
            const response = await axios(`/api/proxy?url=${fullUrl}`); 
      

            if(!response.ok){
                throw new Error('Network response was not ok'); 
            }
            const data = await response.json(); 

            console.log(`Response returned: ${data}`); 
            
           onResponse(data); 
            //Set the response data to be passed to HomeComponent
        } catch (error) {
            setErrorMessage('Error fetching data: ', error);
            //Display the error in the UI
            onResponse({data: null, error: `Error fetching data: ${error.message}` })
        }
    };

    return (
        <><div className="input-group mb-4">
            <select className="form-select flex-grow-0 w-auto" id='status' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
            </select>

            {/* Input field */}
            <input required className="form-control" type="text" value={displayUrl}
                onChange={handleUrlChange} placeholder="https://example.com" />


            {/* Button to trigger the send */}
            <button type="submit" className="btn btn-primary" onClick={handleSend}>Send</button>


        </div></>
    );
}