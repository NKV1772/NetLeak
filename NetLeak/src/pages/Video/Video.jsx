import { jwtDecode } from "jwt-decode";
import './Video.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import video1 from '../../assets/video/video.mp4'
import m1 from '../../assets/movies/1.jpg'

import Navbar from '../../components/Navbar/Navbar'

import SelectEpisode from './SelectEpisode'
import ActorSlide from './ActorSlide'
import RecommendedFilm from './RecommendedFilm'
import FilmInfor from './FilmInfor'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faBookmark, faHeart, faL, } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from "../../context/AppContext";

const SELECT_EPISODE_WIDTH = '300px'
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjM3MTJiZGJjODRjNzZmYjkwMWI4OSIsImVtYWlsIjoidHJhbm5odXRwaGF0dHZAZ21haWwuY29tIiwiaWF0IjoxNzE0NTkzNTA2LCJleHAiOjE3MTQ2MTE1MDZ9.uFSw3TdJ4EJQ0eX2KCNxVhk_4N1l4xOKv5pTfi-7-s8'
// const userId = jwtDecode(token).id

const Video = () => {
    const {accessToken, setAccessToken} = useContext(AppContext)
    const token = localStorage.accessToken
    
    const userId = jwtDecode(token).id

    const { id, chapter } = useParams()

    const [invisibleBackToHeadPage, setInvisibleBackToHeadPage] = useState(true)

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingFilmInfo, setIsLoadingFilmInfo] = useState(true)
    const [isLoadingFilmVideo, setIsLoadingFilmVideo] = useState(true)
    const [isLoadingAllGenres, setIsLoadingAllGenres] = useState(true)
    const [isLoadingAllFilms, setIsLoadingAllFilms] = useState(true)
    const [isLoadingRecommendFilm, setIsLoadingRecommendFilm] = useState(true)
    const [isLoadingAllFavoriteFilm, setIsLoadingAllFavoriteFilm] = useState(false)
    const [isLoadingRankingFilm, setIsLoadingRankingFilm] = useState(false)
    const [isLoadingAllRatingFilm, setIsLoadingAllRatingFilm] = useState(false)

    //render 
    const videoContainer = useRef(null)
    const SelectEpisodeContainer = useRef(null)

    const video = useRef(null)

    const textHeaderSelectEpisode = useRef(null)

    const selectEpisode = useRef(null)

    //fetch
    const [filmInfo, setFilmInfo] = useState([])
    const [filmVideo, setFilmVideo] = useState([])
    const [allGenres, setAllGenres] = useState([])
    const [allFilms, setAllFilms] = useState([])
    const [allFavoriteFilms, setAllFavoriteFilms] = useState([])
    const [recommendFilms, setRecommendFilms] = useState([])
    const [ratingFilms, setRatingFilms] = useState([])
    const [allRatingFilms, setAllRatingFilms] = useState([])

    const getIdVideoYoutube = (url) => {
        return url.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/)[1]
    }

    const handleAddHistoty = () => {
        fetch('http://localhost:8081/v1/api/user/history', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: userId,
                filmId: id
            })
        })
    }

    useEffect(() => {
        setTimeout(() => {
            handleAddHistoty()
        }, 30000)
    }, [])

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

    const handleDeleteRating = (filmId) => {
        fetch(`http://localhost:8081/v1/api/user/rating`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: userId,
                filmId: filmId
            })
        })
            .then(() => {
                getAllRatingFilm()
            })
            .catch((e) => {
                console.log(e)
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

    const getRankingFilms = () => {
        setIsLoadingRankingFilm(true)
        fetch(`http://localhost:8081/v1/api/user/ranking`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false) {
                    data.splice(10, data.length - 10)
                    setRatingFilms(data)
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingRankingFilm(false)
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

    const getRecommendFilms = () => {
        setIsLoadingRecommendFilm(true)
        fetch(`http://localhost:8081/v1/api/user/recommendFavorite/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false)
                    setRecommendFilms(data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingRecommendFilm(false)
            })
    }

    const getAllFilms = () => {
        setIsLoadingAllFilms(true)
        fetch(`http://localhost:8081/v1/api/admin/films`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false) {
                    setAllFilms(data)
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingAllFilms(false)
            })
    }

    const getAllGenres = () => {
        setIsLoadingAllGenres(true)
        fetch(`http://localhost:8081/v1/api/admin/genres`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false)
                    setAllGenres(data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingAllGenres(false)
            })
    }

    const getFilmInfo = () => {
        setIsLoadingFilmInfo(true)
        fetch(`http://localhost:8081/v1/api/admin/films/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false)
                    setFilmInfo(data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingFilmInfo(false)
            })
    }

    const getFilmVideo = () => {
        setIsLoadingFilmVideo(true)
        fetch(`http://localhost:8081/v1/api/admin/videos/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false) {
                    data.forEach(videoList => {
                        videoList.videoLink = getIdVideoYoutube(videoList.videoLink)
                    });

                    setFilmVideo(data)
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingFilmVideo(false)
            })
    }

    useEffect(() => {
        getFilmInfo()
        getFilmVideo()
        getAllGenres()
        getAllFilms()
        getRecommendFilms()
        getAllFavoriteFilms()
        getRankingFilms()
        getAllRatingFilm()
    }, [])

    useEffect(() => {
        const handleIsLoanding = () => {
            if (isLoadingFilmInfo || isLoadingFilmInfo || isLoadingAllGenres
                || isLoadingAllFilms || isLoadingRecommendFilm || isLoadingAllFavoriteFilm
                || isLoadingRankingFilm || isLoadingAllRatingFilm) {
                setIsLoading(true)
            } else {
                setIsLoading(false)
            }
        }

        handleIsLoanding()
    }, [isLoadingFilmInfo, isLoadingFilmVideo, isLoadingAllGenres,
        isLoadingAllFilms, isLoadingRecommendFilm, isLoadingAllFavoriteFilm,
        isLoadingRankingFilm, isLoadingAllRatingFilm
    ])

    useEffect(() => {
        if (!isLoading && filmVideo.length != 1) {
            if (SelectEpisodeContainer.current != null) {
                let SelectEpisodeContainerTemp = SelectEpisodeContainer.current.clientWidth
                videoContainer.current.style.width = `calc(100% - ${SelectEpisodeContainerTemp}px)`
            }

            if (SelectEpisodeContainer.current != null)
                selectEpisode.current.style.height = `calc(100% - ${textHeaderSelectEpisode.current.clientHeight}px)`
        }
    }, [filmInfo, isLoading])
    //


    useEffect(() => {
        if (!isLoading) {
            const handleWindowScroll = () => {
                window.scrollY <= 700 ? setInvisibleBackToHeadPage(true) : setInvisibleBackToHeadPage(false)
            }

            window.addEventListener('scroll', handleWindowScroll)

            return () => {
                window.removeEventListener('scroll', handleWindowScroll)
            }

        }
    }, [isLoading])

    useEffect(() => {
        if (!isLoading && filmVideo.length != 1) {
            const handleWindowResize = () => {
                selectEpisode.current.style.height = `calc(100% - ${textHeaderSelectEpisode.current.clientHeight}px)`

                if (SelectEpisodeContainer.current != null)
                    SelectEpisodeContainer.current.style.height = `${videoContainer.current.clientHeight}px`

                if (SelectEpisodeContainer.current != null) {
                    let SelectEpisodeContainerTemp = SelectEpisodeContainer.current.clientWidth
                    videoContainer.current.style.width = `calc(100% - ${SelectEpisodeContainerTemp}px)`
                }
            }

            window.addEventListener('resize', handleWindowResize)

            if (filmVideo.length != 1) {

                video.current.addEventListener('load', (e) => {//loadeddata
                    // if (video.current.readyState >= 3) {
                    if (SelectEpisodeContainer.current != null)
                        SelectEpisodeContainer.current.style.height = `${videoContainer.current.clientHeight}px`
                    // }

                });
            }

            return () => {
                window.removeEventListener('resize', handleWindowResize)
            }
        }
    }, [isLoading])

    return (
        <>
            {
                isLoading == false ?
                    <div className='w-full flex flex-col items-center bg-[#111319] relative px-[15px] lg:px-16'>
                        <Navbar />

                        <div className={`flex justify-center max-h-[600px] w-full mt-24 items-start bg-[#1A1C22]`}>
                            <div ref={videoContainer} className=' w-full'>
                                <div className='w-full relative'>

                                    <iframe
                                        ref={video}
                                        className='w-full max-h-[556px] object-cover aspect-video'
                                        src={`https://www.youtube.com/embed/${filmVideo[chapter - 1].videoLink}?autoplay=1`}
                                        // frameborder="0"
                                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        // referrerpolicy="strict-origin-when-cross-origin"
                                        allowFullScreen={'allowfullscreen'}
                                        allow="autoplay"
                                    >
                                    </iframe>

                                </div>

                                <div className=' h-11 items-center mx-8 text-white/[.7] flex' >

                                    <div className='group flex items-center mr-5'
                                        onClick={() => {
                                            if (allFavoriteFilms.some((film) => film._id == id)) {
                                                handleDeleteFavoriteFilm(id)
                                            }
                                            else {
                                                handleAddFavoriteFilm(id)
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHeart} size="lg" className={`size-4 lg:size-5 group-hover:brightness-[1.5] group-hover:cursor-pointer group-hover:transition-all opacity-60 mr-3 ${allFavoriteFilms.some((film) => film._id == id) ? 'text-[red] brightness-[1.2]' : ''}`} />

                                        <p className={`text-[15px] lg:text-[15px] group-hover:brightness-[1.5] group-hover:cursor-pointer group-hover:transition-all ${allFavoriteFilms.some((film) => film._id == id) ? 'text-[red] brightness-[1.2]' : ''}`}>Yêu thích</p>
                                    </div>


                                    {/* <div className='group flex items-center'>
                                        <FontAwesomeIcon icon={faBookmark} size="lg" className='size-4 lg:size-5 group-hover:brightness-[1.2] group-hover:cursor-pointer group-hover:text-[red] hover:transition-all opacity-60 mr-3' />

                                        <p className='text-[15px] lg:text-[15px] group-hover:brightness-[1.2] group-hover:cursor-pointer group-hover:text-[red] hover:transition-all'>Lưu</p>
                                    </div> */}
                                </div>
                            </div>

                            {filmVideo.length != 1 &&
                                <div ref={SelectEpisodeContainer} className={`ml-3 text-white bg-[#1A1C22] w-[300px] h-full hidden lg:block`}>
                                    <div ref={textHeaderSelectEpisode}
                                        className=' text-start w-full 
                    inline-block text-xl font-bold capitalize p-4'
                                    >
                                        {filmInfo.title}
                                    </div>

                                    <SelectEpisode ref={selectEpisode}
                                        filmBanner={filmInfo.image.banner}
                                        videoList={filmVideo}
                                        filmName={filmInfo.title}
                                        currentEpisode={chapter}
                                        idFilm={id}
                                    />

                                </div>
                            }
                        </div>

                        <div className='lg:flex mt-6 w-full md:w-[92%] lg:w-full md:mx-4 lg:mx-0'>
                            <div className={`lg:mr-5 w-full lg:w-[calc(100%-300px)]`}>
                                <div className=' text-white text-start text-[20px] md:text-[25px] lg:text-[28px] font-bold capitalize'>{filmInfo.title} {'>'}
                                    <span className='text-white/[.7] text-start text-[20px] md:text-[25px] lg:text-[28px] font-bold'>   Tập {chapter}</span>
                                </div>

                                <FilmInfor
                                    filmInfor={filmInfo}
                                    allGenres={allGenres}
                                    episodeNumber={filmVideo.length}
                                    imdb={filmInfo.imdb}
                                    handleAddRating={handleAddRating}
                                    handleDeleteRating={handleDeleteRating}
                                    allRatingFilms={allRatingFilms}
                                    filmId={id}
                                />

                                <ActorSlide
                                    filmCast={filmInfo.cast}
                                />

                                {filmVideo.length != 1 &&
                                    <div className='lg:hidden mb-[20px] h-[400px]'>
                                        <SelectEpisode
                                            filmBanner={filmInfo.image.banner}
                                            videoList={filmVideo}
                                            filmName={filmInfo.title}
                                            currentEpisode={chapter}
                                            idFilm={id}
                                        />
                                    </div>
                                }

                                <div className=' w-full h-[1px] bg-white/[.2] hidden lg:block'></div>

                                <RecommendedFilm
                                    allFilms={allFilms}
                                    recommendFilms={recommendFilms}
                                    allFavoriteFilms={allFavoriteFilms}
                                    handleAddFavoriteFilm={handleAddFavoriteFilm}
                                    handleDeleteFavoriteFilm={handleDeleteFavoriteFilm}
                                    idFilm={id}
                                />

                            </div>

                            <div className='w-[100%] mb-5 lg:hidden'>
                                <p className=' ml-8 text-white text-[18px] lg:text-[24px] font-bold capitalize mb-4'>Bảng xếp hạng</p>

                                {ratingFilms.map((film, index) => (
                                    <a
                                        href={`/video/${film._id}/1`}
                                        key={index} className='hover:bg-[#24262B] hover:cursor-pointer rounded-[8px] transition-all'>
                                        <div className=' ml-8 pt-2 pb-2 '>
                                            <div className='flex '>
                                                <p className=' opacity-100 text-[#DC143C] font-bold'>{index + 1}</p>
                                                <p className=' text-white opacity-[0.80] text-[15px] ml-3 expandText1Row' >{film.title}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            {/* responsive PC */}
                            <div className={`w-[300px] mb-5 hidden lg:block`}>
                                <p className=' ml-8 text-white text-[24px] font-bold capitalize mb-4'>Bảng xếp hạng</p>

                                {ratingFilms.map((film, index) => (
                                    <a
                                        href={`/video/${film._id}/1`}
                                        key={index} className='group hover:bg-[#24262B] hover:cursor-pointer rounded-[8px] transition-all'>
                                        <div className=' ml-8 pt-2 pb-2 '>
                                            <div className='flex '>
                                                <p className=' opacity-100 text-[#DC143C] font-bold'>{index + 1}</p>
                                                <p className=' text-white opacity-[0.80] text-[15px] ml-3 expandText1Row' >{film.title}</p>
                                            </div>

                                            <img className='hidden group-hover:block rounded-[8px] w-[25%] ml-5 mt-2' src={film.image.poster} alt="Ảnh phim" />
                                        </div>
                                    </a>
                                ))}
                            </div>

                        </div>

                        <div className=' w-full h-[1px] bg-white/[.2]'></div>


                        {invisibleBackToHeadPage == false &&
                            <div
                                onClick={() => {
                                    window.scroll({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth'
                                    });
                                }}
                                className='hover:cursor-pointer hover:brightness-[1.25] transition-all justify-center items-center 
                    fixed bottom-[100px] right-[100px] bg-[#24262B] 
                    rounded-[50%] w-[50px] h-[50px] hidden lg:flex z-10'>
                                <FontAwesomeIcon icon={faAngleUp} size='xl' className=' text-[#FF4500]' />
                            </div>
                        }
                    </div>
                    :
                    <div className="bg-[#696969] flex flex-col flex-1">

                    </div>
            }
        </>
    );
}

export default Video;