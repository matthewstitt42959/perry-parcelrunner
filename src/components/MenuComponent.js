import React from 'react';
import { Button } from '@windmill/react-ui';
import { Logo } from '@windmill/react-ui'

export default function MenuComponent() {
    return (
        <div>
        <header className="mb-4 mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg">

            <div className='flex-grow'></div>
            <nav className='flex-items-end'>

                <ul className='flex space-x-2'>
                    <li>
                        <Button layout='link' className='border-0 mt-4'>HostName</Button>
                    </li>
                    <li>
                        <Button layout='link' className='border-0 mt-4'>Body</Button>
                    </li>

                </ul>

            </nav>
            
        </header>
        <div>
                        <ul>
                <label className='mr-4 text-left flex-shrink-0'>
                    <i>Todo: Use the Header to offer pre-selected URL host and Body</i>
                </label>
            </ul>
        </div>
        </div>
    );
};
