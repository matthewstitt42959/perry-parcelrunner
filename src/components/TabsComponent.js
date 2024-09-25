import {useState} from 'react'; 
import HeaderTab from './HeaderTabComponent';
import JSONTab from './JSONTabComponent';
import PostmanComponent from './HomeComponent';
import HomeComponent from './HomeComponent';

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState('tab1'); 

    //Function to render the active tab's content
    const renderTabContent = () => {
        switch (activeTab) { 
            case 'tab1': 
            return <HomeComponent/>; 
            case 'tab2': 
            return <HeaderTab/>; 
            case 'tab3': 
            return <JSONTab/>; 
            default: 
            return <HomeComponent/>; 
        }
    };
    return (
        <div>
        <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="query-params-tab" data-bs-toggle="tab" data-bs-target="#query-params" type="button" role="tab" aria-controls="query-params" aria-selected="true" 
          onClick={() => setActiveTab('tab1')}>Query Params</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="request-headers-tab" data-bs-toggle="tab" data-bs-target="#request-headers" type="button" role="tab" aria-controls="request-headers" aria-selected="false"
          onClick={() => setActiveTab('tab2')}>Headers</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="json-tab" data-bs-toggle="tab" data-bs-target="#json" type="button" role="tab" aria-controls="json" aria-selected="false"
          onClick={() => setActiveTab('tab3')}>JSON</button>
        </li>
      </ul>

        {/* Render the content of the active tab */}
        <div className="tab-content">
        {renderTabContent()}
        </div>
    </div>
    );
}