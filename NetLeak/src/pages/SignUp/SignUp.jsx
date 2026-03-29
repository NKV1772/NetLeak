import './signup.css'
import React from 'react'
import Step1 from './step/step1';
import Footer from '../Welcome/Footer';
import Step2 from './step/step2';
import PayStep from './step/PaymentStep/Pay';
import Step3 from './step/step3';
import { useParams } from 'react-router-dom';

const SignUp = () => {
    const {step} = useParams()
    return (
        <div className='signup-container'>
            <header>
                <h1>NETLEAK</h1>
                <p>Đăng nhập</p>
            </header>
            {step == "step1" && (
                <Step1 />
            )}
            {step == "step2" && (
                <Step2 />
            )}
            {step == "payment" && (
                <PayStep />
            )}
            {step == "step3" && (
                <Step3 />
            )}
        </div>
    );
}

export default SignUp;