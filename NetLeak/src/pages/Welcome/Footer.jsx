import './welcome.css'
import React from 'react'

const Footer = () => {
    return (
        <ul className='footer'>
            <li>
                <h3>Về Netflix</h3>
                <ul>
                    <li>Câu hỏi thường gặp</li>
                    <li>Quyền riêng tư</li>
                    <li>Tuỳ chọn cookie</li>
                    <li>Việc làm</li>
                    <li>Thông tin pháp lý</li>
                    <li>Chỉ có trên Netleak</li>
                </ul>
            </li>
            <li>
                <h3>Về chúng tôi</h3>
                <ul>
                    <li>23521772 - Nguyễn Khánh Vân</li>
                    <li>23521832 - Nguyễn Khánh Vy</li>
                    <li>23521619 - Trần Thị Kiều Trâm</li>
                </ul>
            </li>
        </ul>
    );
}

export default Footer;