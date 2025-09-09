import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderData_json from '../lib/user.json'; // Import Authorization
/**
 * APIRequestComponent is responsible for sending API requests using
 * the provided URL and method. It updates the loading state and
 * status message based on the outcome of the request.
 * 
 * @param {Array} headers - Array of header objects.
 * @param {Object} requestData - The request body for POST/PUT/PATCH.
 * @param {Object} inputs - Input data including URL, method.
 * @param {Function} onResponse - Callback fired with the response or error message.
 */
export default function APIRequestComponent({onResponse,  requestData, inputs, setLoading  }) {
    const [responseData, setResponseData] = useState(null); // State to manage response data
    const [error, setError] = useState(null); // State to manage error
   
       // Initial header data
       const [headers, setHeaders] = useState([
        { key: 'Authorization', value: HeaderData_json.token },
        { key: 'Cache-Control', value: HeaderData_json.cacheControl },
        { key: 'Content-Type', value: HeaderData_json.contentType},
        { key: 'Accept', value: HeaderData_json.accept },
    ]);
   

    useEffect(() => {
     
        if (inputs.submitted) {
            setLoading(true);
            setError(null);
            setResponseData(null);
            handleSend(inputs.url, inputs.method, requestData);
        }
    }, [inputs, requestData]); // Add required dependencies


    const handleSend = async (url, selectedMethod, reqData) => {
    try {
      // 1) ALWAYS encode the upstream URL in the proxy query param
      const urlWithProxy = `/api/proxy?url=${encodeURIComponent(url)}`;

      // 2) Build headers object from your array
      const baseHeaders = headers.reduce((acc, h) => {
        if (h.key && h.value != null && String(h.value).length > 0) acc[h.key] = h.value;
        return acc;
      }, {});

      // 3) Forward Authorization *as-is*; if it’s a bare JWT, add Bearer automatically
      if (baseHeaders.Authorization && !/^Bearer\s/i.test(baseHeaders.Authorization)) {
        // naive JWT check: three dot-separated chunks
        if (baseHeaders.Authorization.split('.').length === 3) {
          baseHeaders.Authorization = `Bearer ${baseHeaders.Authorization}`;
        }
      }

      const method = (selectedMethod || 'GET').toUpperCase();

      // 4) Prepare body only for methods that support it
      let body;
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        if (reqData) {
          if (typeof reqData === 'string') {
            // If string, make sure it's valid JSON
            try {
              const parsed = JSON.parse(reqData);
              body = JSON.stringify(parsed);
            } catch {
              const errorMsg = 'Invalid JSON in request body.';
              setError(errorMsg);
              onResponse(null, errorMsg);
              setLoading(false);
              return;
            }
          } else {
            // If it's already an object
            body = JSON.stringify(reqData);
          }
        }
        // Ensure Content-Type when we have a body and it’s not already set
        if (body && !Object.keys(baseHeaders).some(k => k.toLowerCase() === 'content-type')) {
          baseHeaders['Content-Type'] = 'application/json';
        }
      } else {
        // GET/HEAD → no body and don’t force a content-type
        body = undefined;
        // Strip Content-Type if present (some APIs behave oddly)
        for (const k of Object.keys(baseHeaders)) {
          if (k.toLowerCase() === 'content-type') delete baseHeaders[k];
        }
      }

      // 5) Longer timeout to match server axios timeout (15s)
      const response = await fetchWithTimeout(
        urlWithProxy,
        {
          method,
          headers: baseHeaders,
          body,
        },
        15000
      );

      const contentType = response.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      setResponseData(data);
      onResponse(data, method);
    } catch (err) {
      const errorMsg = `An error occurred: ${err.message}`;
      console.error('Error fetching data:', errorMsg);
      setError(errorMsg);
      onResponse(null, errorMsg);
    } finally {
      setLoading(false);
    }
  };


    const fetchWithTimeout =(url, options, timeout = 5000) => {
 
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Request timed out"));
            }, timeout);
            fetch(url, options)
                .then((response) => {
                    clearTimeout(timer);
                    resolve(response);
                })
                .catch((err) => {
                    clearTimeout(timer);
                    reject(err);
                });
        });
    };

    // This component does not render anything
    return null;
}

APIRequestComponent.propTypes = {
    onResponse: PropTypes.func.isRequired,
    requestData: PropTypes.string,
    // headers: PropTypes.arrayOf(PropTypes.shape({
    //     key: PropTypes.string,
    //     value: PropTypes.string
    // })),
    inputs: PropTypes.shape({
        url: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        submitted: PropTypes.bool.isRequired
    }).isRequired,
    setLoading: PropTypes.func.isRequired
};
