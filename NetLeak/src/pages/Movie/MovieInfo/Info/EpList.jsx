import './info.css'
import React, { useState, useEffect } from "react";
import ep from '../../../../assets/images/ep1.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EpList = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [video, setVideo] = useState([])
    const hanldePlay = (e) => {
        if (e.chapter == 0) {
            navigate(`/video/${params.id}/1`)
            return
        }
        navigate(`/video/${params.id}/${e.chapter}`)
    }
    useEffect(() => {
        const fetchVideo = () => {
            axios.get("http://localhost:8081/v1/api/admin/videos/" + params.id)
                .then((res) => {
                    setVideo(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchVideo()
    }, [params.id])

    console.log(video)

    return (
        <div className='w-full flex items-center justify-center relative z-50 pb-20'>
            <div className='w-11/12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {video.map((value, index) => {
                    const getVideoIdFromUrl = (url) => {
                        const videoIdRegex = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;
                        const match = url.match(videoIdRegex);
                        return match ? match[1] : null;
                    };
                    const videoId = getVideoIdFromUrl(value.videoLink);
                    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

                    return (
                        <div className='w-full flex flex-col items-center justify-center group cursor-pointer hover:scale-105 duration-150' onClick={() => hanldePlay(value)}>
                            {thumbnail ? (
                                <img
                                    src={thumbnail}
                                    alt='movie'
                                    className='w-full rounded-lg group-hover:brightness-105 duration-150'
                                />
                            ) : (
                                <div className='w-full h-[150px] bg-gray-700 flex items-center justify-center'>
                                    <p className='text-xl font-bold text-gray-400'>Tập {value.chapter}</p>
                                </div>
                            )}
                            <p className='font-medium text-lg group-hover:font-bold group-hover:text-green-500 duration-150'>Tập {value.chapter}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default EpList;