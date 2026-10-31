import React, { useState } from 'react';
import { Shield, Lock, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, isAdminAuthenticated }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    if (viewId === 'admin') {
      window.history.pushState({}, '', '/admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewId === 'portal') {
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const el = document.getElementById('deletion-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%'
      }}>
        {/* Left: Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('portal')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            userSelect: 'none',
            zIndex: 2
          }}
        >
          <div style={{
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/wayfer-logo.png" 
              alt="WayFer Logo" 
              style={{
                height: '38px',
                width: 'auto',
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
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                WayFer
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-white backdrop-blur-md font-mono text-[10px] uppercase tracking-widest font-bold">
                DATA & PRIVACY
              </span>
            </div>
            <p className="font-mono text-[10px] sm:text-[11px] text-neutral-400 tracking-wider mt-0.5">
              ACCOUNT & ERASURE PORTAL
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation - Strictly Centralized */}
        <nav 
          style={{
            alignItems: 'center',
            gap: '32px'
          }} 
          className="desktop-nav"
        >
          <button
            onClick={() => handleNavClick('portal')}
            className={`btn-ghost btn-sm text-xs sm:text-sm font-black uppercase tracking-wider ${currentView === 'portal' ? 'active-nav-link' : ''}`}
            style={{
              color: currentView === 'portal' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: currentView === 'portal' ? '2px solid #ffffff' : '2px solid transparent',
              borderRadius: 0,
              padding: '6px 4px',
              transition: 'all 0.2s ease'
            }}
          >
            Submit Request
          </button>
          <button
            onClick={() => handleNavClick('policy')}
            className={`btn-ghost btn-sm text-xs sm:text-sm font-black uppercase tracking-wider ${currentView === 'policy' ? 'active-nav-link' : ''}`}
            style={{
              color: currentView === 'policy' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: currentView === 'policy' ? '2px solid #ffffff' : '2px solid transparent',
              borderRadius: 0,
              padding: '6px 4px',
              transition: 'all 0.2s ease'
            }}
          >
            Retention Policy & FAQ
          </button>
        </nav>

        {/* Right: Security Status Pill & Mobile Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 2
        }}>
          {/* Desktop Status Pill */}
          <div 
            className="desktop-status-badge"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#d4d4d4',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
            }} />
            <span>PORTAL SECURE</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost mobile-menu-btn"
            style={{ 
              minWidth: '42px', 
              minHeight: '42px', 
              padding: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)'
            }}
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
          gap: '8px'
        }}>
          <button
            onClick={() => handleNavClick('portal')}
            className={`btn ${currentView === 'portal' ? 'btn-primary' : 'btn-ghost'} text-xs sm:text-sm font-black uppercase tracking-wider`}
            style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}
          >
            Submit Deletion Request
          </button>
          <button
            onClick={() => handleNavClick('policy')}
            className={`btn ${currentView === 'policy' ? 'btn-primary' : 'btn-ghost'} text-xs sm:text-sm font-black uppercase tracking-wider`}
            style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}
          >
            Retention Policy & FAQ
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .desktop-status-badge {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 859px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-status-badge {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
