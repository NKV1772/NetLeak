import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import NavDropButton from "./NavDropButton";

const NavButton = ({ text, icon, navSlide, isDropDown, onclick, path, position, isSelect }) => {

    return (
        <Link
            to={path}
            onClick={onclick}
            className={clsx({
                "w-full flex flex-col items-center justify-between text-white cursor-pointer  hover:bg-[#0A3379] duration-150 rounded-lg": position != isSelect,
                "w-full flex flex-col items-center justify-between text-white cursor-pointer  bg-[#0A3379] rounded-lg": position == isSelect
            })}
        // className="w-full flex flex-row items-center justify-between text-white cursor-pointer p-3 hover:bg-[#0A3379] duration-150"
        // className="w-full flex flex-row items-center justify-between text-white cursor-pointer p-3 bg-[#0A3379]"
        >
            <div className="w-full flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-3 items-center">
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                        <i class={`${icon} text-xl`}></i>
                    </div>
                    {navSlide && (
                        <p className="text-[15px] font-bold">{text}</p>
                    )}
                </div>
                {navSlide && (
                    <>
                        {isDropDown && (
                            <i
                                // class="fa-solid fa-caret-down text-xl"
                                className={clsx({
                                    "fa-solid fa-caret-down text-xl rotate-[-90deg] mr-5": position != isSelect,
                                    "fa-solid fa-caret-down text-xl mr-5": position == isSelect,
                                })}
                            ></i>
                        )}
                    </>
                )}
            </div>

        </Link>
    );
}

export default NavButton;