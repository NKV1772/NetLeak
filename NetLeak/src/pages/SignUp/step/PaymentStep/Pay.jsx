import PaymentOption from './PaymentOption';
import { Link } from 'react-router-dom';
import OPT from '../../../../JSON/PaymentOption';
import './pay.css'
import React, { useEffect, useState } from 'react'
import { useNavigate,redirect } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from "../../../../assets/Lottie/Find.json";

const PayStep = () => {
    const navigate = useNavigate()
    const [pakageInfo, setPakageInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [check, setCheck] = useState(0)

    useEffect(() => {
        const fetchPaymentPakage = () => {
            setIsLoading(true)
            fetch('http://localhost:8081/v1/api/admin/payments')
                .then((res) => res.json())
                .then((data) => {
                    setPakageInfo(data)
                })
                .catch(e => { console.log(e) })
                .finally(() => { setIsLoading(false) })
        }

        fetchPaymentPakage()
    }, [])

    const handleCheckOut = (cost) => {
        setIsLoading(true)
        fetch('http://localhost:8081/v1/api/user/payment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                amount: cost,
                orderInfo: 'pay momo with ' + cost + ' k'
            })
        })
            .then(res => res.json())
            .then((data) => { 
                setIsLoading(false)
                localStorage.setItem('pakageId', pakageInfo[check]._id)
                window.open(data.payUrl, "_self")
                window.close()
            })
            .finally(()=>{
                setIsLoading(false)
            })
            
    }

    return (
        <>
            {isLoading == false ? 
                <div className='paystep-container'>
                    <p className='steps'>BƯỚC 2/3</p>
                    <h2 className='step2-h2'>Chọn gói dịch vụ của bạn.</h2>
                    <div className="grid w-full gap-3 md:grid-cols-4 mt-5">
                        {
                            pakageInfo.map((pakage, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setCheck(index)
                                        }}
                                        className={` ${check == index ? ' opacity-[1]' : ' opacity-[0.8]'}`}
                                    >
                                        {/* <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required /> */}
                                        <div htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-3 h-full text-gray-500 bg-white border border-[#cccccc] rounded-lg cursor-pointer dark:hover:text-gray-300 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <div className="block w-full">
                                                <PaymentOption
                                                    bg={OPT[index].background}
                                                    name={OPT[index].name}
                                                    opt={OPT[index].options}
                                                    title={pakage.title}
                                                    cost={pakage.cost}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='btn' onClick={() => { handleCheckOut(pakageInfo[check].cost) }}>
                        <p>Thanh toán</p>
                    </div>
                </div>
                
                :
                <>
                <Lottie height={400} width={400} animationData={animationData} className="flex-grow"/>
                <p className='text-xl text-black '> Đang Loading, bạn chờ chút nhé!</p>
                </>

            }
        </>
    );
}

export default PayStep;