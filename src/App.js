import './App.css'
import Auth from './components/auth/auth'
import PrivateRoute from './PrivateRoute'
import Work from './components/work'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

function App() {

  document.title="Помощник кладовщика"

  const cookies = new Cookies();

  axios.interceptors.request.use(function (config) {
    config.baseURL = "https://localhost:5001"
    const token = 'Bearer ' + cookies.get(['token']);
    config.headers.Authorization = token;
    return config;
  });

  return (
    <div id='App'>
      <Route exact path="/auth" component={Auth} />
      <PrivateRoute path='/' component={Work} />
    </div>
  );
}

export default App;
