import React from 'react';
import { ShieldCheck, Clock, FileCheck, ArrowRight, KeyRound } from 'lucide-react';

export default function Hero({ currentView, setCurrentView }) {
  return (
    <section style={{
      padding: '56px 24px 32px 24px',
      maxWidth: '1240px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      {/* Brand Logo & Lockup */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        marginBottom: '16px'
      }}>
        <img 
          src="/wayfer-logo.png" 
          alt="WayFer Pin" 
          style={{
            height: '56px',
            width: 'auto',
            objectFit: 'contain'
          }} 
        />
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          color: '#ffffff'
        }}>
          WayFer
        </span>
      </div>

      {/* Brand Tagline Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '26px',
        padding: '0 8px'
      }}>
        <div 
          className="hero-tagline-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '7px 18px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#0c0c0c',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-sm)',
            maxWidth: '100%'
          }}
        >
          <span 
            className="hero-tagline-text"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              color: '#ffffff',
              whiteSpace: 'nowrap'
            }}
          >
            MATCH ➔ MEET ➔ RIDE
          </span>
          <span style={{ color: 'var(--border-strong)' }}>|</span>
          <span 
            className="hero-tagline-text"
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap'
            }}
          >
            Ride sharing, made simple
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
        lineHeight: 1.15,
        fontWeight: '800',
        maxWidth: '920px',
        margin: '0 auto 18px auto',
        letterSpacing: '-0.03em'
      }}>
        Account & Data Erasure Portal
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        color: 'var(--text-secondary)',
        maxWidth: '740px',
        margin: '0 auto 36px auto',
        lineHeight: 1.6
      }}>
        Initiate permanent deletion of your Wayfer account, ride history, location telemetry, and stored preferences. Compliant with Google Play & Apple App Store account deletion mandates.
      </p>

      {/* Quick Navigation Action Tabs */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: '#0c0c0c',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-md)',
        gap: '6px',
        maxWidth: '100%',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setCurrentView('portal')}
          className={`btn btn-sm ${currentView === 'portal' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          Submit Deletion Request
        </button>
        <button
          onClick={() => setCurrentView('policy')}
          className={`btn btn-sm ${currentView === 'policy' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          Policy & Retention Timelines
        </button>
      </div>

      {/* Key Guarantees Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        marginTop: '48px',
        textAlign: 'left'
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={16} color="#ffffff" />
            </div>
            <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>14-Day Grace Window</h2>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            After submission, your account enters a 14-day deactivation hold before permanent wipe.
          </p>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileCheck size={16} color="#ffffff" />
            </div>
            <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>Complete Data Scrub</h2>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Profiles, route histories, telemetry logs, saved addresses, and payment tokens are completely expunged.
          </p>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <KeyRound size={16} color="#ffffff" />
            </div>
            <h2 style={{ fontSize: '1rem', fontWeight: '700' }}>Privacy Regulations</h2>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Strict compliance with Google Play Store, Apple App Store Guidelines, and global data privacy mandates.
          </p>
        </div>
      </div>
    </section>
  );
}
