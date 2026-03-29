import React from "react";
import { useSwiper } from 'swiper/react';

const PrevButton = ({ title }) => {
    const swiper = useSwiper();
    return (
        <div className="w-full flex justify-between items-center">
            <button
                onClick={() => swiper.slidePrev()}
                className="h-auto w-auto border relative flex items-center justify-center group"
            >
                <svg class="rotate-180 z-10 w-[50px] h-[50px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className="h-auto w-auto border"
            >
                <svg class="w-[50px] h-[50px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>

            </button>
        </div>
    );
}

export default PrevButton;