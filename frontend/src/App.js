import { Route, Routes } from 'react-router-dom';
import { Content } from 'carbon-components-react';
import './App.scss';
import './App.css';
import UI from './components/UI/UI';
import Profile from './pages/Profile/Profile';
import DailyTime from './pages/DailyTime/DailyTime';

function App() {
  return (
    <>
      <UI />
      <Content>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dailytime" element={<DailyTime />} />
        </Routes>
      </Content>
    </>
  );
}

export default App;