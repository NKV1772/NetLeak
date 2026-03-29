import React, { useState, useEffect, useContext } from 'react';
import thumb_pic from '../../../assets/images/thumbnail.jpg'
import './film.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus,faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Rating from './rating';
import clsx from 'clsx';
import IWantEvaluate from '../../Video/IWantEvaluate';
import { jwtDecode } from 'jwt-decode';

import { AppContext } from '../../../context/AppContext';


const Film = ({ film }) => {
    const {accessToken}= useContext(AppContext)
    const navigate = useNavigate()

    const token= accessToken

const userId = jwtDecode(token).id

    const [allRatingFilms, setAllRatingFilms] = useState([])
    const [allFavoriteFilms, setAllFavoriteFilms] = useState([])
    
    const [isRating, setIsRating] = useState(false)
    const handleAddRating = (filmId, rate) => {
        fetch(`http://localhost:8081/v1/api/user/rating`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                emailId: userId,
                filmId: filmId,
                rate: rate
            })
        })
            .then(() => {
                getAllRatingFilm()
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleDeleteRating = (film) => {
        fetch(`http://localhost:8081/v1/api/user/rating`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: userId,
                filmId: film._id
            })
        })
            .then(() => {
                getAllRatingFilm()
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getAllFavoriteFilms = () => {
        // setIsLoadingAllFavoriteFilm(true)
        fetch(`http://localhost:8081/v1/api/user/favorite/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false)
                    setAllFavoriteFilms(data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                // setIsLoadingAllFavoriteFilm(false)
            })
    }
   

    const getAllRatingFilm = () => {
        // setIsLoadingAllRatingFilm(true)
        fetch(`http://localhost:8081/v1/api/user/ratings`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllRatingFilms(data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                // setIsLoadingAllRatingFilm(false)
            })
    }
    const handleAddFavoriteFilm = (filmId) => {
        fetch(`http://localhost:8081/v1/api/user/favorite`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                filmId: filmId,
                userId: userId
            })
        })
            .then(() => {
                getAllFavoriteFilms()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const handleDeleteFavoriteFilm = (filmId) => {
        fetch(`http://localhost:8081/v1/api/user/favorite`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                filmId: filmId,
                userId: userId
            })
        })
            .then(() => {
                getAllFavoriteFilms()
            })
            .catch((e) => {
                console.log(e)
            })
    }
    
    
    useEffect(() => {
        // getFilmInfo()
        // getFilmVideo()
        // getAllGenres()
        // getAllFilms()
      
        getAllFavoriteFilms()
        // getRankingFilms()
        getAllRatingFilm()
    }, [])

    return (
        <div className='w-full h-auto relative flex flex-col-reverse justify-between xl:flex-row mt-20 '>
            <div className='movie-detail w-full xl:w-1/2 pl-10 pr-5 pt-0 lg:pt-8 absolute'>
                <p className='font-black text-white text-4xl mb-2 '>{film.title}</p>
                <ul className='flex flex-row items-center mb-12 rating-container'>
                    <li className='text-white font-medium'>{film.released.substring(0, 4)}</li>
                    <li className='ml-3 mr-3 text-white'>|</li>
                    <li className='text-green-500 font-medium rating'>
                        {film.imdb.rating == null ? "10" : film.imdb.rating.toFixed(1)}
                        <FontAwesomeIcon icon={faStar} className='ml-1 text-green-500' />
                    </li>
                    <div className='w-[150px] relative ml-3'>
                       <IWantEvaluate  handleAddRating={handleAddRating}
                    handleDeleteRating={handleDeleteRating}
                    allRatingFilms={allRatingFilms}
                    filmId={film._id}/>
                    </div>
                </ul>
                <div className='flex flex-row flex-wrap gap-3 mb-5 movie-tag'>
                    {film.genres.map((value, index) =>
                        <div className='text-white font-medium bg-gray-700 p-1 pl-3 pr-3 cursor-pointer rounded-md capitalize' key={index}>
                            {value?.title}
                        </div>
                    )}
                </div>
                <p className='w-full xl:w-4/5 text-white mb-10 font-normal'>
                    {film.fullplot}
                </p>
                <div className='access mb-12'>
                    <button className='play' onClick={() => navigate(`/video/${film._id}/1`)}>
                        <FontAwesomeIcon icon={faPlay} className='icon' />
                        <p>Phát</p>
                    </button>
                    
                        {/* <FontAwesomeIcon icon={faHeart} className='text-[20px] text-red-500 group-hover:text-white' />
                        <p>Yêu thích </p> */}
                   
                    <button className='playlist group'
                    
                                        onClick={() => {
                                            if (allFavoriteFilms.some((favorfilm) => favorfilm._id == film._id)) {
                                                handleDeleteFavoriteFilm(film._id)
                                            }
                                            else {
                                                handleAddFavoriteFilm(film._id)
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHeart}  className={`size-[20px] lg:size-5 group-hover:brightness-[1.5] group-hover:cursor-pointer group-hover:transition-all opacity-60 mr-3 ${allFavoriteFilms.some((favorfilm) => favorfilm._id == film._id) ? 'text-[red] brightness-[1.2]' : ''}`} />

                                        <p >Yêu thích</p>
                                    </button>
                </div>
            </div>

            <div className='movie-detail h-auto w-full lg:w-1/2 pl-10 pr-5 pt-8 border border-red-500 invisible'>
                <p className='font-black text-white text-4xl '>{film.title}</p>
                <ul className='flex flex-row items-center rating-container'>
                    <li className='text-white font-medium'>{film.released.substring(0, 4)}</li>
                    <li className='ml-3 mr-3 text-white'>|</li>
                    <li className='text-green-500 font-medium rating'>
                        {film.imdb.rating == null ? "10" : film.imdb.rating.toFixed(1)}
                        <FontAwesomeIcon icon={faStar} color='red' className='ml-1 text-green-500' />
                    </li>
                    <div className='w-[150px] relative ml-3'>
                        <button
                            onClick={() => setIsRating(!isRating)}
                            className='h-full w-auto border px-2 py-1 rounded-md hover:bg-white duration-150 group'
                        // className={clsx({
                        //     'h-full w-auto border px-2 py-1 rounded-md hover:bg-white duration-150 group': isRating,
                        //     'h-full w-auto border px-2 py-1 rounded-md hover:bg-white duration-150 group': !isRating
                        // })}
                        >
                            {isRating ? (
                                <p className='text-red-600 font-bold duration-150'>Xác nhận</p>
                            ) : (
                                <p className='group-hover:text-[#3e3e3e] font-bold duration-150'>Đánh giá</p>
                            )}
                        </button>
                        {isRating && (
                            <Rating />
                        )}
                    </div>
                </ul>
                <div className='flex flex-row flex-wrap gap-3 mb-5 movie-tag'>
                    {film.genres.map((value, index) =>
                        <div className='text-white font-medium bg-gray-700 p-1 pl-3 pr-3 cursor-pointer rounded-md capitalize' key={index}>
                            {value?.title}
                        </div>
                    )}
                </div>
                <p className='w-3/4 text-white font-normal'>
                    {film.fullplot}
                </p>
                <div className='access mb-12'>
                    <button className='play' onClick={() => navigate(`/video/${film._id}/1`)}>
                        <FontAwesomeIcon icon={faPlay} className='icon' />
                        <p>Phát</p>
                    </button>
                    <button className='playlist'>
                        <FontAwesomeIcon icon={faHeart} className=' text-red-500'  />
                        <p >Yêu thích</p>
                    </button>
                </div>
            </div>

            <div className='w-full flex justify-start items-end lg:items-center xl:items-end flex-col right-0 z-0'>
                <div className='w-full lg:w-4/5 flex flex-col relative '>
                    <div className='image-overlay1'></div>
                    <div className='image-overlay2'></div>
                    <div className='image-overlay3'></div>
                    <div className='image-overlay4 xl:hidden'></div>
                    <img
                        src={film.image.banner}
                        className='w-full brightness-90'
                    />
                </div>
            </div>
        </div>
    );
}

export default Film;