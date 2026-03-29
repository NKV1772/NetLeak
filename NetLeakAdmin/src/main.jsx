import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/user/userContext.jsx'
import { GenreContextProvider } from './context/genre/genreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
  <GenreContextProvider>
      <App />
 </GenreContextProvider>  
  </UserContextProvider>
)
