import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Terminal from "./components/Terminal";
import Sidebar from "./components/Sidebar";
import Player, { PlayerProvider } from "./components/Player";
import ArtistsPage from "./pages/ArtistsPage";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--terminal-black);
  padding: 20px;
`;

// Lazy load components for better performance
const Home = React.lazy(() => import("./pages/Home"));
const Search = React.lazy(() => import("./pages/Search"));
const Playlist = React.lazy(() => import("./pages/Playlist"));
const ArtistDetails = React.lazy(() => import("./pages/ArtistDetails"));

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px; /* Same as Sidebar width */
`;

function App() {
  // Sample playlists data - replace with your actual data
  const playlists = [
    { id: 1, name: "Favorites", active: true },
    { id: 2, name: "Rock Classics" },
    { id: 3, name: "Chill Vibes" },
    { id: 4, name: "Workout Mix" },
  ];

  return (
    <PlayerProvider>
      <Router>
        <AppContainer>
          <GlobalStyles />
          <AppLayout>
            <Sidebar playlists={playlists} />
            <MainContent>
              <Terminal>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/playlist" element={<Playlist />} />
                    <Route path="/artist/:id" element={<ArtistDetails />} />
                    <Route path="/artists" element={<ArtistsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </React.Suspense>
              </Terminal>
              <Player />
            </MainContent>
          </AppLayout>
        </AppContainer>
      </Router>
    </PlayerProvider>
  );
}

export default App;
