

import axios from 'axios'; 
import https from 'https';
import fs from 'fs'; 
import { resolve } from 'path';

process.env.NODE_EXTRA_CA_CERTS = ('C:/Users/266833/Documents/Workplace/certificate/cacert.pem')

//const apiUrl = 'https://api.printful.com'
//const hostURL = 'https://jsonplaceholder.typicode.com/posts';


export default async function handler(req, res) {
  const apiUrl = req.query.url 
  if(!apiUrl){
    return
    res.status(400).json({error: 'No URL provided' }); 
  }
 
  const ca = fs.readFileSync(process.env.NODE_EXTRA_CA_CERTS)
  const agent = new https.Agent({ca:ca, rejectUnauthorized: true})
    const response = await axios.get(apiUrl,{httpsAgent: agent })
    .then(response => {
      res.setHeader('Content-type', 'application/json'); 
      
    return
    res.status(200).json(response.data); 
      
    })
    .catch(error => {
      console.error('Error in proxy request: ', error.message);
      //Server responses with an error code
      if(error.response){
      console.error('Axios Response Error: ', error.response.status); 
      console.error('Axios Response Data: ', error.response.data); 
      return; 
      res.status(error.response.status).json({error: error.response.data || `External API error: ${error.response.status}`, 
      })
      }else if(error.request) {
        console.error('No response received from the external API: ', error.request);
        return
        res.status(502).json({ error: 'No response received from the external API'}); 
      }else{
        console.error('Error setting up the request: ', error.message); 
        return
        res.status(500).json({ error: `Internal Server Error: ${error.message}` }); 
      }
      
      });
};
 
