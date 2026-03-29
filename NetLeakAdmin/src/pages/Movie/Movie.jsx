import { useContext } from "react"
import Search from "../../components/Search/MovieSearch/Search";
import Table from "../../components/Table/MovieTable/Table";
import { UserContext } from "../../context/user/userContext";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Movie = () => {
    const { movies } = useContext(UserContext)

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-5 bg-[#67718a]">
            <div className="w-full h-full bg-white rounded-xl flex flex-col items-center py-5 gap-5">
                <Search />
            </div>
            <div className="flex justify-end w-full">
                <div className=" h-auto mr-[50px]">
                    <Link
                        to={"/them-video"}
                        className="h-[50px] w-auto rounded-lg flex items-center justify-center px-3 cursor-pointer bg-[#101A33] hover:bg-[#0A3379] duration-200">
                        <p className="font-bold text-white">+ Thêm video</p>
                    </Link>
                </div>
                <div className=" h-auto">
                    <Link
                        to={"/them-phim"}
                        className="h-[50px] w-auto rounded-lg flex items-center justify-center px-3 cursor-pointer bg-[#101A33] hover:bg-[#0A3379] duration-200">
                        <p className="font-bold text-white">+ Thêm phim</p>
                    </Link>
                </div>
            </div>
            {
                movies.length != 0 ?
                    (
                        <Table />
                    ) : <BeatLoader className=" flex justify-center" color="#36d7b7" />
            }
        </div>
    );
}

export default Movie;