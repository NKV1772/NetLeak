import React, { useState } from 'react';
import { MdArrowDropDownCircle } from "react-icons/md";
import { IoMdArrowDropupCircle } from "react-icons/io";

const SortByRating= ({ dropdownName, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [iconDirection, setIconDirection] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIconDirection(isOpen ? false : true);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="pt-1 w-1/6 inline-block text-left cursor-pointer">
            <div className="bg-zinc-300 rounded-md">
                <label
                    className=" cursor-pointer inline-flex justify-between w-full rounded-md bg-white px-4 py-2 text-lg font-medium text-gray-700 hover:bg-zinc-400"
                    id={`${dropdownName}-dropdown`}
                    onClick={toggleDropdown}
                >
                    {dropdownName}
                    <div>
                        {iconDirection ? <MdArrowDropDownCircle /> : <IoMdArrowDropupCircle />}
                    </div>
                </label>
            </div>
            {isOpen && (
                <div className=" absolute w-1/6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`${dropdownName}-dropdown`}>
                        {options.map((option) => (
                            <div key={option.id} className="block flex items-center justify-between px-4 py-2 hover:bg-zinc-300">
                                <label className="flex items-center w-full cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer block h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        checked={selectedOption && selectedOption.id === option.id}
                                        onChange={() => handleOptionClick(option)}
                                    />
                                    <div className="ml-2 text-sm text-gray-700 w-full truncate">{option.label}</div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortByRating;
