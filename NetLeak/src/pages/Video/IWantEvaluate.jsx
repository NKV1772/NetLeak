import React, { useState } from 'react'
import './Video.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

function IWantEvaluate({ handleAddRating, handleDeleteRating, allRatingFilms, filmId}) {
    const [invisibleEvaluateBlock, setInvisibleEvaluateBlock] = useState(true)
    const [numberStar, setNumberStar] = useState(0)

    return (
        <>
            {/*pc*/}
            <div className='relative hidden lg:block'
                onMouseLeave={() => { setInvisibleEvaluateBlock(true) }}
            >
                <p className=' text-[13px] md:text-[15px] lg:text-[15px] ml-3 text-green-500 hover:cursor-pointer '
                    onMouseEnter={() => { setInvisibleEvaluateBlock(false) }}
                >
                    Tôi muốn đánh giá
                </p>

                {invisibleEvaluateBlock == false &&
                    <div
                        className='absolute z-10 w-[270px] h-[100px] 
                                rounded-[4px] boder bg-[#1A1C22] 
                                left-[12px] border-[1px] border-white border-opacity-[0.3]
                                flex flex-col justify-center items-center'
                    >
                        <div className='ml-10 mr-10'>
                            <div className='flex'>
                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onMouseEnter={() => {
                                        setNumberStar(1);
                                        handleDeleteRating(filmId)
                                    }}

                                    onMouseLeave={() => {
                                        setNumberStar(0)
                                    }}
                                    onClick={() =>{
                                        setInvisibleEvaluateBlock(true)
                                        handleAddRating(filmId, numberStar*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 1 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onMouseEnter={() => {
                                        setNumberStar(2);
                                        handleDeleteRating(filmId)
                                    }}

                                    onMouseLeave={() => {
                                        setNumberStar(0)
                                    }}
                                    onClick={() =>{
                                        setInvisibleEvaluateBlock(true)
                                        handleAddRating(filmId, numberStar*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 2 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onMouseEnter={() => {
                                        setNumberStar(3);
                                        handleDeleteRating(filmId)
                                    }}

                                    onMouseLeave={() => {
                                        setNumberStar(0)
                                    }}
                                    onClick={() =>{
                                        setInvisibleEvaluateBlock(true)
                                        handleAddRating(filmId, numberStar*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 3 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onMouseEnter={() => {
                                        setNumberStar(4);
                                        handleDeleteRating(filmId)
                                    }}

                                    onMouseLeave={() => {
                                        setNumberStar(0)
                                    }}
                                    onClick={() =>{
                                        setInvisibleEvaluateBlock(true)
                                        handleAddRating(filmId, numberStar*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 4 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onMouseEnter={() => {
                                        setNumberStar(5);
                                        handleDeleteRating(filmId)
                                    }}

                                    onMouseLeave={() => {
                                        setNumberStar(0)
                                    }}
                                    onClick={() =>{
                                        setInvisibleEvaluateBlock(true)
                                        handleAddRating(filmId, numberStar*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 5 ? 'text-green-500' : 'text-[#999999]'} `}

                                    />
                                </div>
                            </div>


                            <p className='mt-2 text-white text-[13px]'>{numberStar == 0 ? 'Nhấn chọn xếp hạng' : numberStar == 1 ?
                                '2.0 Phim chán'
                                :
                                numberStar == 2 ?
                                    '4.0 Hơi kém'
                                    :
                                    numberStar == 3 ?
                                        '6.0 Tạm được'
                                        :
                                        numberStar == 4 ?
                                            '8.0 Tốt'
                                            :
                                            '10.0 Hoàn hảo'}
                            </p>
                        </div>
                    </div>
                }
            </div>

            {/*mobile, tablet*/}
            <div className='relative lg:hidden'>
                <p
                    onClick={() => { setInvisibleEvaluateBlock(false) }}
                    className=' text-[13px] md:text-[15px] lg:text-[15px] ml-3 text-green-500 hover:cursor-pointer '
                >
                    Tôi muốn đánh giá
                </p>

                {invisibleEvaluateBlock == false &&
                    <div
                        className='absolute z-10 w-[270px] h-[100px] 
                                rounded-[4px] boder bg-[#1A1C22] 
                                left-[12px] border-[1px] border-white border-opacity-[0.3]
                                flex flex-col justify-center items-center'
                    >
                        <div>
                            <FontAwesomeIcon
                                onClick={() =>{setInvisibleEvaluateBlock(true)}}
                                icon={faXmark} size='lg' className=' absolute top-0 right-0 text-green-500 p-[8px] hover:cursor-pointer'
                            />
                        </div>

                        <div className='ml-10 mr-10'>
                            <div className='flex'>
                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onClick={() => {
                                        setNumberStar(1)
                                        setInvisibleEvaluateBlock(true)
                                        handleDeleteRating(filmId)
                                        handleAddRating(filmId,1*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 1 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onClick={() => {
                                        setNumberStar(2)
                                        setInvisibleEvaluateBlock(true)
                                        handleDeleteRating(filmId)
                                        handleAddRating(filmId,2*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 2 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onClick={() => {
                                        setNumberStar(3)
                                        setInvisibleEvaluateBlock(true)
                                        handleDeleteRating(filmId)
                                        handleAddRating(filmId,3*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 3 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onClick={() => {
                                        setNumberStar(4)
                                        setInvisibleEvaluateBlock(true)
                                        handleDeleteRating(filmId)
                                        handleAddRating(filmId,4*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 4 ? 'text-green-500' : 'text-[#999999]'} transition-colors`}

                                    />
                                </div>

                                <div
                                    className=' hover:cursor-pointer p-1'
                                    onClick={() => {
                                        setNumberStar(5)
                                        setInvisibleEvaluateBlock(true)
                                        handleDeleteRating(filmId)
                                        handleAddRating(filmId,5*2)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} size='xl' className={` ${numberStar >= 5 ? 'text-green-500' : 'text-[#999999]'} `}

                                    />
                                </div>
                            </div>


                            <p className='mt-2 text-white text-[13px]'>{numberStar == 0 ? 'Nhấn chọn xếp hạng' : numberStar == 1 ?
                                '2.0 Phim chán'
                                :
                                numberStar == 2 ?
                                    '4.0 Hơi kém'
                                    :
                                    numberStar == 3 ?
                                        '6.0 Tạm được'
                                        :
                                        numberStar == 4 ?
                                            '8.0 Tốt'
                                            :
                                            '10.0 Hoàn hảo'}
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default IWantEvaluate