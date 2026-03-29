import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table/DetailVideoMovieTable/Table";
import { UserContext } from "../../context/user/userContext";
import { BeatLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

const DetailVideoMovie = () => {
    const { id } = useParams()

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-5 pb-5 ">
            {
                <Table id={id} />
            }
        </div>
    );
}

export default DetailVideoMovie;