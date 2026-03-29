import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user/userContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const Table = ({ id }) => {
    const [videoList, setVideoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getEpisodeMovie = () => {
        setIsLoading(true)

        fetch(`http://localhost:8081/v1/api/admin/videos/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if(data.success != false){
                    for (let i = 0; i < data.length - 1; i++) {
                        for (let j = i + 1; j < data.length; j++) {
                            if (data[i].chapter > data[j].chapter) {
                                let temp = data[i]
                                data[i] = data[j]
                                data[j] = temp
                            }
                        }
                    }
                    console.log(data)
                    setVideoList(data)
                }

            })
            .catch((err) => {
                alert(err)
                // setIsLoading(false)
            })
            .finally(async () => {
                setIsLoading(false)
            })

    }

    useEffect(() => {
        getEpisodeMovie()
    }, [])

    const handleDelete = (idList) => {
        const formData = new FormData();

        formData.append("filmId", id)
        formData.append("videoListId", idList)

        fetch(`http://localhost:8081/v1/api/admin/videos?filmId=${id}&videoListId=${idList}`, {
            method: 'DELETE'
        })
            .then(() => {
                toast.success('xóa phim thành công', {
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
                getEpisodeMovie()
            })
    }
    return (
        <>
            {
                isLoading == false ?
                    <section className="w-full antialiased  text-gray-600 rounded-xl overflow-hidden">
                        <div className="flex flex-col justify-center h-full">
                            <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
                                <header className="px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-gray-800">Danh sách tập: (Hiện đang có {videoList.length} tập)</h2>
                                </header>
                                <div className="p-3 w-full">
                                    <div className="overflow-x-auto w-full">
                                        <table className="w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 ">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Số tập</div>
                                                    </th>
                                                    {/* <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Email</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Giới tính</div>
                                        </th> */}
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Link video</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full text-sm divide-y divide-gray-100">
                                                {
                                                    videoList.length != 0?videoList.map((episode, index) => (
                                                        <tr key={index} className="">
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="  text-left font-medium text-green-500">{episode.chapter==0?'':episode.chapter}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap max-w-[500px] overflow-hidden">
                                                                <div className="text-lg text-left">{episode.videoLink}</div>
                                                                {/* <div className="text-left font-medium text-green-500">{episode.videoLink}</div> */}
                                                            </td>

                                                            <td>
                                                                <button
                                                                    onClick={() => { handleDelete(episode._id) }}
                                                                    className="group">
                                                                    <i class="fa-solid fa-trash text-2xl  text-[#0A3379] group-hover:opacity-[0.5] duration-150 east-out mr-2 ml-8"></i>
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    )):
                                                    <></>
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

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

export default Table;