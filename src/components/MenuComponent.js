
import { Button } from '@windmill/react-ui';
import React, { useState, useEffect } from 'react';

export default function MenuComponent() {
    return (
        <div>
        <header className="rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg">

                 <nav className='flex-items-end'>
                <ul className='flex space-x-2'>
                    <li>
                        <Button layout='link' id='hostName' className='border-0 mt-4'>HostName</Button>
                    </li>
                    <li>
                        <Button layout='link' id='apiBody' className='border-0 mt-4'>Body</Button>
                    </li>

                </ul>

            </nav>
            
        </header>
        <div>
                        <ul>

            </ul>
        </div>
        </div>
    );
};
