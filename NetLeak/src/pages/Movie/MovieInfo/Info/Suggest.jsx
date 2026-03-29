import React from "react";
import "./info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Suggest = ({ data, setInfo }) => {
    const navigate= useNavigate()
    const handleIn4= (movie)=>{
        scrollTo(0,0)
        setInfo(1)
        navigate(`/movie/${movie._id}`)
    }
  return (
    <div className="info-container">
      <ul className="w-[90%] h-full grid-cols-2 grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 suggest-container">
        {data.map((movie, index) => {

            return (
              <li key={index} onClick={()=>handleIn4(movie)} className="hover:scale-105 duration-200 group">
                <img src={movie.image.poster} alt="movie" className="h-[300px] rounded-lg"/>
                <div className="suggest-movie-content">
                  
                  <p className="truncate text-lg font-bold group-hover:text-green-500 duration-200">
                    {movie.title}
                  </p>
                </div>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default Suggest;
