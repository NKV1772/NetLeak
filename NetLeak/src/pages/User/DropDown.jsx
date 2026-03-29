import React from "react";

const DropDown = ({ object, isVisible }) => {
    
    // onClick={() => onClose()}
    return (
        isVisible && (
            <div className="bg-white p-4 w-52 shadow-lg rounded-md absolute -left-32 top-14">
                <ul>
                    {object.map((item, index) => (
                        <li key={index} className="py-2 px-2 rounded cursor-pointer hover:bg-blue-100">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        )
    );

};

export default DropDown;