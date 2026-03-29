import ContentSection from './ContentSection';
import { Link } from 'react-router-dom';
import './welcome.css';
import React from 'react';
import Section_Img1 from '../../assets/images/section1.jpg';
import Section_Img3 from '../../assets/images/tv.png';
import Section_Img4 from '../../assets/images/content.jpg';
import ContentVideo from './ContentVideo';
import video1 from '../../assets/images/video-tv-0819.mp4'
import video2 from '../../assets/images/video-devices-vn.mp4'
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
    const navigate = useNavigate()
    const linkStyle = {
        textDecoration: "none",
    };

    return (

        <div className='welcome-container flex flex-col '>
            <div className='container1 '>
                <div className='header'>
                    <h1>NETLEAK</h1>
                    <button
                        onClick={() =>{navigate('/login')}}
                        className='px-3'
                    >
                        <p >Đăng nhập</p>
                    </button>
                </div>
                <div className='main'>
                    <h1>Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác</h1>
                    <p className='mt-2'>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</p>

                    
                    <div className='user-start'>
                        <button>
                            <Link to="/signup/step1" style={linkStyle}><Link />
                                <p>Bắt đầu</p>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <ContentVideo
                title={"Nơi mà câu chuyện bắt đầu cùng với mỗi cú click"}
                mediavideo={video1}
                content={" Tận hưởng những phút giây đắm chìm trong thế giới tưởng tượng của anime ngay tại đây!"}
                image={Section_Img3}
            />
            <ContentSection
                title={"Khám phá thế giới anime, từ kinh điển đến mới lạ."}
                content={"Dẫn bước bạn qua các tác phẩm anime kinh điển và những bộ phim mới ra mắt."}
                image={Section_Img1}
            />
            <ContentVideo
                title={"Anime đến từ mọi nơi, chỉ trong một nơi."}
                mediavideo={video2}
                content={"Với hàng ngàn bộ anime từ mọi thể loại và nơi trên thế giới dành cho mọi lứa tuổi."}
                image={Section_Img3}
            />
            <ContentSection
                title={"Thế giới ANIME không bao giờ ngừng mở rộng"}
                content={"Đưa bạn vào kho phim được cập nhật hàng ngày"}
                image={Section_Img4}
            />

        </div>
    );
}

export default Welcome;