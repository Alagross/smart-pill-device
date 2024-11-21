import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SpotifyLogin from './components/SpotifyLogin';
import Dashboard from './components/Dashboard';
import PersonalityAnalysis from './components/PersonalityAnalysis';
import SpotifyWrap from './components/wraps/SpotifyWrap';
import Welcome from './components/wraps/Welcome';
import TopSong from './components/wraps/topsong';
import Top5Songs from './components/wraps/top5songs';
import TopArtist from './components/wraps/topartist';
import Top5Genres from './components/wraps/top5genres';
import TopGenre from './components/wraps/topgenre';
import Top5Artists from './components/wraps/Top5Artists';
import Finish from './components/wraps/finish';
import ContactForm from './components/ContactForm';
import WrapPost from './components/WrapPost';  // New Component
import WrapList from './components/WrapList';  // New Component
import UserActions from './components/UserActions';  // New Component

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SpotifyLogin />} />
          <Route path="/personality" element={<PersonalityAnalysis />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/personality-analysis" element={<PersonalityAnalysis />} />
          <Route path="/wrap" element={<SpotifyWrap />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/topsong" element={<TopSong />} />
          <Route path="/top5songs" element={<Top5Songs />} /> 
          <Route path="/topartist" element={<TopArtist />} /> 
          <Route path="/top5genres" element={<Top5Genres />} /> 
          <Route path="/topgenre" element={<TopGenre />} />
          <Route path="/top5artists" element={<Top5Artists />} />
          <Route path="/finish" element={<Finish />} />
          <Route path="/contact" element={<ContactForm />} />

          {/* New Routes for Spotify Wrap Features */}
          <Route 
            path="/wraps/new" 
            element={
              <ProtectedRoute>
                <WrapPost />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wraps" 
            element={
              <ProtectedRoute>
                <WrapList filter="public" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wraps/liked" 
            element={
              <ProtectedRoute>
                <WrapList filter="liked" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wraps/following" 
            element={
              <ProtectedRoute>
                <WrapList filter="following" />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
