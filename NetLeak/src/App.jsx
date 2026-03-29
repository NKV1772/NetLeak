import { Slide } from 'react-toastify'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Movie from './pages/Movie/Movie'
import MyList from './pages/MyList/MyList'
import SignUp from './pages/SignUp/SignUp'
import Step1 from './pages/SignUp/step/step1'
import TabPage from './pages/TabPage/TabPage'
import User from './pages/User/User'
import Video from './pages/Video/Video'
import Welcome from './pages/Welcome/Welcome'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import History from './pages/User/History'
import Search from './components/Search/Search'
import { AppProvider } from './context/AppContext'
import Login from './pages/Login/Login'
import Footer from './pages/Video/Footer'
function App() {

  return (
    <div className='app-container overflow-hidden '>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path='/' element={<Welcome />} />
              <Route path='/signup/:step' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path='/mylist' element={<MyList />} />
              <Route path="/tab/:id" element={<TabPage />} />
              <Route path="/video/:id/:chapter" element={<Video />} />
              <Route path="/genre" element={<TabPage />} />
             
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/user" element={<User />} />
              <Route path="/history" element={<History />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </div>




  )
}

export default App
