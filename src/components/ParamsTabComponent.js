import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Importing PropTypes for prop validation
import Heading from './FormatUtilites/Format_Heading'; 
import StandardButton from './FormatUtilites/Format_Button';

export default function ParamsTab({ onParamChange }) {
    // Ensure onParamChange is a function, fallback to a no-op function
    const handleParamChange = (typeof onParamChange === 'function') 
        ? onParamChange 
        : () => console.error("onParamChange is not a function");

    const [paramData, setParamData] = useState([
        { key: '', value: '' },
    ]);

    const handleInputChange = (index, field, value) => {
       
        const newParamData = [...paramData];
        newParamData[index][field] = value;
        setParamData(newParamData);
        handleParamChange(newParamData); // Notify parent immediately after updating state
    };

    const addRow = () => {
        const newParamData = [...paramData, { key: '', value: '' }];
        setParamData(newParamData);
        handleParamChange(newParamData); // Notify parent immediately after adding a row
    };

    const deleteRow = (index) => {
        const newParamData = paramData.filter((_, i) => i !== index);
        setParamData(newParamData);
        handleParamChange(newParamData); // Notify parent immediately after deleting a row
    };

    useEffect(() => {
        // Notify parent when paramData changes
        handleParamChange(paramData);
        debugger
    }, [paramData, handleParamChange]);

    return (
        <div>
            <Heading>Parameter Tab Content</Heading>
            <p>Enter a Parameter</p>
            <div>
                <form data-form>
                    <div className="input-group mb-6">
                        <div>
                            {/* Table to display the Header Key/Values */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paramData.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input className='form-control'
                                                    type='text'
                                                    value={row.key}
                                                    onChange={(e) => handleInputChange(index, 'key', e.target.value)} />
                                            </td>
                                            <td>
                                                <input className='form-control'
                                                    type='text'
                                                    value={row.value}
                                                    onChange={(e) => handleInputChange(index, 'value', e.target.value)} />
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
                    </div>
                </form>
            </div>
        </div>
    );
}

// Adding prop types for better validation
ParamsTab.propTypes = {
    onParamChange: PropTypes.func.isRequired,
};
