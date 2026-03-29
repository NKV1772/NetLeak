import './welcome.css';
import React from 'react';

const ContentVideo = ({ title, content, image, mediavideo }) => {

    const positionStyle = {
        flexDirection: "row",
    };

    return (
        <div className='content-section' style={positionStyle}>
            <div className='content'>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            <div className='media'>
                <img
                    src={image}
                    alt="section_image"
                />
                <video loop >
                    <source src={mediavideo} type="video/mp4" />
                </video>
            </div>
        </div>

    );
}

export default ContentVideo;