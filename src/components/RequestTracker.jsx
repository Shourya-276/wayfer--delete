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
        <span className="badge badge-outline" style={{ marginBottom: '12px' }}>
          LIVE TRACKING SYSTEM
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
          Track Your Erasure Request
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
          Enter your unique Reference Code (e.g., <code>WAY-DEL-89241</code>) or registered account email to inspect live verification and purge status.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '10px',
        maxWidth: '560px',
        margin: '0 auto 24px auto'
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
            className="form-input"
            style={{ paddingLeft: '44px', fontFamily: 'var(--font-mono)' }}
            placeholder="WAY-DEL-89241 or email@domain.com"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
          Track Status
        </button>
      </form>

      {/* Demo sample pills */}
      <div style={{
        textAlign: 'center',
        marginBottom: '36px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }}>
        <span>Try demo reference codes: </span>
        <button
          type="button"
          onClick={() => { setSearchQuery('WAY-DEL-89241'); setResult(getRequestByRefOrEmail('WAY-DEL-89241')); setHasSearched(true); }}
          className="btn-ghost"
          style={{ textDecoration: 'underline', padding: '0 4px', fontSize: '0.78rem', cursor: 'pointer' }}
        >
          WAY-DEL-89241
        </button>
        {' • '}
        <button
          type="button"
          onClick={() => { setSearchQuery('WAY-DEL-76319'); setResult(getRequestByRefOrEmail('WAY-DEL-76319')); setHasSearched(true); }}
          className="btn-ghost"
          style={{ textDecoration: 'underline', padding: '0 4px', fontSize: '0.78rem', cursor: 'pointer' }}
        >
          WAY-DEL-76319
        </button>
        {' • '}
        <button
          type="button"
          onClick={() => { setSearchQuery('WAY-DEL-65102'); setResult(getRequestByRefOrEmail('WAY-DEL-65102')); setHasSearched(true); }}
          className="btn-ghost"
          style={{ textDecoration: 'underline', padding: '0 4px', fontSize: '0.78rem', cursor: 'pointer' }}
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
          <span style={{ fontSize: '0.88rem', color: '#ffffff' }}>{cancelSuccessMsg}</span>
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
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase'
                }}>
                  Reference ID
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#ffffff'
                }}>
                  {result.id}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'block'
                }}>
                  Current Status
                </span>
                <span className="badge badge-solid" style={{ marginTop: '4px' }}>
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
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: isCompleted ? '#ffffff' : 'var(--text-muted)'
                      }}>
                        {step.title}
                      </div>
                      <div style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-dim)',
                        marginTop: '2px'
                      }}>
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
              fontSize: '0.85rem',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Applicant Name</span>
                <strong style={{ color: '#ffffff' }}>{result.fullName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Account Email</span>
                <strong style={{ color: '#ffffff' }}>{result.email}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Registered Phone</span>
                <strong style={{ color: '#ffffff' }}>{result.phone}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Erasure Scope</span>
                <strong style={{ color: '#ffffff' }}>{result.scopeLabel}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Submission Date</span>
                <strong style={{ color: '#ffffff' }}>{new Date(result.submittedAt).toLocaleDateString()}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Grace Period Deadline</span>
                <strong style={{ color: '#ffffff' }}>{new Date(result.gracePeriodEndsAt).toLocaleDateString()}</strong>
              </div>
            </div>

            {/* Admin Audit Notes if available */}
            {result.adminNotes && (
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#0c0c0c',
                border: '1px solid var(--border-medium)',
                marginBottom: '24px',
                fontSize: '0.84rem'
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Security / Processing Log
                </span>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
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
                  <h4 style={{ fontSize: '0.9rem', color: '#ffffff', marginBottom: '2px' }}>
                    Changed your mind?
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    You can immediately revoke this deletion request before the 14-day hold period elapses.
                  </p>
                </div>
                <button
                  onClick={handleCancelRequest}
                  className="btn btn-secondary btn-sm"
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
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '6px' }}>
              No Deletion Record Found
            </h3>
            <p style={{ fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto' }}>
              We could not find an active erasure request matching <strong>"{searchQuery}"</strong>. Please check your reference code or submit a new request.
            </p>
          </div>
        )
      )}
    </div>
  );
}
