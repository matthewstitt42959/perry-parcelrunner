import React from 'react';

const Heading = ({ level, children }) => {
    const HeadingTag = `h${level}`;
    return (
        <HeadingTag className="text-2xl font-bold text-black-600 mb-4">
            {children}
        </HeadingTag>
    );
};

export default Heading;