import './css/App.css';
import Home from './pages/Home.tsx';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites.tsx';
import NavBar from './components/NavBar.tsx';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>

    // <>
    // <Home/>
    // </>
  );
}

export default App;
