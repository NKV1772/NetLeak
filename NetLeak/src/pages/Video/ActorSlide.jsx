import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function ActorSlide({ filmCast }) {
    const [swiperElement, setSwiperElement] = useState(null)

    const [showNextSlideBtn, setShowNextSlideBtn] = useState(null)
    const [showPrevSlideBtn, setShowPrevSlideBtn] = useState(null)

    useEffect(() => {
        if (swiperElement) {
            setShowNextSlideBtn(!swiperElement.isEnd)
            setShowPrevSlideBtn(!swiperElement.isBeginning)
        }
    }, [swiperElement])

    useEffect(() => {
        const handleWindowResize = () => {
            swiperElement.slideTo(0)
            setShowNextSlideBtn(!swiperElement.isEnd)
            setShowPrevSlideBtn(!swiperElement.isBeginning)
        }

        if (swiperElement) {
            window.addEventListener('resize', handleWindowResize)
        }

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [swiperElement])

    const handleSlideNext = () => {
        swiperElement.slideNext()

        if (swiperElement.isEnd)
            setShowNextSlideBtn(false)

        if (!swiperElement.isBeginning)
            setShowPrevSlideBtn(true)
    }

    const handleSlidePrev = () => {
        swiperElement.slidePrev()

        if (swiperElement.isBeginning)
            setShowPrevSlideBtn(false)

        if (!swiperElement.isEnd)
            setShowNextSlideBtn(true)
    }

    return (
        <div className='mt-5'>
            <p className=' text-white text-[17px] lg:text-[24px] font-bold'>Các diễn viên tham gia:</p>

            <div className=' mt-4 mb-11 w-[95%] relative px-10 md:px-11 lg:px-11'>
                <Swiper
                    className=' text-white h-full !px-1'
                    spaceBetween={10}
                    slidesPerView={3}
                    slidesPerGroup={3}
                    onInit={(ev) => {
                        setSwiperElement(ev)
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                            slidesPerGroup: 5,
                        },
                    }}
                >
                    {filmCast.map((cast, index) => (
                        <SwiperSlide key={index} className=' text-white '>
                            <div className='group hover:cursor-pointer hover:scale-[1.09] mt-2 mb-2 transition-transform flex flex-col items-center justify-start  '>
                                <img loading='lazy' className='  w-32 h-32 rounded-[50%] object-cover mb-2' src={cast.avatar} alt="Ảnh diễn viên" />

                                <p className=' text-white text-[14px] expandText1Row'>{cast.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {showPrevSlideBtn && <FontAwesomeIcon
                    onClick={handleSlidePrev}
                    icon={faChevronLeft}
                    className={` size-11 lg:size-9 text- z-10 absolute left-[0] top-[25%] lg:top-[30%] bottom-[50%] hover:cursor-pointer p-1 text-[#B22222]`}//25

                />
                }
                {showNextSlideBtn && <FontAwesomeIcon
                    onClick={handleSlideNext}
                    icon={faChevronRight}
                    className={` size-11 lg:size-9 text- z-10 absolute right-[0] top-[25%] lg:top-[30%] bottom-[50%] hover:cursor-pointer p-1 text-[#B22222]`}

                />
                }
            </div>
        </div>
    )
}

export default ActorSlide