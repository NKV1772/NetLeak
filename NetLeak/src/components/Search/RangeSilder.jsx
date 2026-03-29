import { useState } from "react";
import Slider from 'react-slider'
import { MdArrowDropDownCircle } from "react-icons/md";
import { IoMdArrowDropupCircle } from "react-icons/io";
const min = 1950;
const max = 2025;

const RangeSlider = () => {
    const [values, setValues] = useState([min, max])
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [iconDirection, setIconDirection] = useState(false);
    const [round, setRound] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIconDirection(isOpen ? false : true);
    };

    return (
        <div className="pt-1 w-[70%] inline-block text-left cursor-pointer place-content-center">
            <div className="bg-zinc-300 rounded-md">
                <label
                    className=" cursor-pointer inline-flex justify-between w-full rounded-md bg-white px-4 py-2 text-lg font-medium text-gray-700 hover:bg-zinc-400"
                    onClick={toggleDropdown}
                >
                    Năm phát hành
                    <div>
                        {iconDirection ? <MdArrowDropDownCircle /> : <IoMdArrowDropupCircle />}
                    </div>
                </label>
            </div>
            {isOpen && (
                <div className=" border border-red-500 flex flex-col rounded-md mt-2 w-full text-500 text-cyan-700 bg-white items-center">
                      <Slider className="w-[90%] mt-3 h-1 bg-red-500 "
                            thumbClassName="top-[-2] thumb w-5 h-5 bg-red-700 rounded-full cursor-grab"
                            onChange={setValues}
                            value={values}
                            min={min}
                            max={max}
                        />
                        <div className="pt-10">
                        {values[0]} - {values[1]}
                            </div>



                </div>
            )}
        </div>
    )
}
export default RangeSlider