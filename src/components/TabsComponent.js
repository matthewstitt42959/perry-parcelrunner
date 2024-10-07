import { useState } from 'react';
import HeaderTab from './HeaderTabComponent';
import JSONTab from './JSONTabComponent';
import HomeComponent from './HomeComponent';

export default function TabsComponent({ activeTab, setActiveTab }) {

  //Function to render the active tab's content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'query-params-tab':
        return <div>
          {/* Below is the Parameter code - Eventually to be included in own tab */}
          <div className="tab-content p-3 border-top-0 border">
            <div className="tab-pane fade show active" id="query-params" role="tabpanel" aria-labelledby="query-params-tab">
              <div data-query-params></div>
              <button data-add-query-param-btn className="mt-2 btn btn-outline-success" type="button">Add</button>
            </div>
          </div>

        </div>;
      case 'request-headers-tab':
        return <HeaderTab />;
      case 'json-tab':
        return <JSONTab />;
      default:
        return 
    }
  };
  return (
    <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="query-params-tab" data-bs-toggle="tab" data-bs-target="#query-params" type="button" role="tab" aria-controls="query-params" aria-selected="true"
            onClick={() => setActiveTab('query-params-tab')}>Query Params</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="request-headers-tab" data-bs-toggle="tab" data-bs-target="#request-headers" type="button" role="tab" aria-controls="request-headers" aria-selected="false"
            onClick={() => setActiveTab('request-headers-tab')}>Headers</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="json-tab" data-bs-toggle="tab" data-bs-target="#json" type="button" role="tab" aria-controls="json" aria-selected="false"
            onClick={() => setActiveTab('json-tab')}>JSON</button>
        </li>
      </ul>

      {/* Render the content of the active tab */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}