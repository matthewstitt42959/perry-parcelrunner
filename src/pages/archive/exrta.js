

import axios from 'axios'; 
import { error } from 'console';


process.env.NODE_EXTRA_CA_CERTS = ('C:/Users/266833/Documents/Workplace/certificate/cacert.pem')

//const apiUrl = 'https://api.printful.com'
//const hostURL = 'https://jsonplaceholder.typicode.com/posts';


export default async function handler(req, res) {
  const {url} = req.query
  
  if(!url){
    return res.status(400).json({error: 'No URL provided' }); 
  }
  console.log(`Received request from URL: ${url}`); 

try{
    const axiosConfig = {
      method: req.method,
      url, 
      data: req.body, 
      headers: {
        ...req.headers, 
      }, 
    }; 
    const response = await axios(axiosConfig); 
    return res.status(response.status).json(response.data); 
  }catch(error){
    console.error('Error forwarding request: ', error); 
  }

   if(error.response){
    return res.status(error.response.status).json({
      error: error.response.data || 'Error processing request',
    });

   }
   return res.status(500).json({error: 'Server error'}); 
  }
