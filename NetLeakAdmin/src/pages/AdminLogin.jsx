import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeJwtPayload } from '../utils/jwtDecode'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8081/v1/api/login', {
                email,
                password
            })
            if (!res.data?.success || !res.data?.accessToken) {
                alert('Đăng nhập không thành công.')
                return
            }
            const payload = decodeJwtPayload(res.data.accessToken)
            if (payload?.roles !== 'admin') {
                alert('Tài khoản không có quyền quản trị.')
                return
            }
            localStorage.setItem('adminAccessToken', res.data.accessToken)
            axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`
            navigate('/', { replace: true })
        } catch (err) {
            alert(err.response?.data?.message || 'Lỗi đăng nhập.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101A33] text-white p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-[#fc0303]">NETLEAK Admin</h1>
                <label className="flex flex-col gap-1 text-sm">
                    Email
                    <input
                        type="email"
                        className="text-black px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                    Mật khẩu
                    <input
                        type="password"
                        className="text-black px-3 py-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="bg-red-600 hover:bg-red-700 py-2 rounded font-medium">
                    Đăng nhập
                </button>
            </form>
        </div>
    )
}
