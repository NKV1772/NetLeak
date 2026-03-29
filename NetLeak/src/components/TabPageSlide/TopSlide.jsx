import React, { useEffect, useState } from "react";
import "./TopSlide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import m1 from "../../assets/movies/1.jpg";
import n1 from "../../assets/NumberRanking/1.png";
import n2 from "../../assets/NumberRanking/2.png";

import n3 from "../../assets/NumberRanking/3.png";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

export default function TopSlide({ topMovies }) {
  const [width, setWidth] = useState(window.innerWidth);

  const TopMovies = [
    "662f8e8a4a2e36c18946572b",
    "662f837cd772d69dd48aeac2",
    "6630a66c1a3d60de19e9d1a7",
    "662f8b764a2e36c1894656e6",
    "6630a4031a3d60de19e9d159",
  ];
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup để tránh leak memory
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(topMovies);

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <div className="slide-container">
      <p className="topslide-title">Thịnh hành</p>

      {topMovies == [] ? (
        <div> Loading</div>
      ) : (
        // console.log(topMovies)
        <Swiper
          slidesPerView={width / 300}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {topMovies.map((movie, index) => {
            let img = null;
            let opacity = true;
            if (index == 0) {
              img = n1;
            } else if (index == 1) {
              img = n2;
            } else if (index == 2) {
              img = n3;
            } else {
              opacity = false;
            }
            return (
              <React.Fragment key={movie._id+'top'}>
                {opacity && (
                  <SwiperSlide className="swiper-Slide">
                    <img src={img} className="number"></img>
                  </SwiperSlide>
                )}
                <SwiperSlide className="swiper-Slide">
                  <Link
                   to={`/movie/${movie._id}`}
                    style={linkStyle}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <img src={movie.image.poster} alt="movie" />
                  </Link>
                  <p className="film-name pt-2 line-clamp-2 cursor-pointer">{movie.title}</p>
                </SwiperSlide>
              </React.Fragment>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
