import React, { useEffect, useRef, useState } from "react";
import "./TabPageSlide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useBeforeUnload } from "react-router-dom";
import m1 from "../../assets/movies/1.jpg";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Navigation } from "swiper/modules";




export default function TabPageSlide({ genre, title, setGenre, setSelectedGenre }) {
  const [width, setWidth] = useState(window.innerWidth);

  const Movies = genre.movies;
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

  const linkStyle = {
    textDecoration: "none",
  };
  const handleGenre = () => {
    scrollTo(0, 0)
    setSelectedGenre(genre._id)
    setGenre(genre)
  }
  return (
    <div className="slide-container">
      <p
        className=" Genre-title font-bold text-white text-l mb-2 ml-2 hover:text-green-500 cursor-pointer display: inline-block border-b-4 border-[#de6262] capitalize "
        onClick={handleGenre}
      >
        {title}
      </p>

      <Swiper
        slidesPerView={width / 260}
        spaceBetween={30}
        freeMode={true}
        modules={[Navigation, Pagination, FreeMode]}

        navigation={true}
      >
        {
          Movies.map((movie, index) => {
            if (index < 10)
              return (
                <SwiperSlide key={movie._id + genre._id}>
                  <Link
                    to={`/movie/${movie._id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="cursor-pointer"
                  >
                    <img src={movie.image.poster} alt="movie" />
                    <p className="film-name text-center pt-2 line-clamp-2">{movie.title}</p>
                  </Link>
                </SwiperSlide>
              )

          })
        }


      </Swiper>
    </div>
  );
}
