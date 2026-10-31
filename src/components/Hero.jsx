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
    <section 
      className="hero-section"
      style={{
        padding: '64px 24px 44px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      {/* Brand Logo & Lockup */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        marginBottom: '18px'
      }}>
        <img 
          src="/wayfer-logo.png" 
          alt="WayFer Pin" 
          style={{
            height: '58px',
            width: 'auto',
            objectFit: 'contain'
          }} 
        />
        <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
          WayFer
        </span>
      </div>

      {/* Brand Eyebrow / Overline Pill Container */}
      <div className="flex items-center justify-center mb-6 px-2 text-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-white backdrop-blur-md">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white">
            MATCH ➔ MEET ➔ RIDE
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400">
            Ride sharing, made simple
          </span>
        </div>
      </div>

      {/* Main Headline H1 - Strictly Centered */}
      <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-[3.75rem] font-black tracking-tight leading-[1.1] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] max-w-4xl mx-auto mb-5 text-center">
        <span>Account & Data</span>{' '}
        <span className="text-gradient-white">Erasure Portal</span>
      </h1>

      {/* Subtitle / Body Copy - Strictly Centered */}
      <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-3xl mx-auto mb-9 text-center">
        Initiate permanent deletion of your <strong className="text-white font-semibold">Wayfer account</strong>, ride history, location telemetry, and stored preferences. Compliant with <strong className="text-white font-semibold">Google Play</strong> & <strong className="text-white font-semibold">Apple App Store</strong> account deletion mandates.
      </p>

      {/* Quick Navigation Action Tabs */}
      <div className="flex justify-center items-center mb-12">
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
      </div>

      {/* Key Guarantees Row - Centered and optimized for big screens */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10">
        <div className="card text-center flex flex-col items-center justify-start" style={{ padding: '26px 22px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#161616',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <Clock size={18} color="#ffffff" />
          </div>
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight mb-2 text-center">
            14-Day Grace Window
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed text-center">
            After submission, your account enters a <strong className="text-white font-semibold">14-day hold period</strong> before permanent wipe.
          </p>
        </div>

        <div className="card text-center flex flex-col items-center justify-start" style={{ padding: '26px 22px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#161616',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <FileCheck size={18} color="#ffffff" />
          </div>
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight mb-2 text-center">
            Permanent Data Deletion
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed text-center">
            Your personal profile, ride history, location data, saved places, and payment details are completely and permanently removed.
          </p>
        </div>

        <div className="card text-center flex flex-col items-center justify-start" style={{ padding: '26px 22px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#161616',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <KeyRound size={18} color="#ffffff" />
          </div>
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight mb-2 text-center">
            Privacy Regulations
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed text-center">
            Strict compliance with Google Play Store, Apple App Store Guidelines, and global data privacy mandates.
          </p>
        </div>
      </div>
    </section>
  );
}
