import { useState, useContext, useRef, useEffect } from 'react';
import SearchSelect from './SearchSelect';
import SearchTag from './SearchTag';
import ImageTag from '../../Table/MovieTable/ImageTag';
import { UserContext } from "../../../context/user/userContext";
import { genreContext } from '../../../context/genre/genreContext';

const Search = () => {
    const { searchMovieText, setSearchMovieText, setSearchMovieActor, setSearchMovieDirector,
        setSearchMovieGenres, setSearchMovieType, casts, directors } = useContext(UserContext)

    const { genres } = useContext(genreContext)

    const selectFilmTypeElement = useRef(null)

    const [isSelectStar, setIsSelectStar] = useState(false)
    const [isSelectDirect, setIsSelectDirect] = useState(false)
    const [isSelectGenre, setIsSelectGenre] = useState(false)

    const [actorSearch, setActorSearch] = useState('')
    const [directorSearch, setDirectorSearch] = useState('')
    const [genreSearch, setGenreSearch] = useState('')
    const [genresFilm, setGenresFilm] = useState([])
    const [castsFilm, setCastsFilm] = useState([])
    const [directorsFilm, setDirectorsFilm] = useState([])

    useEffect(() => {
        const handleSearch = () => {
            setSearchMovieGenres(genresFilm)
            setSearchMovieActor(castsFilm)
            setSearchMovieDirector(directorsFilm)
        }

        handleSearch()
    }, [genresFilm, directorsFilm, castsFilm])

    const resetSearch = () => {
        setSearchMovieType('')
        setSearchMovieText('')
        setActorSearch('')
        setDirectorSearch('')
        setGenreSearch('')
        setGenresFilm([])
        setCastsFilm([])
        setDirectorsFilm([])
        selectFilmTypeElement.current.value = ""
        setIsSelectStar(false)
        setIsSelectDirect(false)
        setIsSelectGenre(false)
    }

    return (
        <div className='w-[95%] flex flex-col gap-5'>
            <div className='w-full flex flex-row gap-3'>
                <div className='relative w-1/4 flex items-center group'>
                    <input
                        value={searchMovieText}
                        onChange={(e) => {
                            setSearchMovieText(e.target.value)
                        }}
                        type='text'
                        placeholder='Tìm kiếm...'
                        className="w-full h-[40px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                    />
                    <i class="absolute right-2 fa-solid fa-magnifying-glass"></i>
                </div>

                <div className='w-1/4 relative '>
                    <div className='relative w-full flex items-center group'>
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
                        <div className='absolute w-full h-[200px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 overflow-y-scroll'>
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

                            <div className=" absolute top-0 right-[0px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
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

                <div className='w-1/4 relative '>
                    <div className='relative w-full flex items-center group'>
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
                        <div className='absolute w-full h-[200px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 overflow-y-scroll'>
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

                            <div className=" absolute top-0 right-[0px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
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

                <div className='w-1/4 relative '>
                    <div className='relative w-full flex items-center group'>
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
                        <div className='absolute w-full h-[200px] bg-white flex flex-col border border-[#3e3e3e] rounded-lg p-1 z-10 overflow-y-scroll'>
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
                            <div className=" absolute top-0 right-[0px] py-1 px-4 hover:cursor-pointer hover:opacity-40"
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

                <select
                    onChange={(e) => {
                        if (e.target.value == 'series')
                            setSearchMovieType('series')
                        else
                            if (e.target.value == 'movie')
                                setSearchMovieType('movie')
                            else
                                if (e.target.value == '')
                                    setSearchMovieType('')
                    }}
                    ref={selectFilmTypeElement}
                    className='w-[12%] h-[40px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]'>
                    <option value="">Tất cả</option>
                    <option value="series">Phim bộ</option>
                    <option value="movie">Phim tập</option>
                </select>
            </div>

            <div className='flex flex-row items-start justify-between'>
                <div className=' gap-3 w-auto'>
                    {
                        directorsFilm.length != 0 &&
                        <div className='w-full  flex flex-row flex-wrap gap-2 items-center mt-4'>
                            <p className='w-auto font-bold text-lg'>Diễn viên: </p>
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
                            }
                        </div>
                    }

                    {
                        castsFilm.length != 0 &&
                        <div className='w-full  flex flex-row flex-wrap gap-2 items-center mt-4'>
                            <p className='w-auto font-bold text-lg'>Đội ngũ: </p>
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
                    }

                    {
                        genresFilm.length != 0 &&
                        <div className='w-full  flex flex-row flex-wrap gap-2 items-center mt-4'>
                            <p className='w-auto font-bold text-lg'>Thể loại </p>
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
                            }
                        </div>
                    }
                </div>

                <button
                    onClick={resetSearch}
                    className='border border-[#3e3e3e] py-1 px-4 rounded-lg hover:bg-[#0A3379] duration-150 group'>
                    <p className='font-medium group-hover:text-white duration-150'>Reset</p>
                </button>
            </div>


        </div>
    );
}

export default Search;