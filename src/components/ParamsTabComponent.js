import { useState, useEffect } from 'react';
import Heading from './FormatUtilites/Format_Heading'; 
import Button from './FormatUtilites/Format_Button'; 

export default function ParamsTab({ onParamChange }) {
    console.log("onParamChange:", onParamChange);
    if (typeof onParamChange !== 'function'){
        console.error("onParamChange is not a function");
        
    }

    const [paramData, setParamData] = useState([
        { key: '', value: '' },
    ]);


    const handleInputChange = (index, field, value) => {
        const newParamData = [...paramData];
        newParamData[index][field] = value;
        setParamData(newParamData);
    };

    const addRow = () => {
        setParamData([...paramData, { key: '', value: '' }]);
    }
    useEffect(() => {
        // Notify parent when paramData changes
        if (onParamChange) {
        onParamChange(paramData);
        }
    }, [paramData, onParamChange]);

    return (
        <div>
            <Heading>Parameter Tab Content</Heading>
            <p> Enter a Parameter</p>
            <div className="">
                <form data-form>
                    <div className="input-group mb-6">
                        <div>
                            {/* Table to display the Header Key/Values */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paramData.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type='text'
                                                    value={row.key}
                                                    onChange={(e) => handleInputChange(index, 'key', e.target.value)} />
                                            </td>
                                            <td>
                                                <input
                                                    type='text'
                                                    value={row.value}
                                                    onChange={(e) => handleInputChange(index, 'value', e.target.value)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Button 
                                type="button"
                                onClick={addRow}
                            >Add Row</Button>
                            {/* Need to add Remove row and select Checkbox row */}

                        </div>

                    </div>
                </form>
            </div>
        </div>

    );
}

