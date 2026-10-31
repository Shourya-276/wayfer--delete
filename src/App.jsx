import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DeletionForm from './components/DeletionForm';
import RequestTracker from './components/RequestTracker';
import PolicyFaq from './components/PolicyFaq';
import AdminPanel from './components/AdminPanel';
import { checkAdminAuth } from './utils/storage';

export default function App() {
  // Determine initial view from pathname
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/admin')) {
      return 'admin';
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'admin') {
      return 'admin';
    }
    if (params.get('view') === 'track') {
      return 'track';
    }
    if (params.get('view') === 'policy') {
      return 'policy';
    }
    return 'portal';
  };

  const [currentView, setCurrentView] = useState(getInitialView());
  const [trackCode, setTrackCode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(checkAdminAuth());

  // Listen to browser navigation (back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
      setIsAdminAuthenticated(checkAdminAuth());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and View
  const handleViewChange = (viewId, code = '') => {
    setCurrentView(viewId);
    if (code) setTrackCode(code);

    if (viewId === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAdminAuthenticated(checkAdminAuth());
  };

  const handleSubmissionSuccess = (request) => {
    setTrackCode(request.id);
  };

  const handleNavigateToTrack = (code) => {
    setTrackCode(code);
    setCurrentView('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-black)'
    }}>
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleViewChange}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'admin' ? (
          <AdminPanel onExitToSite={() => handleViewChange('portal')} />
        ) : (
          <>
            <Hero currentView={currentView} setCurrentView={handleViewChange} />

            {currentView === 'portal' && (
              <DeletionForm
                onSubmissionSuccess={handleSubmissionSuccess}
                onNavigateToTrack={handleNavigateToTrack}
              />
            )}

            {currentView === 'track' && (
              <RequestTracker initialCode={trackCode} />
            )}

            {currentView === 'policy' && (
              <PolicyFaq />
            )}
          </>
        )}
      </main>
    </div>
  );
}
