import './welcome.css';
import React from 'react';

const ContentSection = ({ title, content, image }) => {

    const positionStyle = {
        flexDirection: "row-reverse",
    };

    return (
        <div className='content-section overflow-hidden' style={positionStyle}>
            <div className='content'>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            <div className='media'>
                <img
                    src={image}
                    alt="section_image"
                />
            </div>
        </div>

    );
}

export default ContentSection;