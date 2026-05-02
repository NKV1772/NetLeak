import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/AdminLogin'
import PageLayout from './context/PageLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import User from './pages/User/User'
import Movie from './pages/Movie/Movie'
import Category from './pages/Category/Category'
import Actor from './pages/Actor/Actor'
import Director from './pages/Director/Director'
import AddCategory from './pages/Category/AddCategory'
import AddActor from './pages/Actor/AddActor'
import AddDirector from './pages/Director/AddDirector'
import AddMovie from './pages/Movie/AddMovie'
import MovieDetail from './pages/Movie/MovieDetail'
import UploadMovie from './pages/Movie/UploadMovie'
import AddVideo from './pages/Movie/AddVideo'
import DetailVideoMovie from './pages/Movie/DetailVideoMovie'
import { useState } from 'react'

function AdminShell() {
    const [navSlide, setNavSlide] = useState(true)
    return (
        <>
            <Navbar navSlide={navSlide} />
            <PageLayout navSlide={navSlide} onclick={() => setNavSlide(!navSlide)}>
                <Outlet />
            </PageLayout>
        </>
    )
}

function App() {
    return (
        <div className="bg-[#67718a] ">
            <BrowserRouter>
                <Routes>
                    <Route path="/dang-nhap" element={<AdminLogin />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminShell />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/thong-ke" element={<Dashboard />} />
                            <Route path="/nguoi-dung" element={<User />} />
                            <Route path="/phim" element={<Movie />} />
                            <Route path="/them-phim" element={<AddMovie />} />
                            <Route path="/chi-tiet/:id" element={<MovieDetail />} />
                            <Route path="/them-video" element={<AddVideo />} />
                            <Route path="/danh-sach-tap/:id" element={<DetailVideoMovie />} />
                            <Route path="/upload" element={<UploadMovie />} />
                            <Route path="/the-loai" element={<Category />} />
                            <Route path="/them-the-loai" element={<AddCategory />} />
                            <Route path="/dien-vien" element={<Actor />} />
                            <Route path="/them-dien-vien" element={<AddActor />} />
                            <Route path="/doi-ngu" element={<Director />} />
                            <Route path="/them-doi-ngu" element={<AddDirector />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
