import { useState, useEffect } from 'react';


export default function HeaderTab({ onHeaderChange }) {
    console.log("onHeaderChange:", onHeaderChange);
    if (typeof onHeaderChange !== 'function'){
        console.error("onHeaderChange is not a function");
        
    }

    const [headerData, setHeaderData] = useState([
        { key: 'Authorization', value: '' },
        { key: 'Cache-Control', value: 'no-cache' },
        { key: 'Token', value: '' },
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Accept', value: 'application/json' },
        { key: 'Accept-Encoding', value: 'gzip, deflate, br' },
        { key: 'Connection', value: 'keep-alive' },
        { key: '', value: '' },
    ]);


    const handleInputChange = (index, field, value) => {
        const newHeaderData = [...headerData];
        newHeaderData[index][field] = value;
        setHeaderData(newHeaderData);
    };

    const addRow = () => {
        setHeaderData([...headerData, { key: '', value: '' }]);
    }
    useEffect(() => {
        // Notify parent when headerData changes
        if (onHeaderChange) {
        onHeaderChange(headerData);
        }
    }, [headerData, onHeaderChange]);

    return (
        <div>
            <h2>Header Tab Content</h2>
            <p> This is the content for Header</p>
            <div className="p-4">
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
                                    {headerData.map((row, index) => (
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

                            <button className="mt-2 btn btn-outline-success"
                                type="button"
                                onClick={addRow}
                            >Add Row</button>
                            {/* Need to add Remove row and select Checkbox row */}

                        </div>

                    </div>
                </form>
            </div>
        </div>




    );
}

