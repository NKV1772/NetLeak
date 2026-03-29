import './step.css'
import React from 'react'

const Step3 = () => {
    return (
        <div className='step-container'>
            <p className='steps'>BƯỚC 3/3</p>
            <h2>Chọn cách thanh toán</h2>
            <p>Quá trình thanh toán của bạn được mã hóa và bạn có thể thay đổi cách thanh toán bất kỳ lúc nào.</p>
            <b>An toàn để an tâm.</b>
            <b>Hủy trực tuyến dễ dàng.</b>
            <div className='step3-button-container'>
                <button className='w-full border border-gray-400 h-14 rounded-lg px-3 hover:border-black mb-5'>
                    <p className='text-left'>Thẻ ghi nợ hoặc thẻ tín dụng</p>
                </button>
                <button className='w-full border border-gray-400 h-14 rounded-lg px-3 hover:border-black'>
                    <p className='text-left'>Thanh toán trực tuyến</p>
                </button>
            </div>
        </div>
    );
}

export default Step3;