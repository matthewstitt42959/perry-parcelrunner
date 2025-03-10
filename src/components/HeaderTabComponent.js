import React, { useState, useEffect } from 'react';
import Heading from './FormatUtilites/Format_Heading';
import Button from './FormatUtilites/Format_Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@windmill/react-ui';
import HeaderData_json from '../lib/user.json'; // Import Authorization

const HeaderRow = ({ row, index, handleInputChange, handleCheckboxChange, deleteRow }) => (
    <TableRow key={index} style={{ backgroundColor: row.disabled ? 'lightgray' : 'transparent' }}>
        <TableCell className='flex items-center text-sm'>
            <input
                type='text'
                name='key'
                value={row.key}
                onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                disabled={row.disabled} // Disable input if the row is marked as disabled
            />
        </TableCell>
        <TableCell>
            <input
                type='text'
                name='value'
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
            {/* Invert checkbox behavior to represent enabled state */}
        </TableCell>
        <TableCell>
            <Button type='button' onClick={() => deleteRow(index)}>X</Button>
        </TableCell>
    </TableRow>
);

export default function HeaderTab({ headerData, onHeaderButtonChange }) {

    // Initial header data
    const [headers, setHeaderButtonData] = useState([
        { key: 'Authorization', value: HeaderData_json.token, disabled: false },
        { key: 'Cache-Control', value: HeaderData_json.cacheControl, disabled: false },
        { key: 'Content-Type', value: HeaderData_json.contentType, disabled: false },
        { key: 'Accept', value: HeaderData_json.accept, disabled: false },
    ]);

    
    const handleInputChange = (index, field, value) => {
 
        const updatedData = [...headers]; 
        updatedData[index][field] = value; 
        setHeaderButtonData(updatedData);
    };


    useEffect(() => {
        debugger;
        // Save to user.json when headers change
        const saveHeaders = async () => {
            try {
                await fetch(HeaderData_json, {
                        headers: {
                        'Content-Type': 'application/json',
                    },
                  //  body: JSON.stringify({ headers: headers }),
                });
            } catch (error) {
                console.error('Error saving headers:', error);
            }
        };
        saveHeaders();
    }, [headers]);


    const handleCheckboxChange = (index) => {
        const newHeaderData = [...headers];
        newHeaderData[index].disabled = !newHeaderData[index].disabled;
        // Toggle the disable state
        // setHeaderData(newHeaderData);
    };

    const addRow = () => {
        const newRow = { key: '', value: '', disabled: false };
        setHeaderButtonData([...headers, newRow]);
    };

    const deleteRow = (index) => {
        const newHeaderData = headers.filter((_, i) => i !== index);
        // setHeaderData(newHeaderData);
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
                    {headers.map((row, index) => (
                        <HeaderRow
                            key={index}
                            row={row}
                            index={index}
                            handleInputChange={handleInputChange}
                            handleCheckboxChange={handleCheckboxChange}
                            deleteRow={deleteRow}
                        />
                    ))}
                </TableBody>
            </Table>
            <Button
                type='button'
                className="text-white bg-blue-500 hover:bg-blue-700"
                onClick={addRow}
            >
                Add Row
            </Button>
        </div>
    );
}