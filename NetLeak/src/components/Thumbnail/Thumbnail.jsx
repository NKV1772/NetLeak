import './thumbnail.css'
import React, { useEffect, useState } from 'react'

import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import ThumbnailContent from './thumbnailContent'


const Thumbnail = () => {
    const [topMovies, setTopMovies] = useState([]);


    const TopMovies = ["662fa2a8db4524f20df792c5", "662f837cd772d69dd48aeac2", "6630a66c1a3d60de19e9d1a7", "662f8b764a2e36c1894656e6", "6630a28e1a3d60de19e9d110"]
    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const promises = TopMovies.map((movieID) => {
                    return axios.get(`http://localhost:8081/v1/api/admin/films/${movieID}`);
                });

                const responses = await Promise.all(promises);

                // Lấy dữ liệu từ tất cả các phản hồi và cập nhật state movies
                const movieData = responses.map((response) => response.data);
                setTopMovies(movieData);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        fetchMovieDetail();
    }, []);

    console.log(topMovies)

    return (
        <div className='md:block hidden' >
            <Swiper

                effect={'fade'}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                }}
                loop={true}
                modules={[EffectFade, Autoplay, Navigation, Pagination]}
                className='w-full h-screen relative md:block hidden mb-10'
                onSlideChangeTransitionStart={(swiper) => {
                    const slides = swiper.slides;
                    slides.forEach((slide) => {
                        if (slide !== swiper.slides[swiper.realIndex]) {
                            slide.style.opacity = 0;
                        } else {
                            slide.style.opacity = 1;
                        }
                    });
                }}
            >
                {topMovies.map((value, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ThumbnailContent
                                data={value}
                                index={index + 1}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default Thumbnail;