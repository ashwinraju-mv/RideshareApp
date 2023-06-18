import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div className='App'>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
