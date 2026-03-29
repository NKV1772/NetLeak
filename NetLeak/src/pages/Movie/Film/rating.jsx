import clsx from "clsx";
import React, { useState } from "react";

const Rating = () => {

    const [star1, setStar1] = useState(false)
    const [star2, setStar2] = useState(false)
    const [star3, setStar3] = useState(false)
    const [star4, setStar4] = useState(false)
    const [star5, setStar5] = useState(false)

    function setStar(star) {
        switch (star) {
            case 1:
                setStar1(true)
                setStar2(false)
                setStar3(false)
                setStar4(false)
                setStar5(false)
                break;
            case 2:
                setStar1(true)
                setStar2(true)
                setStar3(false)
                setStar4(false)
                setStar5(false)
                break;
            case 3:
                setStar1(true)
                setStar2(true)
                setStar3(true)
                setStar4(false)
                setStar5(false)
                break;
            case 4:
                setStar1(true)
                setStar2(true)
                setStar3(true)
                setStar4(true)
                setStar5(false)
                break;
            case 5:
                setStar1(true)
                setStar2(true)
                setStar3(true)
                setStar4(true)
                setStar5(true)
                break;
        }
    }

    return (
        <div className='absolute mt-3 flex flex-row gap-1'>
            <i
                onClick={() => setStar(1)}
                className={clsx({
                    'fa-regular fa-star text-green-500 cursor-pointer': !star1,
                    'fa-solid fa-star text-green-500 cursor-pointer': star1
                })}
            ></i>
            <i
                onClick={() => setStar(2)}
                className={clsx({
                    'fa-regular fa-star text-green-500 cursor-pointer': !star2,
                    'fa-solid fa-star text-green-500 cursor-pointer': star2
                })}
            ></i>
            <i
                onClick={() => setStar(3)}
                className={clsx({
                    'fa-regular fa-star text-green-500 cursor-pointer': !star3,
                    'fa-solid fa-star text-green-500 cursor-pointer': star3
                })}
            ></i>
            <i
                onClick={() => setStar(4)}
                className={clsx({
                    'fa-regular fa-star text-green-500 cursor-pointer': !star4,
                    'fa-solid fa-star text-green-500 cursor-pointer': star4
                })}
            ></i>
            <i
                onClick={() => setStar(5)}
                className={clsx({
                    'fa-regular fa-star text-green-500 cursor-pointer': !star5,
                    'fa-solid fa-star text-green-500 cursor-pointer': star5
                })}
            ></i>
        </div>
    );
}

export default Rating;