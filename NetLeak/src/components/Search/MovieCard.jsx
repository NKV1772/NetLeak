import React from 'react';
import img from '../../assets/movies/1.jpg'
const MovieCard = ({img, title}) => {
    return (

        <div className='  sm:w-4/5 w-full h-full'>
            <div className='flex flex-col w-full h-full '>
                <div className='flex w-full justify-center'>
                    <img className='lg:h-[250px] md:h-[230px] lg:w-5/6 md:w-3/4 sm:w-full sm:h-[220px] rounded-md hover:brightness-110 duration-200 cursor-pointer '
                        src={img}
                        alt={title} />
                </div>

                <div className=' place-self-center w-[90%] md:w-[70%] sm:w-[70%] mb-4 text-center text-white cursor-pointer'>
                    <p className='truncate lg:text-sm md:text-xs sm:text-[11px] '>{title}</p>
                </div>
            </div>
        </div>



    )
}
export default MovieCard
