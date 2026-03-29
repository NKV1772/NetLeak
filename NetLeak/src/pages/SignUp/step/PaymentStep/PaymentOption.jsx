import './pay.css'
import React from 'react'
import OptionContent from './OptionContent';

const PaymentOption = ({ bg, name, opt , cost}) => {

    const bgStyle = {
        background: bg.bg1,
        background: bg.bg2,

    }

    return (
        <div className='flex flex-col w-full pb-4'>
            <div className='p-3 rounded-lg mb-5' style={bgStyle}>
                <p className='text-white font-black text-xl antialiased'>{name.titleContent}</p>
                <p className='text-white font-bold text-lg'>{name.nameContent}</p>
            </div>
            <OptionContent
                title={'Giá hàng tháng'}
                content={cost.toLocaleString() + 'đ'}
            />
            {opt.map((value, index) => {
                if (index != 0)
                    return (
                        <OptionContent
                            key={index}
                            title={value.title}
                            content={value.name}
                        />
                    );
            })}
        </div>
    );
}

export default PaymentOption;