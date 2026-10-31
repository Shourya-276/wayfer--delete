import React, { useState, useEffect } from 'react';
import { getRequestByRefOrEmail, cancelRequestByUser } from '../utils/storage';
import { Search, CheckCircle, Clock, AlertCircle, XCircle, ArrowRight, ShieldCheck, Undo2 } from 'lucide-react';

export default function RequestTracker({ initialCode = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  useEffect(() => {
    if (initialCode) {
      setSearchQuery(initialCode);
      const found = getRequestByRefOrEmail(initialCode);
      setResult(found);
      setHasSearched(true);
    }
  }, [initialCode]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = getRequestByRefOrEmail(searchQuery);
    setResult(found);
    setHasSearched(true);
    setCancelSuccessMsg('');
  };

  const handleCancelRequest = () => {
    if (!result) return;
    const confirmCancel = window.confirm('Are you sure you want to cancel this deletion request and keep your Wayfer account active?');
    if (confirmCancel) {
      cancelRequestByUser(result.id);
      const updated = getRequestByRefOrEmail(result.id);
      setResult(updated);
      setCancelSuccessMsg('Your deletion request has been successfully cancelled. Your account remains active.');
    }
  };

  // Helper to determine stage index (0 to 3)
  const getStageIndex = (status) => {
    switch (status) {
      case 'Pending Verification':
        return 1;
      case 'In Review':
        return 1;
      case 'In Grace Period':
        return 2;
      case 'Completed':
        return 3;
      case 'Cancelled by User':
        return -1;
      case 'Rejected':
        return -2;
      default:
        return 0;
    }
  };

  return (
    <div className="card" style={{
      maxWidth: '820px',
      margin: '20px auto 60px auto',
      padding: '36px 32px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white backdrop-blur-md font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            LIVE TRACKING SYSTEM
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight mb-2">
          Track Your Erasure Request
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-lg mx-auto">
          Enter your unique Reference Code (e.g., <code className="font-mono text-white text-xs bg-white/10 px-1.5 py-0.5 rounded">WAY-DEL-89241</code>) or registered account email to inspect live verification and purge status.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '10px',
        maxWidth: '560px',
        margin: '0 auto 20px auto'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="var(--text-muted)" style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            type="text"
            className="form-input font-mono text-sm text-white"
            style={{ paddingLeft: '44px' }}
            placeholder="WAY-DEL-89241 or email@domain.com"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary text-xs sm:text-sm font-black uppercase tracking-wider" style={{ flexShrink: 0 }}>
          Track Status
        </button>
      </form>

      {/* Demo sample pills */}
      <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 text-center mb-8">
        <span>Try demo reference codes: </span>
        <button
          type="button"
          onClick={() => { setSearchQuery('WAY-DEL-89241'); setResult(getRequestByRefOrEmail('WAY-DEL-89241')); setHasSearched(true); }}
          className="btn-ghost text-white underline cursor-pointer px-1 font-mono"
        >
          WAY-DEL-89241
        </button>
        {' • '}
        <button
          type="button"
          onClick={() => { setSearchQuery('WAY-DEL-76319'); setResult(getRequestByRefOrEmail('WAY-DEL-76319')); setHasSearched(true); }}
          className="btn-ghost text-white underline cursor-pointer px-1 font-mono"
        >
          WAY-DEL-76319
        </button>
        {' • '}
        <button
          type="button"
          onClick={() => { setSearchQuery('WAY-DEL-65102'); setResult(getRequestByRefOrEmail('WAY-DEL-65102')); setHasSearched(true); }}
          className="btn-ghost text-white underline cursor-pointer px-1 font-mono"
        >
          WAY-DEL-65102
        </button>
      </div>

      {cancelSuccessMsg && (
        <div style={{
          backgroundColor: '#161616',
          border: '1px solid #ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle size={18} color="#ffffff" />
          <span className="text-sm font-medium text-white">{cancelSuccessMsg}</span>
        </div>
      )}

      {/* Results Section */}
      {hasSearched && (
        result ? (
          <div className="animate-fade-in" style={{
            borderTop: '1px solid var(--border-medium)',
            paddingTop: '28px'
          }}>
            {/* Top Info Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                  Reference ID
                </span>
                <h3 className="font-mono text-xl sm:text-2xl font-black text-white tracking-wider">
                  {result.id}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                  Current Status
                </span>
                <span className="badge badge-solid font-mono text-xs uppercase tracking-wider font-bold">
                  {result.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 20px',
              marginBottom: '28px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                position: 'relative'
              }}>
                {[
                  { title: '1. Submitted', desc: 'Request logged' },
                  { title: '2. Identity Review', desc: 'Ownership check' },
                  { title: '3. 14-Day Hold', desc: 'Cancellation window' },
                  { title: '4. Purged', desc: 'Permanent scrub' }
                ].map((step, idx) => {
                  const stageIdx = getStageIndex(result.status);
                  const isCompleted = stageIdx >= idx;
                  const isCurrent = stageIdx === idx;

                  return (
                    <div key={idx} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        margin: '0 auto 8px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isCompleted ? '#ffffff' : '#141414',
                        color: isCompleted ? '#000000' : 'var(--text-muted)',
                        border: isCurrent ? '2px solid #ffffff' : '1px solid var(--border-medium)',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        boxShadow: isCurrent ? '0 0 12px rgba(255,255,255,0.3)' : 'none'
                      }}>
                        {isCompleted && idx < stageIdx ? '✓' : idx + 1}
                      </div>
                      <div className="font-mono text-xs font-bold tracking-wider" style={{ color: isCompleted ? '#ffffff' : 'var(--text-muted)' }}>
                        {step.title}
                      </div>
                      <div className="font-mono text-[10px] text-neutral-400 mt-0.5">
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Metadata Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              backgroundColor: '#121212',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              marginBottom: '24px'
            }}>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">Applicant Name</span>
                <strong className="text-white font-semibold text-sm">{result.fullName}</strong>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">Account Email</span>
                <strong className="text-white font-semibold text-sm">{result.email}</strong>
              </div>
              {result.phone && result.phone !== 'Not specified' && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">Registered Phone</span>
                  <strong className="text-white font-semibold text-sm">{result.phone}</strong>
                </div>
              )}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">Erasure Scope</span>
                <strong className="text-white font-semibold text-sm">{result.scopeLabel}</strong>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">Submission Date</span>
                <strong className="text-white font-semibold text-sm">{new Date(result.submittedAt).toLocaleDateString()}</strong>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">Grace Period Deadline</span>
                <strong className="text-white font-semibold text-sm">{new Date(result.gracePeriodEndsAt).toLocaleDateString()}</strong>
              </div>
            </div>

            {/* Admin Audit Notes if available */}
            {result.adminNotes && (
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#0c0c0c',
                border: '1px solid var(--border-medium)',
                marginBottom: '24px'
              }}>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                  Security / Processing Log
                </span>
                <p className="font-mono text-xs text-neutral-300 font-normal leading-relaxed m-0">
                  {result.adminNotes}
                </p>
              </div>
            )}

            {/* Cancel Action if applicable */}
            {['Pending Verification', 'In Review', 'In Grace Period'].includes(result.status) && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '20px'
              }}>
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight text-white mb-0.5">
                    Changed your mind?
                  </h4>
                  <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                    You can immediately revoke this deletion request before the 14-day hold period elapses.
                  </p>
                </div>
                <button
                  onClick={handleCancelRequest}
                  className="btn btn-secondary btn-sm text-xs sm:text-sm font-black uppercase tracking-wider"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Undo2 size={14} /> Cancel Deletion Request
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '36px 20px',
            borderTop: '1px solid var(--border-medium)',
            color: 'var(--text-muted)'
          }}>
            <AlertCircle size={32} color="#ffffff" style={{ margin: '0 auto 12px auto' }} />
            <h3 className="text-lg font-extrabold tracking-tight text-white mb-1.5">
              No Deletion Record Found
            </h3>
            <p className="text-sm text-neutral-300 font-normal leading-relaxed max-w-sm mx-auto">
              We could not find an active erasure request matching <strong className="text-white font-semibold">"{searchQuery}"</strong>. Please check your reference code or submit a new request.
            </p>
          </div>
        )
      )}
    </div>
  );
}
