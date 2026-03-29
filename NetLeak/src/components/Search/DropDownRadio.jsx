import React, { useState } from 'react';


const DropdownRadio = ({ dropdownName, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="pt-1 w-full inline-block text-left">
            <div className="bg-zinc-300 rounded-t-lg">
                <label
                    className="inline-flex justify-between w-full rounded-md bg-white px-4 py-2 text-lg font-medium text-gray-700"
                    id={`${dropdownName}-dropdown`}
                    onClick={toggleDropdown}
                >
                    {dropdownName}
                </label>
            </div>
            <div className="w-full rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`${dropdownName}-dropdown`}>
                    {options.map((option) => (
                        <div key={option.id} className="block flex items-center justify-between px-4 py-2 hover:bg-zinc-300">
                            <label className="flex items-center w-full cursor-pointer">
                                <input
                                    type="radio"
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
        </div>
    );
};

export default DropdownRadio;
