
import React, { useState, useEffect } from 'react';

export default function RequestBodyComponent({requestData, onBodyChange}) {
   
    return (
      <textarea 
      className='form-control' 
      value={requestData}
      onChange={onBodyChange}
          style={{ minHeight: '200px', resize: 'none' }}
          placeholder="Enter request body as JSON"
        />

    );
}
