import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import m1 from '../../assets/movies/1.jpg'
import m2 from '../../assets/movies/2.jpg'
import m3 from '../../assets/movies/3.jpg'
import m4 from '../../assets/movies/4.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import HoverSlide from './HoverSlide/HoverSlide';
import PrevButton from './PrevButton,';

const Slide = ({ title, movies }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth / 260)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth / 260);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const linkStyle = {
        textDecoration: "none",
    };

    return (
        <div className='w-full px-5 mb-5'>
            <p className='text-xl mb-3 font-bold'>{title}</p>
            <Swiper
                slidesPerView={windowWidth}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
                freeMode={true}
                modules={[FreeMode, EffectFade, Autoplay, Navigation, Pagination]}
                className='relative px-1'
            >
                {movies.map((value, index) =>
                    <SwiperSlide key={index}>
                        <Link to={`/movie/${value._id}`}>
                            <img
                                src={value.image.poster}
                                alt='movie'
                                className='w-full h-[300px] rounded-xl hover:brightness-110 duration-200'
                            />
                            <p className='text-center w-full truncate text-lg pt-3'>{value.title}</p>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default Slide;
