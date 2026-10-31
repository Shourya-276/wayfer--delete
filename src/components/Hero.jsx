import React from 'react';
import { ShieldCheck, Clock, FileCheck, ArrowRight, KeyRound } from 'lucide-react';

export default function Hero({ currentView, setCurrentView }) {
  const handleScrollToForm = () => {
    setCurrentView('portal');
    setTimeout(() => {
      const el = document.getElementById('deletion-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

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
        <span className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          WayFer
        </span>
      </div>

      {/* Brand Eyebrow / Overline Pill Container */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '26px',
        padding: '0 8px'
      }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white backdrop-blur-md">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white">
            MATCH ➔ MEET ➔ RIDE
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400">
            Ride sharing, made simple
          </span>
        </div>
      </div>

      {/* Main Headline H1 */}
      <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-[3.65rem] font-black tracking-tight leading-[1.1] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] max-w-4xl mx-auto mb-5">
        <span>Account & Data</span>{' '}
        <span className="text-gradient-white">Erasure Portal</span>
      </h1>

      {/* Subtitle / Body Copy */}
      <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto mb-9">
        Initiate permanent deletion of your <strong className="text-white font-semibold">Wayfer account</strong>, ride history, location telemetry, and stored preferences. Compliant with <strong className="text-white font-semibold">Google Play</strong> & <strong className="text-white font-semibold">Apple App Store</strong> account deletion mandates.
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
          onClick={handleScrollToForm}
          className={`btn btn-sm ${currentView === 'portal' ? 'btn-primary' : 'btn-ghost'} text-xs sm:text-sm font-black uppercase tracking-wider`}
          style={{ whiteSpace: 'nowrap' }}
        >
          Submit Deletion Request
        </button>
        <button
          onClick={() => setCurrentView('policy')}
          className={`btn btn-sm ${currentView === 'policy' ? 'btn-primary' : 'btn-ghost'} text-xs sm:text-sm font-black uppercase tracking-wider`}
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
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
              14-Day Grace Window
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            After submission, your account enters a <strong className="text-white font-semibold">14-day deactivation hold</strong> before permanent wipe.
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
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
              Permanent Data Deletion
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Your personal profile, ride history, location data, saved places, and payment details are completely and permanently removed.
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
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
              Privacy Regulations
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Strict compliance with Google Play Store, Apple App Store Guidelines, and global data privacy mandates.
          </p>
        </div>
      </div>
    </section>
  );
}
