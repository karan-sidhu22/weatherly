import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './app/page';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
