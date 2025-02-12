
import HeaderTab from './HeaderTabComponent';
import { Button } from '@windmill/react-ui';
import ParamsTab from './ParamsTabComponent';
import React, { useState, useEffect } from 'react';


export default function TabsComponent({ activeTab, setActiveTab }) {

  //Function to render the active tab's content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'query-params-tab':
        return <ParamsTab/>;

      case 'request-headers-tab':
        return <HeaderTab />;
      default:
        return 
    }
  };
  return (
    <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
        <Button className="bg-purple text-white hover:bg-purple-700 px-button py-button" id="query-params-tab" data-bs-toggle="tab" data-bs-target="#query-params" type="button" role="tab" aria-controls="query-params" aria-selected="true"
            onClick={() => setActiveTab('query-params-tab')}>Query Params</Button>
        </li>
        <li className="nav-item" role="presentation">
        <Button className="bg-purple text-white hover:bg-purple-700 px-button py-button" id="request-headers-tab" data-bs-toggle="tab" data-bs-target="#request-headers" type="button" role="tab" aria-controls="request-headers" aria-selected="false"
            onClick={() => setActiveTab('request-headers-tab')}>Headers</Button>
        </li>

      </ul>

      {/* Render the content of the active tab */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}