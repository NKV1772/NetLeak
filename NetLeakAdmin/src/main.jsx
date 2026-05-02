import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import { UserContextProvider } from './context/user/userContext.jsx'
import { GenreContextProvider } from './context/genre/genreContext.jsx'

const adminToken = localStorage.getItem('adminAccessToken')
if (adminToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${adminToken}`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
  <GenreContextProvider>
      <App />
 </GenreContextProvider>  
  </UserContextProvider>
)
