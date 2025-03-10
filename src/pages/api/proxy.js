import axios from 'axios';
import https from 'https';
import fs from 'fs';

process.env.NODE_EXTRA_CA_CERTS = 'C:/Users/266833/Documents/Workplace/certificate/cacert.pem';

export default async function handler(req, res) {
    const apiUrl = req.query.url; // Retrieve the API URL from the query parameters
    const authorizationHeader = req.headers.authorization; // Capture the incoming authorization header

    // Validate the API URL
    if (!apiUrl) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    console.log('Authorization:', authorizationHeader); // Log the API URL for debugging
    const ca = fs.readFileSync(process.env.NODE_EXTRA_CA_CERTS); // Load the CA certificate
    const agent = new https.Agent({ ca, rejectUnauthorized: true });

    const method = req.method; // Determine the HTTP method (GET, POST, etc.)
    const data = method === 'POST' ? req.body : null; // Set the request body for POST requests

    // Prepare headers for the API request 
    const headers = {
        ...req.header,
        Authorization: `Bearer ${authorizationHeader}`, // Add the Authorization header explicitly
    };


    console.log('Request headers to be sent:', headers); // Log headers for debugging

    try {
        // Make the request to the external API
        const response = await axios(apiUrl, {
            method: method,
            httpsAgent: agent,
            data: data, // Include the request body for POST requests
            headers: headers

        });

        // Log the response headers for debugging
        console.log('Response headers received:', response.headers);


        return res.status(200).json(response.data); // Return the response from the API
    } catch (error) {
        console.error('Error in proxy request: ', error.message); // Log the error message

        // Handle different error scenarios
        if (error.response) {
            console.error('Axios Response Error: ', error.response.status);
            return res.status(error.response.status).json({
                error: error.response.data || `External API error: ${error.response.status}`,
            });
        } else if (error.request) {
            console.error('No response received from the external API: ', error.request);
            return res.status(502).json({ error: 'No response received from the external API' });
        } else {
            console.error('Error setting up the request: ', error.message);
            return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
        }
    }
}