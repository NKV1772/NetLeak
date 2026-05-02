import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const token = localStorage.getItem('adminAccessToken')
    if (!token) {
        return <Navigate to="/dang-nhap" replace />
    }
    return <Outlet />
}
