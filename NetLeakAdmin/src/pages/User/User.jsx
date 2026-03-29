import { useContext } from "react";
import NormalSearch from "../../components/Search/NormalSearch/NormalSearch";
import Table from "../../components/Table/UserTable/Table";
import { UserContext } from "../../context/user/userContext";
import { BeatLoader } from "react-spinners";

const User = () => {
    const { users, setSearchUserText } = useContext(UserContext)

    return (
            <div className="w-full h-auto flex flex-col items-center justify-center gap-5 pb-5 ">
                <div className="w-full bg-white rounded-xl flex flex-row items-center justify-between p-2 ">
                    <NormalSearch setSearchText={setSearchUserText}/>
                </div>
                {users.length != 0 ? (
                    <Table/>
                )
                : <BeatLoader className=" flex justify-center" color="#36d7b7" />}
            </div>
    );
}

export default User;