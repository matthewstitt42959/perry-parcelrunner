import { useState } from 'react';
import Heading from './FormatUtilites/Format_Heading';
import Button from './FormatUtilites/Format_Button';
import Authorization from '../lib/user.json';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@windmill/react-ui';

export default function HeaderTab({ onHeaderChange }) {

    const [headerData, setHeaderData] = useState([
        { key: 'Authorization', value: Authorization.token, disabled: false },
        { key: 'Cache-Control', value: 'no-cache', disabled: false },
        { key: 'Content-Type', value: 'application/json', disabled: false },
        { key: 'Accept', value: 'application/json', disabled: false },

    ]);

    console.log('HeaderTabComponent rendered. Initial headerData:', headerData);

    const handleInputChange = (index, field, value) => {
        const newHeaderData = [...headerData];
        newHeaderData[index][field] = value;
        setHeaderData(newHeaderData);
    };
    const updateHeaders = (newHeaderData) =>{
        setHeaderData(newHeaderData);
    };

    const handleCheckboxChange = (index) => {
        const newHeaderData = [...headerData];
        newHeaderData[index].disabled = !newHeaderData[index].disabled;
        //Toggle the disable state
        setHeaderData(newHeaderData);

    };
    const addRow = () => {
        const newRow = { key: '', value: '', disabled: false }
        setHeaderData([...headerData, newRow]);
        console.log('Added new row. Current headerData:', headerData); // Log the new row addition
    };

    const deleteRow = (index) => {
        const newHeaderData = headerData.filter((_, i) => i !== index);
        setHeaderData(newHeaderData);
    };



    return (

        <div style={{ height: 'auto', width: '750px' }}>
      
            <Heading>Manage Headers</Heading>
            <Table style={{ tableLayout: 'auto', width: 'auto' }}>
                <TableHeader>
                    <TableRow>
                        <TableCell className='flex items-center text-sm'>Key</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Enabled</TableCell> {/* Additional column for the checkbox */}
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {headerData.map((row, index) => (
                        <TableRow key={index} style={{ backgroundColor: row.disabled ? 'lightgray' : 'transparent' }} // Change background color if disabled
                        >
                            <TableCell className='flex items-center text-sm'>
                                <input
                                    type='text'
                                    value={row.key}
                                    onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                                    disabled={row.disabled} // Disable input if the row is marked as disabled
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type='text'
                                    value={row.value}
                                    onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                    disabled={row.disabled} // Disable input if the row is marked as disabled
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type='checkbox'
                                    checked={!row.disabled}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                {/* Invert checkbox behavior to represent enabled state */
                                }
                            </TableCell>
                            <TableCell>
                                <Button type='button' onClick={() => deleteRow(index)}>X</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button type='button'
                className="text-white bg-blue-500 hover:bg-blue-700"
                onClick={addRow}>Add Row</Button>
              
        </div>
    );
}