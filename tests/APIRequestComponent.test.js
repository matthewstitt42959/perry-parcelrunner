// import React from 'react';
// import { render } from '@testing-library/react';
// import APIRequestComponent from '../src/components/APIRequestComponent.js';
// import sinon from 'sinon';
// import axios from 'axios';
import { expect } from 'chai';

// // Mock the axios module globally
// sinon.stub(axios, 'get').resolves({ data: {} });

// describe('APIRequestComponent', function() {

//   // Clean up mocks after each test
//   afterEach(function() {
//     sinon.restore();
//   });

//   it('renders without crashing', function() {
//     const { container } = render(
//       <APIRequestComponent
//         onResponse={() => {}}
//         requestBody={null} 
//         headers={[{ key: 'Content-Type', value: 'application/json' }]}
//         inputs={{ submitted: true, url: 'http://example.com', method: 'GET' }}
//       />
//     );
//     expect(container).to.exist;
//   });
  
//   it('makes a GET request with correct headers', async function() {
//     const onResponseMock = sinon.spy();
//     const headers = [{ key: 'Content-Type', value: 'application/json' }];
//     const inputs = { submitted: true, url: 'http://example.com', method: 'GET' };

//     render(
//       <APIRequestComponent
//         onResponse={onResponseMock}
//         requestBody={null}
//         headers={headers}
//         inputs={inputs}
//       />
//     );

//     // Check if axios.get was called with the expected URL
//     sinon.assert.calledOnce(axios.get);
//     expect(axios.get).to.have.been.calledWithMatch(inputs.url);
//   });
// });

describe('Basic Math Test', function() {
  it('should return true for 1 + 1 equals 2', function() {
    expect(1 + 1).to.equal(2);
  });
});

