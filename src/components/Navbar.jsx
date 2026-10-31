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

        {/* Desktop Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '28px'
        }} className="desktop-nav">
          <button
            onClick={() => handleNavClick('portal')}
            className={`btn-ghost btn-sm text-xs sm:text-sm font-black uppercase tracking-wider ${currentView === 'portal' ? 'active-nav-link' : ''}`}
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
            onClick={() => handleNavClick('policy')}
            className={`btn-ghost btn-sm text-xs sm:text-sm font-black uppercase tracking-wider ${currentView === 'policy' ? 'active-nav-link' : ''}`}
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

        {/* Right CTA / Mobile Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
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
