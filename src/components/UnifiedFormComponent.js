import React, { useState } from 'react';
import HeaderTab from './HeaderTabComponent'; // Existing component for headers
import ParamsTab from './ParamsTabComponent'; // New component for query parameters
import UrlInputComponent from './UrlInputComponent'; // Component to make API calls

export default function UnifiedFormComponent({}) {
    
    const [requestData, setRequestData] = useState({
        headers: [],
        queryParams: []
    });

    // Handle header updates
    const handleHeaderChange = (newHeaders) => {
        setRequestData(prevState => ({
            ...prevState,
            headers: newHeaders
        }));
    };

    // Handle query param updates
    const handleParamsChange = (newParams) => {
        setRequestData(prevState => ({
            ...prevState,
            queryParams: newParams
        }));
    };


    return (
        <div>
            <HeaderTab onHeaderChange={handleHeaderChange} />
            <ParamsTab onParamsChange={handleParamsChange} />
            <UrlInputComponent requestData={requestData} />
        </div>
    );
}