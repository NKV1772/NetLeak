import { useContext, useEffect, useState } from "react";
import SearchTag from "../../components/Search/MovieSearch/SearchTag";
import SearchSelect from "../../components/Search/MovieSearch/SearchSelect";
import ImageTag from "../../components/Table/MovieTable/ImageTag";
import { UserContext } from '../../context/user/userContext'
import { genreContext } from "../../context/genre/genreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

const AddVideo = () => {

    const navigate = useNavigate()
    const { movies, fetchMovie } = useContext(UserContext)

    const [isSelectFilm, setIsSelectFilm] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [isMovie, setIsMovie] = useState(false)

    const [movieSearch, setMovieSearch] = useState('')
    const [episodeInputText, setEpisodeInputText] = useState('')
    const [videoLink, setVideoLink] = useState('')

    const [movieFilm, setMovieFilm] = useState('')

    const handleSubmit = () => {
        if (videoLink == '') {
            alert('Vui lòng nhập link video')
            return;
        }

        setIsLoading(true)

        const formData = new FormData();
        formData.append("filmId", movieFilm)
        formData.append("videoLink", videoLink)
        formData.append("chapter", episodeInputText==''?0:episodeInputText)

        axios.post(
            'http://localhost:8081/v1/api/admin/videos'
            ,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
                ,
            }
        )
            .then(() => {
                toast.success('Thêm video thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate('/phim')
                }, 2000)
            })
            .catch((err) => {
                alert(err)
                // setIsLoading(false)
            })
            .finally(async () => {
                await fetchMovie()
                setIsLoading(false)
            })
    }

    useEffect(() => {
        movies.forEach(movie => {
            if (movie._id == movieFilm) {
                if (movie.type == 'movie') {
                    setIsMovie(true)
                }
                else
                setIsMovie(false)
            }
        });
    }, [movieFilm])

    return (
        <>
            {isLoading == false ?
                <div className="w-full h-auto flex flex-col items-center justify-center gap-5 px-5 pb-5 ">
                    <div className="w-full h-full bg-slate-300 rounded-xl flex flex-col items-center py-10 gap-5">

                        <div className="w-3/4 flex flex-row items-center justify-center">
                            <div className='w-full relative'>
                                <div className='relative w-full flex items-center group'>
                                    <input
                                        value={movieSearch}
                                        onFocus={() => setIsSelectFilm(true)}
                                        onChange={(e) => { setMovieSearch(e.target.value) }}
                                        type='text'
                                        placeholder='Tìm kiếm phim...'
                                        className="w-full h-[50px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                                    />
                                    <i className="absolute right-2 fa-solid fa-star"></i>
                                </div>
                                {isSelectFilm && (
                                    <div className='absolute w-full h-[350px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 z-10 overflow-y-scroll'>
                                        {movies.map((movie, index) => {
                                            if (
                                                (movie.title.toLowerCase().includes(movieSearch.toLowerCase().trim()) ||
                                                    movieSearch == '')
                                            ) {
                                                return (
                                                    <div key={index} onClick={() => {
                                                        setMovieSearch('')
                                                        setIsSelectFilm(false)
                                                        setMovieFilm(movie._id)
                                                    }}>
                                                        <SearchSelect image={movie.image.poster} content={movie.title} />
                                                    </div>
                                                )
                                            }
                                        })
                                        }

                                        <div className=" absolute top-0 right-[10px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
                                            onClick={() => {
                                                setIsSelectFilm(false)
                                                setMovieSearch('')
                                            }}
                                        >
                                            <p className="text-[red] font-bold text-[25px]">X</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-3/4 flex flex-row flex-wrap gap-2 mb-[30px] justify-center">
                            {
                                movies.map((movie, index) => {
                                    if (movie._id == movieFilm)
                                        return (
                                            <div className='hover:cursor-pointer' key={index} onClick={() => {
                                                setMovieFilm('')
                                            }}
                                            >
                                                <ImageTag image={movie.image.poster} content={movie.title} />
                                            </div>
                                        )
                                })
                            }
                        </div>

                        {!isMovie &&
                            <input
                                value={episodeInputText}
                                type='text'
                                placeholder='Nhập chỉ số tập '
                                className="w-3/4 h-[50px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                                onChange={(e) => setEpisodeInputText(e.target.value)}
                            />
                        }

                        <input
                            value={videoLink}
                            type='text'
                            placeholder='Thêm video link'
                            className="w-3/4 h-[50px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                            onChange={(e) => setVideoLink(e.target.value)}
                        />

                        <button onClick={handleSubmit} className="border border-[#3e3e3e] h-[50px] px-5 flex items-center justify-center rounded-xl group hover:bg-[#3e3e3e]">
                            <p className="font-bold text-xl group-hover:text-white">Thêm</p>
                        </button>
                    </div>
                    <ToastContainer />

                </div>
                :
                <BeatLoader
                    className=" flex justify-center"
                    color={"#36d7b7"}
                    size={30}
                // aria-label="Loading Spinner"
                // data-testid="loader"
                />
            }
        </>
    );
}

export default AddVideo;