import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import image from '../../assets/img.jpg'

const StatusBar = ({ onclick }) => {
    return (
        <div
            className="w-full flex items-center justify-center bg-[#101A33] rounded-lg p-3"
        >
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-5 rounded-full pr-5">
                    <div
                        onClick={onclick}
                        className="w-[40px] h-[40px] flex items-center justify-center hover:bg-white rounded-md cursor-pointer duration-150 group"
                    >
                        <i class="fa-solid fa-bars text-2xl text-white group-hover:text-[#0A3379] duration-150"></i>
                    </div>
                    
                    <Breadcrumb />
                </div>
                {/* <div className="w-auto h-[50px] flex flex-row items-center justify-between border-l px-5">
                    <div className="w-[50px] h-[50px] flex items-center justify-center  rounded-full cursor-pointer ">
                        <i class="fa-solid fa-user text-xl text-white hidden"></i>
                        <img
                            src={image}
                            className="w-[50px] h-[50px] rounded-full"
                        />
                    </div>
                    <div className="h-[50px] flex flex-col justify-between px-5">
                        <p className="text-white font-medium">kophaiqui</p>
                        <p className="text-[#0A3379] text-center rounded-md bg-white font-bold ">admin</p>
                    </div>
                    <div className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white rounded-md cursor-pointer duration-150 group">
                        <i className="fa-solid fa-caret-down text-white text-xl group-hover:text-[#0A3379] duration-150"></i>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default StatusBar;
