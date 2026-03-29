import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const Breadcrumb = () => {
    const location = useLocation();
    const [dadRoute, setDadRoute] = useState('')
    // const [sonRoute, setSonRoute] = useState('')


    useEffect(() => {
        const getRoute = () => {
            let routeLink = location.pathname

            routeLink = routeLink.split('/')
            let routeLinkName = ''

            if (routeLink[1]) {
                if (routeLink[1] == 'thong-ke'){
                    routeLinkName = 'Thống kê'
                }

                if (routeLink[1] == 'nguoi-dung'){
                    routeLinkName = 'Người dùng'
                }

                if (routeLink[1] == 'phim'){
                    routeLinkName = 'Phim'
                }

                if (routeLink[1] == 'the-loai'){
                    routeLinkName = 'Thể loại'
                }

                if (routeLink[1] == 'dien-vien'){
                    routeLinkName = 'Diễn viên'
                }

                if (routeLink[1] == 'doi-ngu'){
                    routeLinkName = 'Đội ngũ'
                }

                if (routeLink[1] == 'chi-tiet'){
                    routeLinkName = 'Chi tiết phim'
                }

                if (routeLink[1] == 'them-doi-ngu'){
                    routeLinkName = 'Thêm đội ngũ'
                }

                if (routeLink[1] == 'them-dien-vien'){
                    routeLinkName = 'Thêm diễn viên'
                }

                if (routeLink[1] == 'them-the-loai'){
                    routeLinkName = 'Thêm thể loại'
                }

                if (routeLink[1] == 'them-phim'){
                    routeLinkName = 'Thêm phim'
                }

                if (routeLink[1] == 'them-video'){
                    routeLinkName = 'Thêm video'
                }

                if (routeLink[1] == 'danh-sach-tap'){
                    routeLinkName = 'Danh sách tập'
                }

                setDadRoute(routeLinkName)
            }
        }

        getRoute()
    }, [location])

    // console.log(location.pathname);
    return (
        <div className="w-auto h-[40px] flex flex-row items-center gap-1">
            <div className="flex flex-row items-center gap-2 text-white rounded-md duration-200 group py-1 px-3">
                <i className="fa-solid fa-chart-simple text-xl duration-200"></i>
                <p className=" font-medium duration-200">{dadRoute}</p>
            </div>

            {/* {
                sonRoute &&
                <div className="flex flex-row items-center gap-2 text-white">
                    <svg className="rtl:rotate-180 w-3 h-3 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <p className="font-medium">{sonRoute}</p>
                </div>
            } */}
        </div>
    );
}

export default Breadcrumb;