import { Link } from 'react-router-dom';
import './step.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Step1 = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassWord, setConfirmPassWord] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')

    const handleCheck = () => {
        console.log("Checking")
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert('Vui lòng nhập đúng cú pháp email')
            return
        }

        if (password.length < 6 || password != confirmPassWord || password == '') {
            alert('Mật khẩu không trùng khớp')
            return
        }

        if (name == '') {
            alert('Vui lòng nhập tên của bạn')
            return
        }

        if (phone == '' || !phone.match(/^(0|\+84)?(\d{9,10})$/)) {
            alert('Vui lòng nhập số điện thoại')
            return
        }

        if (sex == '') {
            alert('Vui lòng chọn giới tính của bạn')
            return
        }

        fetch('http://localhost:8081/v1/api/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                sexuality: sex,
                phone: phone
            })
        })
            .then(res => res.json())
            .then((data) => {
                if(data.statusCode ==201)
                {
                    alert("Email đã được đăng ký, vui lòng nhập Email khác")
                    return;
                }
                else
                {

                localStorage.setItem('userID', data.user._id)
                
                navigate('/signup/step2')
            }

            })
            .catch((e) => { console.log(e) })
    }

    return (
        <div className='step-container'>
            <p className='steps'>BƯỚC 1/3</p>
            <h2 className=' font-semibold'>Chào mừng bạn đến với Netleak! Tham gia Netleak thật đơn giản</h2>
            {/* <p>Chỉ cần nhập mật khẩu và bạn sẽ được xem ngay lập tức</p> */}
            {/* <p className='email'>Email</p>
            <b>quidhtv0149@gmail.com</b> */}

            <input
                type='text'
                placeholder='Nhập email'
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />

            <input
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <input
                type='password'
                placeholder='Xác nhận mật khẩu'
                value={confirmPassWord}
                onChange={(e) => {
                    setConfirmPassWord(e.target.value)
                }}
            />

            <input
                type='text'
                placeholder='Nhập họ tên'
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />

            <select
                onChange={(e) => {
                    setSex(e.target.value)
                }}
                className=' w-full h-[60px] outline-none border-[1px] border-[black] border-solid mt-[15px] p-2'>
                <option value="" selected disabled>--Giới tính--</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
            </select>

            <input
                type='password'
                placeholder='Nhập số điện thoại'
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value)
                }}
            />

            {/* <p className='forgot'>Bạn quên mật khẩu?</p> */}
            <button
                onClick={handleCheck}
                className='btn hover:opacity-[0.7]'
            >
                <p>Tiếp theo</p>
            </button>
        </div>
    );
}

export default Step1;