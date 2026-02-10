import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './components/HomePage';
import Admin from './components/Admin';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
