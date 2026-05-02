import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [casts, setCasts] = useState([])
    const [directors, setDirectors] = useState([])
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([]);
    const [userId, setUserId] = useState('');
    const [accessToken, setAccessToken] = useState('');

    

    const fetchGenre = () => {
        axios
            .get("http://localhost:8081/v1/api/catalog/genres")
            .then((res) => {
                setGenres(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchMovie = () => {
        axios.get("http://localhost:8081/v1/api/catalog/films")
            .then((res) => {
                setMovies(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchMovie()
        fetchGenre()
    }, [])

    return <AppContext.Provider value={{
        users, setUsers,
        casts, setCasts,
        directors, setDirectors,
        movies, setMovies,
        genres, setGenres,
        accessToken, setAccessToken,
        userId, setUserId
    }}>
        {children}
    </AppContext.Provider>
}