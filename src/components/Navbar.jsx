import React, { useState } from 'react';
import { Shield, Lock, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, isAdminAuthenticated }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    if (viewId === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(5, 5, 5, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-medium)',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('portal')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-strong)',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <img 
              src="/wayfer-logo.jpeg" 
              alt="Wayfer Logo" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }} 
            />
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: '#ffffff'
              }}>
                WAYFER
              </span>
              <span className="badge badge-dim" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                DATA & PRIVACY
              </span>
            </div>
            <p style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
              marginTop: '-2px'
            }}>
              Account & Erasure Portal
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '28px'
        }} className="desktop-nav">
          <button
            onClick={() => handleNavClick('portal')}
            className={`btn-ghost btn-sm ${currentView === 'portal' ? 'active-nav-link' : ''}`}
            style={{
              color: currentView === 'portal' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: currentView === 'portal' ? '1px solid #ffffff' : '1px solid transparent',
              borderRadius: 0,
              padding: '6px 2px'
            }}
          >
            Submit Request
          </button>
          <button
            onClick={() => handleNavClick('track')}
            className={`btn-ghost btn-sm ${currentView === 'track' ? 'active-nav-link' : ''}`}
            style={{
              color: currentView === 'track' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: currentView === 'track' ? '1px solid #ffffff' : '1px solid transparent',
              borderRadius: 0,
              padding: '6px 2px'
            }}
          >
            Track Request
          </button>
          <button
            onClick={() => handleNavClick('policy')}
            className={`btn-ghost btn-sm ${currentView === 'policy' ? 'active-nav-link' : ''}`}
            style={{
              color: currentView === 'policy' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: currentView === 'policy' ? '1px solid #ffffff' : '1px solid transparent',
              borderRadius: 0,
              padding: '6px 2px'
            }}
          >
            Retention Policy & FAQ
          </button>
        </nav>

        {/* Right CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => handleNavClick('admin')}
            className={currentView === 'admin' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem'
            }}
            title="Wayfer Admin Portal (/admin)"
          >
            <Lock size={14} />
            <span>Admin Panel</span>
            {isAdminAuthenticated && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'inline-block',
                marginLeft: '2px'
              }} />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-sm mobile-menu-btn"
            style={{ padding: '8px' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={() => handleNavClick('portal')}
            className="btn btn-ghost"
            style={{ justifyContent: 'flex-start', width: '100%' }}
          >
            Submit Deletion Request
          </button>
          <button
            onClick={() => handleNavClick('track')}
            className="btn btn-ghost"
            style={{ justifyContent: 'flex-start', width: '100%' }}
          >
            Track Existing Request
          </button>
          <button
            onClick={() => handleNavClick('policy')}
            className="btn btn-ghost"
            style={{ justifyContent: 'flex-start', width: '100%' }}
          >
            Retention Policy & FAQ
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', width: '100%' }}
          >
            <Lock size={14} />
            Admin Login (/admin)
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
