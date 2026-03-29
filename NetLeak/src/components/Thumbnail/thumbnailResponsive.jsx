import React from "react";
import thumb_pic from '../../assets/images/thumbResponsive.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus , faInfoCircle} from '@fortawesome/free-solid-svg-icons'
const ThumbnailRes = () => {
    const handlePlay = () => {
        // navigate(`/movie/6630a66c1a3d60de19e9d1a7`)
        window.scrollTo(0, 0);
        window.location.href = `/video/6630a66c1a3d60de19e9d1a7/1`
      }
      const handleIn4 = () => {
        // navigate(`/movie/6630a66c1a3d60de19e9d1a7`)
        window.scrollTo(0, 0);
        window.location.href = `/movie/6630a66c1a3d60de19e9d1a7`
      }
    return (
        <div className=" md:hidden block  w-full mt-[100px] mb-10 relative">
            <img
                src={thumb_pic}
                className="h-auto w-full brightness-90"
            />
            <div className="w-full h-full absolute top-0 flex flex-col justify-end pb-5 pl-3">
            <p className="font-bold text-4xl text-white p-5 pl-0 w-1/2">Tensei-shitara Slime datta ken</p>
                
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
    );
}

export default ThumbnailRes;