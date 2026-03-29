import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({})
  const { accessToken, setAccessToken } = useContext(AppContext)

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      var vars = query.split("&");

      var arr = vars.filter(data => {
        if (data.split("=")[0] == 'amount' || data.split("=")[0] == 'payType') {
          return data.split("=")[1]
        }
      })

      let amount = 0
      let payType = ''
      arr.forEach((data) => {
        if (data.split('=')[0] == 'amount') {
          amount = data.split('=')[1]
        }
        if (data.split('=')[0] == 'payType') {
          payType = data.split('=')[1]
        }
      })


      axios.post('http://localhost:8081/v1/api/user/payment/add', {
        email: localStorage.userID,
        package_id: localStorage.pakageId,
        method: payType,
        total: amount
      })
        .then(() => {
          // navigate('/login')
        })

    }
  }, [])
  const handleClick = () => {
    // console.log("Click")
    var user = axios.post("http://localhost:8081/v1/api/login", {
      email: email,
      password: password
    })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data)
          localStorage.setItem('accessToken', res.data.accessToken)
          navigate('/home')
        } else {
          alert("Đăng nhập không thành công! Mời đăng nhập lại")
        }
      })
      .catch(err => {console.log(err)
      alert(err)
      })
  }
  return (
    <div className="h-screen bg-black">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_small.jpg')" }}>
      </div>
      <nav className='fixed z-[1] px-[60px] py-[25px]'>
        <Link to='/'>
        <h1  className="m-0 text-[red] text-5xl font-extrabold">NETLEAK</h1>
        </Link>
      
      </nav>
      <div className="absolute rounded w-[450px] -translate-x-2/4 -translate-y-2/4 p-[70px] left-2/4 top-2/4 bg-black bg-opacity-75">
        <h2

          className="text-white text-[2rem] font-bold">Đăng nhập</h2>
        <div className='mt-[25px] mb-[65px] mx-0'>
          <div className="h-[60px] relative mb-2">
            <input
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  handleClick()
                }
              }}
              className={`h-full w-full rounded text-white pt-3 px-5 py-0 bg-gray-800 outline-none focus:bg-gray-900 focus:valid:bg-gray-900 focus:valid:pt-4 border ${password ? 'border-gray-500' : 'border-red-500'} border-solid border-1`}
              type="text"
              required
              onFocus={(e) => {
                e.target.nextElementSibling.classList.add('text-xs', 'translate-y-[-130%]');
                e.target.classList.add('focus:border-white');
              }}

              onBlur={(e) => {
                if (e.target.value === '') {
                  e.target.nextElementSibling.classList.remove('text-xs', 'translate-y-[-130%]');
                }
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-5 top-2/4 transform -translate-y-2/4 text-sm text-gray-400 transition-all duration-100 pointer-events-none">
              Email hoặc số điện thoại di động
            </label>
          </div>
          {email === '' && <small className='text-red-500'>Vui lòng nhập email hoặc số điện thoại hợp lệ.</small>}
          <div className="h-[60px] relative mt-4">
            <input
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  handleClick()
                }
              }}
              className={`h-full w-full rounded text-white px-5 py-0 bg-gray-800 outline-none focus:bg-gray-900 focus:valid:bg-gray-900 focus:valid:pt-4 border ${password ? 'border-gray-500' : 'border-red-500'}  border-solid border-1`}
              type="password"
              required
              onFocus={(e) => {
                e.target.nextElementSibling.classList.add('text-xs', 'translate-y-[-130%]');
                e.target.classList.add('focus:border-white');
              }}
              onBlur={(e) => {
                if (e.target.value === '') {
                  e.target.nextElementSibling.classList.remove('text-xs', 'translate-y-[-130%]');
                }
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-5 top-2/4 transform -translate-y-2/4 text-sm text-gray-400 transition-all duration-100 pointer-events-none">
              Mật khẩu
            </label>
          </div>
          {password === '' && <small className='text-red-500'>Vui lòng nhập mật khẩu hợp lệ.</small>}
          <button onClick={handleClick} className="w-full text-base text-white font-medium rounded cursor-pointer transition-[0.1s] duration-[ease] mt-[25px] mb-2.5 mx-0 px-0 py-4 border-[none] bg-red-600 outline-none hover:bg-red-700" type="submit">Đăng nhập</button>
          <div className="flex justify-between">
            <div className="flex">
              <input className="accent-[#b3b3b3] mr-[5px]" type="checkbox" id="remember-me" />
              <label className="text-[0.9rem] text-white" htmlFor="remember-me">Ghi nhớ tôi</label>
            </div>
          </div>
        </div>
        <p className="text-gray-400">Bạn mới tham gia Netleak?
          <Link
            to={'/signup/step1'}
            className="text-white hover:text-red-500 ml-2" href="#">
            Đăng ký ngay.
          </Link></p>
      </div>
    </div>
  );
}

export default Login;