import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './step.css'
import React from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Step2 = () => {
    return (
        <div className='step-container'>
            <p className='steps'>BƯỚC 2/3</p>
            <h2 className='step2-h2'>Chọn gói dịch vụ của bạn.</h2>
            <div className='step-content'>
                <FontAwesomeIcon icon={faCheck} className='icon' />
                <p>Không yêu cầu cam kết, hủy bất kỳ lúc nào.</p>
            </div>
            <div className='step-content'>
                <FontAwesomeIcon icon={faCheck} className='icon' />
                <p>Mọi thứ trên Netflix chỉ với mức giá thấp.</p>
            </div>
            <div className='step-content'>
                <FontAwesomeIcon icon={faCheck} className='icon' />
                <p>Không quảng cáo, không phụ phí. Luôn luôn như vậy.</p>
            </div>
            <Link to="/signup/payment" className='btn' onClick={() =>{
            }}>
                <p>Tiếp theo</p>
            </Link>
        </div>
    );
}

export default Step2;