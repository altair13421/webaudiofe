import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Terminal from './components/Terminal';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--terminal-black);
  padding: 20px;
`;

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const Playlist = React.lazy(() => import('./pages/Playlist'));
const ArtistDetails = React.lazy(() => import('./pages/ArtistDetails'));

const App = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyles />
        <Terminal>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/artist/:id" element={<ArtistDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </Terminal>
      </AppContainer>
    </Router>
  );
};

export default App;
