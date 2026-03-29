/* eslint-disable react/prop-types */
import movie from '../../../assets/movie.jpg'
import GenreTag from "./GenreTag";
import ImageTag from "./ImageTag";
import SearchTag from '../../Search/MovieSearch/SearchTag';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user/userContext";
import { genreContext } from '../../../context/genre/genreContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BeatLoader from "react-spinners/BeatLoader";

const TableMovie = ({ index, id, image, title, type, releaseDate, lastUpdateDate, genresFilm, castFilm, directorsFilm }) => {
    const { casts, directors, fetchMovie } = useContext(UserContext)
    const { genres } = useContext(genreContext)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const formatDate = (date) => {
        const originalDate = new Date(date);

        const day = originalDate.getDate().toString().padStart(2, '0');
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const year = originalDate.getFullYear();

        return `${day}/${month}/${year}`;
    }
    releaseDate = formatDate(releaseDate)
    lastUpdateDate = formatDate(lastUpdateDate)

    const handleDelete = (id) => {
        setIsLoading(true)

        fetch(`http://localhost:8081/v1/api/admin/films?id=${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                toast.success('Xóa phim thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

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

    return (
        <>
            {
                isLoading == false ?
                    <div className="flex flex-row items-center border-b border-[#0A3379] ">
                        <p className="w-1/12 text-center font-bold text-2xl">{index + 1}</p>
                        <div className="w-10/12 border-x border-[#0A3379] p-2 flex flex-row gap-5">
                            <div className="w-1/4 ">
                                <img
                                    src={image.poster}
                                    className="w-full rounded-lg"
                                />
                            </div>
                            <div className="w-3/4 flex flex-col gap-1">
                                <div className="flex flex-row items-center">
                                    <p className="w-1/5">Tên phim:</p>
                                    <p className="font-bold capitalize">{title}</p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="w-1/5">Dòng phim:</p>
                                    <p className='capitalize'>{type == 'series' ? 'Phim bộ' : type == 'movie' ? 'Phim tập' : ''}</p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="w-1/5">Ngày ra mắt:</p>
                                    <p>{releaseDate}</p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="w-1/5">Cập nhật:</p>
                                    <p>{lastUpdateDate}</p>
                                </div>

                                <div className="flex flex-row items-center">
                                    <p className="w-1/5">Thể loại:</p>
                                    <div className="flex flex-row gap-1 flex-wrap">
                                        {/* {genreData.length!=0 && genreData.map((item, index)=> {
                            return <GenreTag key={index} title={item.title}/>
                        })} */}

                                        {/* {
                                            genres.map((genre, index) => {
                                                if (genresFilm.some(id => id == genre._id))
                                                    return (
                                                        <div key={index} >
                                                            <SearchTag content={genre.title} />
                                                        </div>
                                                    )
                                            })
                                        } */}

                                        {genresFilm.map(genre => {
                                            return (
                                                <div key={index} >
                                                    <SearchTag content={genre.title} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <p className="w-1/5 mb-1">Diễn viên:</p>
                                    <div className="flex flex-row gap-2 flex-wrap">
                                        {
                                            casts.map((cast, index) => {
                                                if (castFilm.some(id => id == cast._id))
                                                    return (
                                                        <div key={index} >
                                                            <ImageTag image={cast.avatar} content={cast.name} />
                                                        </div>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col mb-3">
                                    <p className="w-1/5 mb-1">Đội ngũ:</p>
                                    <div className="flex flex-row gap-2 flex-wrap">
                                        {/* {
                                            directors.map((director, index) => {
                                                if (directorsFilm.some(id => id == director._id))
                                                    return (
                                                        <div key={index}
                                                        >
                                                            <ImageTag image={director.avatar} content={director.name} />
                                                        </div>
                                                    )
                                            })
                                        } */}

                                        {directorsFilm.map(director => {
                                             return (
                                                <div key={index}
                                                >
                                                    <ImageTag image={director.avatar} content={director.name} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-full w-1/12 flex items-center flex-col justify-between'>
                            <Link
                                to={`/danh-sach-tap/${id}`}
                                className="mb-[40px] w-[50px] h-[50px] cursor-pointer flex items-center justify-center rounded-full hover:bg-[#0A3379] duration-150 east-out group">
                                <i class="fa-solid fa-bars text-2xl  text-[#0A3379] group-hover:text-white duration-150 east-out"></i>
                            </Link>

                            <Link
                                to={`/chi-tiet/${id}`}
                                className="w-[50px] h-[50px] cursor-pointer flex items-center justify-center rounded-full hover:bg-[#0A3379] duration-150 east-out group"
                            >
                                <i className="fa-solid fa-gear text-2xl  text-[#0A3379] group-hover:text-white duration-150 east-out"></i>
                            </Link>

                            <button
                                onClick={() => { setShowConfirmation(true) }}
                                className="mt-[40px] w-[50px] h-[50px] cursor-pointer flex items-center justify-center rounded-full hover:bg-[#0A3379] duration-150 east-out group">
                                <i class="fa-solid fa-trash text-2xl  text-[#0A3379] group-hover:text-white duration-150 east-out"></i>
                            </button>

                        </div>

                        <ToastContainer />
                        {showConfirmation && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-5 rounded shadow-lg">
                                    <p>Bạn có chắc chắn muốn xóa không?</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={() => setShowConfirmation(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(id)
                                                setShowConfirmation(false)

                                            }}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    :
                    <div className='flex justify-center'>
                        <BeatLoader color="#36d7b7" />
                    </div>
            }
        </>
    );
}

export default TableMovie;