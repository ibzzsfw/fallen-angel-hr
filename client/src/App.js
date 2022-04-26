import { Route, Routes } from 'react-router-dom';
import { Content } from 'carbon-components-react';
import './App.scss';
import UI from './components/UI/UI';
import Profile from './pages/Profile/Profile';
import DailyTime from './pages/DailyTime/DailyTime';
import Deduction from './pages/Deduction/Deduction';

function App() {
  return (
    <>
      <UI />
      <Content>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dailytime" element={<DailyTime />} />
          <Route path="/deduction" element={<Deduction />} />
        </Routes>
      </Content>
    </>
  );
}

export default App;