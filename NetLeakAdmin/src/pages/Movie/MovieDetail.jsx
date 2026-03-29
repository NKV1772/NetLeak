import { useContext, useEffect, useRef, useState } from "react";
import SearchTag from "../../components/Search/MovieSearch/SearchTag";
import SearchSelect from "../../components/Search/MovieSearch/SearchSelect";
import ImageTag from "../../components/Table/MovieTable/ImageTag";
import { genreContext } from '../../context/genre/genreContext'
import { useNavigate, useSubmit, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { UserContext } from "../../context/user/userContext";

const MovieDetail = () => {
    const { id } = useParams()
    const { movies } = useContext(UserContext)

    const SelectTypeFilmElement = useRef(null)

    const navigate = useNavigate()
    const { casts, directors, fetchMovie } = useContext(UserContext)
    const { genres } = useContext(genreContext)

    const [isSelectStar, setIsSelectStar] = useState(false)
    const [isSelectDirect, setIsSelectDirect] = useState(false)
    const [isSelectGenre, setIsSelectGenre] = useState(false)

    const [images, setImages] = useState([]);
    const [allImages, setAllImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [actorSearch, setActorSearch] = useState('')
    const [directorSearch, setDirectorSearch] = useState('')
    const [genreSearch, setGenreSearch] = useState('')

    const [filmName, setFilmName] = useState('')
    const [fullplot, setFullplot] = useState('')
    const [filmType, setFilmType] = useState('')
    const [genresFilm, setGenresFilm] = useState([])
    const [castsFilm, setCastsFilm] = useState([])
    const [directorsFilm, setDirectorsFilm] = useState([])
    const [released, setReleased] = useState('')

    useEffect(() => {
        const getDetailFilm = () => {
            movies.forEach((movie) => {
                if (movie._id == id) {

                    if (movie.image.img && movie.image.poster && movie.image.banner) {
                        setAllImages([movie.image.poster, movie.image.banner])
                    }

                    setFilmName(movie.title)
                    setFullplot(movie.fullplot)
                    const genresTemp = movie.genres.map(genre => {
                        return genre._id
                    })
                    // setGenresFilm(movie.genres)
                    setGenresFilm(genresTemp)

                    if (movie.type) {
                        SelectTypeFilmElement.current.value = movie.type
                        setFilmType(movie.type)
                    }
                    else {
                        SelectTypeFilmElement.current.value = ""
                    }

                    const casts = movie.cast
                    casts.forEach((cast) => {
                        setCastsFilm(prev => [...prev, cast._id])
                    })

                    setDirectorsFilm(movie.directors)

                    const directorsTemp = movie.directors.map(director => {
                        return director._id
                    })
                    setDirectorsFilm(directorsTemp)

                    const date = new Date(movie.released)
                    setReleased([date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate(), date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1, date.getFullYear() < 10 ? '0' + date.getFullYear().toString() : date.getFullYear()].join('-'))
                }
            })
        }

        getDetailFilm()
    }, [])


    const submitImage = (e) => {
        if (images.length != 2 && images.length != 0) {
            alert('Vui lòng thêm đủ số lượng ảnh (2 ảnh)')
            return;
        }

        if (filmName == '') {
            alert('Vui lòng nhập tên phim')
            return;
        }

        if (released != '') {
            if (!released.match(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/)) {
                alert('Vui lòng nhập đúng định dạng ngày')
                return;
            }
        } else {
            alert('Vui lòng nhập ngày ra mắt')
            return;
        }

        if (filmType == '') {
            alert('Vui lòng chọn loại phim')
            return;
        }


        let releaseDay = released.split('-')
        let temp = releaseDay[0]
        releaseDay[0] = releaseDay[2]
        releaseDay[2] = temp

        releaseDay = releaseDay.join('-')
        console.log(releaseDay)

        setIsLoading(true)
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append("filmImg", images[i]);
        }
        formData.append("title", filmName)
        formData.append("fullplot", fullplot)
        formData.append("released", releaseDay)
        formData.append("type", filmType)
        genresFilm.forEach((film) => {
            formData.append("genres", film)
        })
        castsFilm.forEach((film) => {
            formData.append("cast", film)
        })
        directorsFilm.forEach((film) => {
            formData.append("directors", film)
        })

        axios.put(
            `http://localhost:8081/v1/api/admin/films/${id}`
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
                toast.success('Sửa phim thành công', {
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

    const handleImageChange = (event) => {
        setImages(event.target.files)
        setAllImages([])

        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                    setAllImages(prev => [...prev, ...imagesArray]);
                }
            };

            reader.readAsDataURL(files[i]);
        }

    };

    function handleDeleteImage(index) {
        const newImages = [...allImages];
        newImages.splice(index, 1);
        setAllImages(newImages)
    }

    return (
        <>
            {
                isLoading == false ?
                    <div className="w-full h-auto  flex flex-col items-center justify-center gap-5 pb-10 mb-10 ">
                        <div className="w-full flex flex-row items-start gap-5">
                            <div className="w-1/4 flex flex-col items-center gap-5">
                                <div className="w-full h-[50px] border cursor-pointer flex items-center justify-center py-2 rounded-xl bg-[#101A33] hover:bg-[#0A3379] duration-200">
                                    <div className="w-auto">
                                        <input type="file" multiple={true} name="upload_imgs[]" id="upload-img" hidden onChange={(event) => { handleImageChange(event) }} accept="image/*" />
                                        <label htmlFor="upload-img" className="w-full flex flex-row items-center gap-2 cursor-pointer">
                                            <i className="fa-solid fa-camera text-white text-xl"></i>
                                            <p className="text-white font-medium">Thêm ảnh phim</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    {allImages.map((image, index) => (
                                        <div className="relative my-4" key={index}>
                                            <img src={image} className="w-full rounded-xl shadow-2xl border" />
                                            {/* <i className="fa-solid fa-xmark absolute top-2 right-2 bg-white rounded-full px-[2px] cursor-pointer hover:bg-[#fc0307] hover:text-white" onClick={() => { handleDeleteImage(index) }}></i> */}
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className="w-3/4 bg-white rounded-xl p-5">
                                <p className="text-4xl font-bold mb-5">Thông tin phim</p>
                                <div className="flex flex-col gap-5">
                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Tên phim:</p>
                                        <input
                                            value={filmName}
                                            type="text"
                                            placeholder="Tên phim"
                                            className="w-2/3 h-[40px] pl-3 border border-[#3e3e3e] rounded-md outline-none"
                                            onChange={(e) => { setFilmName(e.target.value) }}
                                        />
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Mô tả phim:</p>
                                        <input
                                            value={fullplot}
                                            type="text"
                                            placeholder="Mô tả phim"
                                            className="w-2/3 h-[40px] pl-3 border border-[#3e3e3e] rounded-md outline-none"
                                            onChange={(e) => { setFullplot(e.target.value) }}
                                        />
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Ngày ra mắt:</p>
                                        <input
                                            value={released}
                                            type="text"
                                            placeholder="Ví dụ: '18-04-2024'"
                                            className="w-2/3 h-[40px] pl-3 border border-[#3e3e3e] rounded-md outline-none"
                                            onChange={(e) => { setReleased(e.target.value) }}
                                        />
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Loại phim:</p>
                                        <select
                                            className='w-1/4 h-[40px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]'
                                            onChange={(e) => {
                                                if (e.target.value == 'series')
                                                    setFilmType('series')
                                                else
                                                    setFilmType('movie')
                                            }}
                                            ref={SelectTypeFilmElement}
                                        >
                                            <option value="" disabled selected>Loại</option>
                                            <option value="series">Phim bộ</option>
                                            <option value="movie">Phim tập</option>
                                        </select>
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Thể loại:</p>
                                        <div className='w-3/4 relative '>
                                            <div className='relative w-2/3 flex items-center group'>
                                                <input
                                                    value={genreSearch}
                                                    onFocus={() => setIsSelectGenre(true)}
                                                    onChange={(e) => { setGenreSearch(e.target.value) }}
                                                    type='text'
                                                    placeholder='Tìm kiếm thể loại...'
                                                    className="w-full h-[40px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                                                />
                                                <i class="absolute right-2 fa-solid fa-star"></i>
                                            </div>
                                            {isSelectGenre && (
                                                <div className='absolute w-2/3 h-[200px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 z-10 overflow-y-scroll'>
                                                    {genres.map((genre, index) => {
                                                        if (
                                                            genre.title.toLowerCase().includes(genreSearch.toLowerCase().trim()) ||
                                                            genreSearch == ''
                                                        ) {
                                                            return (
                                                                <div key={index} onClick={() => {
                                                                    setGenreSearch('')
                                                                    setIsSelectGenre(false)
                                                                    if (!genresFilm.some((id) => id == genre._id)) {
                                                                        setGenresFilm(prev => [genre._id, ...prev])
                                                                    }
                                                                }}>
                                                                    <SearchSelect image={genre.avatar} content={genre.title} />
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }
                                                    <div className=" absolute top-0 right-[10px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
                                                        onClick={() => {
                                                            setIsSelectGenre(false)
                                                            setGenreSearch('')
                                                        }}
                                                    >
                                                        <p className="text-[red] font-bold text-[25px]">X</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full  flex flex-row flex-wrap gap-2">
                                        {
                                            genres.map((genre, index) => {
                                                if (genresFilm.some(id => id == genre._id))
                                                    return (
                                                        <div className=" hover:cursor-pointer" key={index} onClick={() => {
                                                            const updatedGenresFilm = genresFilm.filter(id => id != genre._id)
                                                            setGenresFilm(updatedGenresFilm)
                                                        }}>
                                                            <SearchTag content={genre.title} />
                                                        </div>
                                                    )
                                            })

                                            // genresFilm.map((genre, index) => {
                                            //     return (
                                            //         <div className=" hover:cursor-pointer" key={index} onClick={() => {
                                            //             const updatedGenresFilm = genresFilm.filter(id => id != genre._id)
                                            //             setGenresFilm(updatedGenresFilm)
                                            //         }}>
                                            //             <SearchTag content={genre.title} />
                                            //         </div>
                                            //     )
                                            // })
                                        }
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Diễn viên:</p>
                                        <div className='w-3/4 relative '>
                                            <div className='relative w-2/3 flex items-center group'>
                                                <input
                                                    value={actorSearch}
                                                    onFocus={() => setIsSelectStar(true)}
                                                    onChange={(e) => { setActorSearch(e.target.value) }}
                                                    type='text'
                                                    placeholder='Tìm kiếm diễn viên...'
                                                    className="w-full h-[40px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                                                />
                                                <i class="absolute right-2 fa-solid fa-star"></i>
                                            </div>
                                            {isSelectStar && (
                                                <div className='absolute w-2/3 h-[200px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 z-10 overflow-y-scroll'>
                                                    {casts.map((cast, index) => {
                                                        if (
                                                            cast.name.toLowerCase().includes(actorSearch.toLowerCase().trim()) ||
                                                            actorSearch == ''
                                                        ) {
                                                            return (
                                                                <div key={index} onClick={() => {
                                                                    setActorSearch('')
                                                                    setIsSelectStar(false)
                                                                    if (!castsFilm.some((id) => id == cast._id)) {
                                                                        setCastsFilm(prev => [cast._id, ...prev])
                                                                    }
                                                                }}>
                                                                    <SearchSelect image={cast.avatar} content={cast.name} />
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }

                                                    <div className=" absolute top-0 right-[10px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
                                                        onClick={() => {
                                                            setIsSelectStar(false)
                                                            setActorSearch('')
                                                        }}
                                                    >
                                                        <p className="text-[red] font-bold text-[25px]">X</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full  flex flex-row flex-wrap gap-2">
                                        {
                                            casts.map((cast, index) => {
                                                if (castsFilm.some(id => id == cast._id))
                                                    return (
                                                        <div className='hover:cursor-pointer' key={index} onClick={() => {
                                                            const updatedCastFilm = castsFilm.filter(id => id != cast._id)
                                                            setCastsFilm(updatedCastFilm)
                                                        }}
                                                        >
                                                            <ImageTag image={cast.avatar} content={cast.name} />
                                                        </div>
                                                    )
                                            })

                                        }
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <p className="w-1/4">Đội ngũ:</p>
                                        <div className='w-3/4 relative '>
                                            <div className='relative w-2/3 flex items-center group'>
                                                <input
                                                    value={directorSearch}
                                                    onFocus={() => setIsSelectDirect(true)}
                                                    onChange={(e) => { setDirectorSearch(e.target.value) }}
                                                    type='text'
                                                    placeholder='Tìm kiếm đội ngũ...'
                                                    className="w-full h-[40px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                                                />
                                                <i class="absolute right-2 fa-solid fa-star"></i>
                                            </div>
                                            {isSelectDirect && (
                                                <div className='absolute w-2/3 h-[200px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 z-10 overflow-y-scroll'>
                                                    {directors.map((director, index) => {
                                                        if (
                                                            director.name.toLowerCase().includes(directorSearch.toLowerCase().trim()) ||
                                                            directorSearch == ''
                                                        ) {
                                                            return (
                                                                <div key={index} onClick={() => {
                                                                    setDirectorSearch('')
                                                                    setIsSelectDirect(false)
                                                                    if (!directorsFilm.some((id) => id == director._id)) {
                                                                        setDirectorsFilm(prev => [director._id, ...prev])
                                                                    }
                                                                }}>
                                                                    <SearchSelect image={director.avatar} content={director.name} />
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }

                                                    <div className=" absolute top-0 right-[10px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
                                                        onClick={() => {
                                                            setIsSelectDirect(false)
                                                            setDirectorSearch('')
                                                        }}
                                                    >
                                                        <p className="text-[red] font-bold text-[25px]">X</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full  flex flex-row flex-wrap gap-2">
                                        {
                                            directors.map((director, index) => {
                                                if (directorsFilm.some(id => id == director._id))
                                                    return (
                                                        <div className='hover:cursor-pointer' key={index} onClick={() => {
                                                            const updateddirectorFilm = directorsFilm.filter(id => id != director._id)
                                                            setDirectorsFilm(updateddirectorFilm)
                                                        }}
                                                        >
                                                            <ImageTag image={director.avatar} content={director.name} />
                                                        </div>
                                                    )
                                            })

                                            // directorsFilm.map((director, index) => {
                                            //     return (
                                            //         <div className='hover:cursor-pointer' key={index} onClick={() => {
                                            //             const updateddirectorFilm = directorsFilm.filter(id => id != director._id)
                                            //             setDirectorsFilm(updateddirectorFilm)
                                            //         }}
                                            //         >
                                            //             <ImageTag image={director.avatar} content={director.name} />
                                            //         </div>
                                            //     )
                                            // })
                                        }
                                    </div>

                                    <div className="mt-10 flex items-center justify-center w-3/4">
                                        <button
                                            type="submit"
                                            onClick={submitImage}
                                            className="h-[60px] w-2/5 border border-black rounded-lg hover:bg-[#0A3379] group hover:border-[#0A3379]"
                                        >
                                            <p className="text-xl font-bold group-hover:text-white">CẬP NHẬT</p>
                                        </button>

                                    </div>
                                    <ToastContainer />
                                </div>
                            </div>
                        </div>
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

export default MovieDetail;