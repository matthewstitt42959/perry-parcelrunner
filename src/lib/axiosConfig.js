

import axios from 'axios'; 
const authToken = 'PZJuIcRdlGKfzI3CDD3hratDBxxLutxqv2JHkiiR'
//const apiUrl = 'https://api.printful.com'
//const hostURL = 'https://jsonplaceholder.typicode.com/posts';


const axiosInstance = axios.create({
  //Set a base url if needed
  //baseurl: 'https://api.printful.com',
  timeout: 5000,
  //Default timeout

});

//Request Interceptor: Attach tokens
axiosInstance.interceptors.request.use(
  (config) => {
    //Example: Attach an Authorization token to every request
  
  const token = localStorage.getItem(authToken); 
  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request: ', config); 
  return config; 
},
(error) => { 
  return Promise.reject(error);
}
);
//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response: ', response); 
    //Any status code that falls with the range or 2xx causes this function to trigger
    return response; 
  }, 
  (error) => {
    //Any status codes that fall outside of 2xx
    if (error.response){
      const{status} = error.response; 
      if(status === 401){
        //Example redirect to log in - Potentially
        // Use an error message to notify if the token is not valid
        console.log('Unauthorized! Redirecting...'); 
        //window.location.href = 'login'; 
      }
      if(status)
      console.error('Error response: ', error.response);
      // Add additional logic for other status codes
    }else if(error.request) {
      console.error('No response received from the external API: ', error.request);
      return res.status(502).json({ error: 'No response received from the external API'}); 
    }else{
      console.error('Error setting up the request: ', error.message); 
      return res.status(500).json({ error: `Internal Server Error: ${error.message}` }); 
    }
    
    return
    Promise.reject(error); 
  });

  export const sendRequest = async({
    url, method = 'GET', data = null, headers = {}, params = {} }) =>{
      try{
        const response = await axiosInstance({
          url, method, data, headers, params, }); 
    return response.data; 
    }catch(error){
      throw error; 
    }
  }
