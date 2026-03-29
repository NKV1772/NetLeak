/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import TableCategory from "./TableCategory";
import { genreContext } from "../../../context/genre/genreContext";

const Table = ( ) => {
    const { genres, searchGenreText } = useContext(genreContext)
    return (
        <div className="w-full flex justify-center bg-white rounded-t-lg">
        <div className="w-full flex flex-col ">
            <div className="w-full h-[50px] flex flex-row items-center gap-3 bg-[#0A3379] rounded-t-lg">
            <p className="w-3/12 text-center font-bold text-white">ID</p>
            <p className="w-8/12 text-center font-bold text-white">
                Tên thể loại
            </p>
            <div className="w-1/12"></div>
            </div>
            <div className="w-full flex flex-col border border-b-0 border-[#0A3379]">
            {genres.map((genre, i) => {
                console.log(genre)
                if( genre.title.toLowerCase().includes(searchGenreText.toLowerCase().trim()) || searchGenreText == '')
                return (
                <React.Fragment key={i}>
                    <TableCategory genre={genre} index={i} />
                </React.Fragment>
                );
            })}
            </div>
        </div>
        </div>
    );
};

export default Table;
