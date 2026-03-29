import React from "react";
import { Link } from "react-router-dom";

const ResponsiveNav = ({ onclick }) => {
    return (
        <div
            onClick={onclick}
            className="block md:hidden fixed top-0 left-0 z-50 w-full h-screen overflow-hidden"
        >
            <div className=" top-0 h-screen w-2/5 bg-white z-30 p-3 flex flex-row-reverse gap-5">
                <i class="fa-solid fa-square-xmark h-auto text-4xl text-[#3e3e3e]  cursor-pointer hover:text-[#ff0000] duration-200"></i>
                <div className="w-full flex flex-col gap-5">
                    <h2 className="text-2xl font-black text-[#ff0000]">NETLEAK</h2>
                    <Link to="/home" >
                        <p className="text-black">Trang chủ</p>
                    </Link>
                    <Link to="/genre">
                        <p className="text-black">Thể loại</p>
                    </Link>
                    <Link to="/mylist">

                        <p className="text-black">Danh sách yêu thích</p>

                    </Link>

                </div>
            </div>
        </div>
    );
}

export default ResponsiveNav;