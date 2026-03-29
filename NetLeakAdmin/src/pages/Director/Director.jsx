import { useContext } from "react"
import NormalSearch from "../../components/Search/NormalSearch/NormalSearch";
import Table from "../../components/Table/DirectorTable/Table";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user/userContext";
import { BeatLoader } from "react-spinners";

const Director = () => {
    const { directors, setSearchDirectorText } = useContext(UserContext)

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-5 px-5 pb-5 ">
            <div className="w-full bg-white rounded-xl flex flex-row items-center justify-between p-2">
                <NormalSearch setSearchText={setSearchDirectorText} />
            </div>
            <div className="w-full h-auto flex items-end justify-end">
                <Link
                    to={"/them-doi-ngu"}
                    className="h-[50px] w-auto rounded-lg flex items-center justify-center px-3 cursor-pointer bg-[#101A33] hover:bg-[#0A3379] duration-200">
                    <p className="font-bold text-white">+ Thêm đội ngũ</p>
                </Link>
            </div>

            {
                directors.length != 0 ?
                    (
                        <Table />
                    )
                    : <BeatLoader className=" flex justify-center" color="#36d7b7" />
            }
        </div>
    );
}

export default Director;