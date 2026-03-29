import './Video.css'
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlay, faChevronRight, faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function RecommendedFilm({ allFilms, recommendFilms, allFavoriteFilms, handleAddFavoriteFilm, handleDeleteFavoriteFilm }) {
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
        <div className=' mt-8'>
            <p className=' text-white text-[18px] lg:text-[24px] font-bold mb-4'>Đề xuất cho bạn</p>
            <div className='mb-11 w-[100%] relative px-12 lg:px-12'>
                <Swiper
                    className=' text-white !px-2'
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
                    {
                        allFilms.map((film) => (
                            recommendFilms.map((id, index) => {
                                if (id == film._id)
                                    return (
                                        <SwiperSlide key={index} >

                                            <div
                                                className='group text-white flex flex-col items-center justify-start my-3 hover:scale-[1.05] transition-all'>
                                                <div className='relative hover:cursor-pointer transition-all'>
                                                    <a href={`/video/${id}/1`}>

                                                        <img loading='lazy' className=' w-[100%] h-[200px] rounded-[7px] object-cover mb-2' src={film.image.poster} alt="Ảnh phim" />

                                                        {/* <div className='flex flex-col absolute top-0 right-0 bottom-0 left-0 items-center justify-center 
                                                bg-gradient-to-b from-transparent from-60% via-[black]/[.0] via-80% to-[black]/[1] to-100%
                                                group-hover:from-transparent group-hover:from-60% group-hover:via-[black]/[.6] group-hover:via-80% group-hover:to-[black]/[1] group-hover:to-100%
                                                '
                                                        >
                                                            <div className='hidden group-hover:flex hover:brightness-[1.1] bg-[#DC143C] rounded-[50%] w-9 h-9 items-center justify-center'>
                                                                <FontAwesomeIcon icon={faPlay} size='lg' className=' text-[#fff]' />
                                                            </div>

                                                        </div> */}
                                                    </a>

                                                    <div
                                                        className=' flex lg:hidden group-hover:flex absolute bottom-[15px] left-[10px] right-[10px] justify-between items-center'>
                                                        {/* <p>{currentFilm.episodes.length} tập</p> */}
                                                        <div
                                                            onClick={() => {
                                                                if (allFavoriteFilms.some((film) => film._id == id)) {
                                                                    handleDeleteFavoriteFilm(id)
                                                                }
                                                                else {
                                                                    handleAddFavoriteFilm(id)
                                                                }
                                                            }}
                                                            className='opacity-90 hover:opacity-100 bg-[white] rounded-[50%] w-8 h-8 flex items-center justify-center'>
                                                            <FontAwesomeIcon icon={faHeart} size='sm' className={` opacity-[0.5] ${allFavoriteFilms.some((film) => film._id == id) ? ' text-[red] opacity-[1]' : 'text-[black]'}`} />
                                                        </div>

                                                        {/* <div className='opacity-90 hover:opacity-100 bg-[white] rounded-[50%] w-8 h-8 flex items-center justify-center'>
                                                            <FontAwesomeIcon icon={faBookmark} size='sm' className=' text-[red]' />
                                                        </div> */}
                                                    </div>
                                                </div>

                                                <p className=' text-white text-[14px] expandText2Row mt-2'>{film.title}</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                            })
                        ))}
                </Swiper>

                {showPrevSlideBtn && <FontAwesomeIcon
                    onClick={handleSlidePrev}
                    icon={faChevronLeft}
                    className={`size-11 lg:size-9 text-[#B22222] z-10 absolute left-[0] top-[30%] lg:top-[35%] bottom-[50%] hover:cursor-pointer p-1`}
                />
                }
                {showNextSlideBtn && <FontAwesomeIcon
                    onClick={handleSlideNext}
                    icon={faChevronRight}
                    className={`size-11 lg:size-9 text-[#B22222] z-10 absolute right-[0] top-[30%] lg:top-[35%] bottom-[50%] hover:cursor-pointer p-1`}
                />
                }
            </div>
        </div>
    )
}

export default RecommendedFilm