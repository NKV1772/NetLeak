import './movie.css'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import Navbar from '../../components/Navbar/Navbar';
import Film from './Film/Film';
import MovieInfo from './MovieInfo/MovieInfo';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Movie = () => {

    const [info, setInfo] = useState(1)

    const params = useParams()

    const [film, setFilm] = useState()
    useEffect(() => {
        const fetchMovie = () => {
            axios.get("http://localhost:8081/v1/api/admin/films/" + params.id)
                .then((res) => {
                    setFilm(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchMovie()
    }, [params.id])

    console.log(film)

    return (
        <div className='movie-container pb-10'>
            <Navbar />
            {film && (
                <Film
                    film={film}
                />
            )}
            <ul className="w-[90%] h-full flex flex-row z-10 pb-[10px] mb-[20px] border-b border-[#808080] gap-5 md:gap-10">
                <li
                    onClick={() => { setInfo(1) }}
                    className={clsx({
                        " font-bold text-lg cursor-pointer text-white": info == 1,
                        " font-bold text-lg cursor-pointer text-[#7c7c7c]": info !== 1
                    })}
                >Danh sách tập</li>
                <li
                    onClick={() => { setInfo(2) }}
                    className={clsx({
                        " font-bold text-lg cursor-pointer text-white": info == 2,
                        " font-bold text-lg cursor-pointer text-[#7c7c7c]": info !== 2
                    })}
                >Diễn viên</li>
                <li
                    onClick={() => { setInfo(3) }}
                    className={clsx({
                        " font-bold text-lg cursor-pointer text-white": info == 3,
                        " font-bold text-lg cursor-pointer text-[#7c7c7c]": info !== 3
                    })}
                >Đội ngũ</li>
                <li
                    onClick={() => { setInfo(4) }}
                    className={clsx({
                        " font-bold text-lg cursor-pointer text-white": info == 4,
                        " font-bold text-lg cursor-pointer text-[#7c7c7c]": info !== 4
                    })}
                >Đề xuất</li>
            </ul>
            {film && (

                <MovieInfo
                    setInfo={setInfo}
                    info={info}
                    film={film}
                />
            )}
        </div>
    );
}
export default Movie;