import './pay.css'
import React from 'react'

const OptionContent = ({ title, content }) => {
    return (
        <div className='mb-3 pb-3 optcontent'>
            <p className='text-[#767676] font-medium text-sm'>{title}</p>
            <p className='text-[#4c4c4c] font-semibold text-base'>{content}</p>
        </div>
    );
}

export default OptionContent;