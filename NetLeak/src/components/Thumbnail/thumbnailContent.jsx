import React, { lazy } from "react";
import thumb_pic from '../../assets/images/thumbnail.jpg'
import N from '../../assets/images/N-logo.png'
import top10 from '../../assets/images/top10.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
const ThumbnailContent = ({ data, index }) => {
    const navigate= useNavigate()
    const handlePlay=()=>{
        navigate(`/video/${data._id}/1`)
        // console.log(data)
    }
    const handleIn4=()=>{
        navigate(`/movie/${data._id}`)
    }

    return (
        <>
             <div className='w-full h-screen absolute flex items-center justify-center'>
    <img
      src={data.image.banner}
      alt="thumb-pic"
      className="w-full h-auto brightness-[70%] absolute align-center"
    />
  </div>
            <div className='relative w-full h-full flex items-center justify-center brightness-110'>
                <div className='w-[95%] h-4/5 flex flex-col justify-evenly'>
                    <div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row items-center'>
                                <img
                                    src={N}
                                    alt='N-logo'
                                    className='w-7'
                                />
                                <p>SERIAL</p>
                            </div>
                            <p className="font-bold text-4xl text-white p-5 pl-0 w-1/2"> {data.title.toUpperCase().substring(0,70)} ...</p>
                        </div>
                        <div className='flex flex-row items-center mb-5'>
                            <img
                                src={top10}
                                alt='top10'
                                onLoad={lazy}
                                className='w-7'
                            />
                            <p className="text-xl" >#{index} DANH SÁCH THỊNH HÀNH</p>
                        </div>
                        <p className='w-1/2 text-lg'>{data.fullplot.substring(0, 200)}...</p>
                    </div>
                    <div className='access'>
                        <button className='play' onClick={handlePlay}>
                            <FontAwesomeIcon icon={faPlay} className='icon' />
                            <p>Phát</p>
                        </button>
                        <button className='playlist' onClick={handleIn4}>
                            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
                            <p>Thông tin thêm</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThumbnailContent;