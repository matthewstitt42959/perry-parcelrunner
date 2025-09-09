import React, { useState } from 'react';

/**
 * UrlInputComponent allows users to input a URL, select an HTTP method,
 * and sends requests based on the input.
 *
 */
export default function UrlInputComponent({ inputs, setInputs, loading }) {

    const handleUrlChange = (e) =>
        setInputs(prev => ({ ...prev, url: e.target.value, submitted: false }));

    const handleMethodChange = (e) =>
        setInputs(prev => ({ ...prev, method: e.target.value, submitted: false }));


     return (
    <div className="flex gap-2 items-center w-full">
      <select
        className="form-select w-auto"
        value={inputs.method || 'GET'}
        onChange={handleMethodChange}
        disabled={loading}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
        <option value="HEAD">HEAD</option>
      </select>

      <input
        required
        className="form-control flex-grow"
        type="text"
        value={inputs.url || ''}
        onChange={handleUrlChange}
        placeholder="https://example.com"
        disabled={loading}
      />

      </div>
  );
}