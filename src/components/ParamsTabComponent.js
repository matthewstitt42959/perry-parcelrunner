import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Importing PropTypes for prop validation
import Heading from './FormatUtilites/Format_Heading'; 
import StandardButton from './FormatUtilites/Format_Button';

export default function ParamsTab({ onParamChange }) {
  const [paramData, setParamData] = useState([{ key: '', value: '' }]);

  const handleInputChange = (index, field, value) => {
    const newParamData = [...paramData];
    newParamData[index][field] = value;
    setParamData(newParamData);
    onParamChange(newParamData);
  };

  const addRow = () => {
    const newParamData = [...paramData, { key: '', value: '' }];
    setParamData(newParamData);
    onParamChange(newParamData);
  };

  const deleteRow = (index) => {
    const newParamData = paramData.filter((_, i) => i !== index);
    setParamData(newParamData);
    onParamChange(newParamData);
  };

  return (
    <div>
      <Heading>Parameter Tab Content</Heading>
      <p>Enter a Parameter</p>
      <table>
        <thead>
          <tr><th>Key</th><th>Value</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {paramData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={row.key}
                  onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={row.value}
                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                />
              </td>
              <td>
                <StandardButton text="Delete" onClick={() => deleteRow(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <StandardButton text="Add Row" onClick={addRow} />
    </div>
  );
}

ParamsTab.propTypes = {
  onParamChange: PropTypes.func,
};

ParamsTab.defaultProps = {
  onParamChange: () => {},
};
