import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Ticket from './components/Ticket';
import PrivateRoute from './components/PrivateComponent';
import Login from './components/Login';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Ticket />} />
            <Route path='/logout' element={<h1>Logout component</h1>} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
