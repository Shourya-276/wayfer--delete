import React from 'react';
import { Lock, Shield, ExternalLink } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (viewId === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-medium)',
      backgroundColor: '#050505',
      padding: '48px 24px 32px 24px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '32px',
        marginBottom: '40px'
      }}>
        {/* Column 1: Brand */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '14px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/wayfer-logo.jpeg" alt="Wayfer" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: '800',
              letterSpacing: '0.08em',
              color: '#ffffff'
            }}>
              WAYFER
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
            Next-generation navigation, smart dispatch, and urban mobility platform. Dedicated to user data sovereignty and ethical AI telemetry.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ffffff',
            marginBottom: '14px'
          }}>
            Portal Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
            <li>
              <button
                onClick={() => handleNavClick('portal')}
                className="btn-ghost"
                style={{ padding: 0, textAlign: 'left', color: 'var(--text-secondary)' }}
              >
                Submit Deletion Request
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('track')}
                className="btn-ghost"
                style={{ padding: 0, textAlign: 'left', color: 'var(--text-secondary)' }}
              >
                Track Request Status
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('policy')}
                className="btn-ghost"
                style={{ padding: 0, textAlign: 'left', color: 'var(--text-secondary)' }}
              >
                Data Erasure Policy & FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Regulatory */}
        <div>
          <h4 style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ffffff',
            marginBottom: '14px'
          }}>
            Store Compliance
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>• Google Play Account Deletion Policy Compliant</span>
            <span>• Apple App Store Guideline 5.1.1(v) Compliant</span>
            <span>• GDPR Article 17 (Right to Erasure)</span>
            <span>• CCPA / CPRA Consumer Rights</span>
          </div>
        </div>

        {/* Column 4: Admin Access */}
        <div>
          <h4 style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ffffff',
            marginBottom: '14px'
          }}>
            Internal Administration
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Restricted access for Wayfer compliance officers and support admins.
          </p>
          <button
            onClick={() => handleNavClick('admin')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Lock size={12} />
            <span>Admin Portal (/admin)</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.78rem',
        color: 'var(--text-dim)'
      }}>
        <span>© {new Date().getFullYear()} Wayfer Technologies Inc. All rights reserved. Strict Monochrome Design.</span>
        <span>Hosted on Vercel • React Vite Architecture</span>
      </div>
    </footer>
  );
}
