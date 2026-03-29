import './info.css'
import React from 'react';
import actor from '../../../../assets/images/actor.jpg'
import movie from '../../../../assets/movies/1.jpg'

const InfoBox = ({ name, image }) => {
    console.log(name)
    console.log(image)
    return (
        // <div className='w-full flex flex-col justify-center items-center gap-3 rounded-md'>
        //     <div className='w-[150px] h-[150px] overflow-hidden relative border rounded-full'>
        //         <img
        //             src={image}
        //             alt='movie'
        //             className='w-[150px] h-[150px] absolute'
        //         />
        //     </div>
        //     <p className='text-base md:text-xl lg:text-2xl text-white font-medium mb-3'>{name}</p>
        // </div>
        <div className='group hover:cursor-pointer hover:scale-[1.09] mt-2 mb-2 transition-transform flex flex-col items-center justify-start  '>
            <img loading='lazy' className=' group-hover:border-[4px] group-hover:border-[#B22222] w-32 h-32 rounded-[50%] object-cover mb-2' src={image} alt="Ảnh diễn viên" />

            <p className=' text-white text-[14px] expandText1Row'>{name}</p>
        </div>
    );
}

export default InfoBox;