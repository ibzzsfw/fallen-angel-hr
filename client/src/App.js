import { Route, Routes } from 'react-router-dom';
import './App.scss';
import UI from './components/UI/UI';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import DailyTime from './pages/DailyTime/DailyTime';
import Deduction from './pages/Deduction/Deduction';

function App() {
  return (
    <>
      <UI />
      <div className='bg' />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dailytime" element={<DailyTime />} />
        <Route path="/deduction" element={<Deduction />} />
      </Routes>
    </>
  );
}

export default App;