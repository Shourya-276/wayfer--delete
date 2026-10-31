import React, { useState } from 'react';
import { addRequest } from '../utils/storage';
import { CheckCircle2, AlertTriangle, Copy, Check, ShieldAlert, Trash2, X, AlertOctagon } from 'lucide-react';

export default function DeletionForm({ onSubmissionSuccess, onNavigateToTrack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    scope: 'all',
    reason: '',
    agreeTerms: false,
    agreeGracePeriod: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name as registered on Wayfer.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.agreeTerms || !formData.agreeGracePeriod) {
      setErrorMessage('Please confirm both acknowledgements to proceed with deletion.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const created = addRequest({
        fullName: formData.fullName,
        email: formData.email,
        scope: formData.scope,
        reason: formData.reason.trim() || 'Requested by account holder'
      });

      setIsSubmitting(false);
      setSubmittedRequest(created);
      if (onSubmissionSuccess) onSubmissionSuccess(created);
    }, 700);
  };

  const handleCopyCode = () => {
    if (!submittedRequest) return;
    navigator.clipboard.writeText(submittedRequest.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClosePopup = () => {
    setSubmittedRequest(null);
    setFormData({
      fullName: '',
      email: '',
      scope: 'all',
      reason: '',
      agreeTerms: false,
      agreeGracePeriod: false
    });
  };

  return (
    <>
      {/* Account Deletion Scheduled Confirmation Pop-up Modal */}
      {submittedRequest && (
        <div className="modal-overlay">
          <div className="card modal-content animate-fade-in">
            <button
              onClick={handleClosePopup}
              className="btn btn-ghost btn-sm"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px',
                color: 'var(--text-muted)'
              }}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.35)'
            }}>
              <Trash2 size={32} />
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white backdrop-blur-md font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-3.5">
              DELETION SCHEDULED
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight mb-3">
              Your Account Will Be Deleted
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-5">
              Your deletion request for <strong className="text-white font-semibold underline">{submittedRequest.email}</strong> has been officially confirmed and queued.
            </p>

            <div style={{
              backgroundColor: '#121212',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
              textAlign: 'left',
              marginBottom: '22px'
            }}>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-white mb-1.5">
                Important notice:
              </div>
              <ul className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed pl-4 space-y-1">
                <li>Your profile and login access are deactivated immediately.</li>
                <li>All trip histories, saved locations, and personal telemetry will be permanently wiped.</li>
                <li>Your account is in a <strong className="text-white font-semibold">14-day hold period</strong> until <strong className="text-white font-semibold">{new Date(submittedRequest.gracePeriodEndsAt).toLocaleDateString()}</strong> before irreversible erasure.</li>
              </ul>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#050505',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 16px',
              marginBottom: '24px'
            }}>
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider">
                Audit Reference:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                  {submittedRequest.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="btn-ghost"
                  style={{ padding: '2px 4px', cursor: 'pointer' }}
                  title="Copy reference code"
                >
                  {copied ? <Check size={14} color="#ffffff" /> : <Copy size={14} color="var(--text-muted)" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleClosePopup}
              className="btn btn-primary btn-lg text-xs sm:text-sm font-black uppercase tracking-wider"
              style={{ width: '100%' }}
            >
              Understood, Close
            </button>
          </div>
        </div>
      )}

    <div id="deletion-form" className="card form-card" style={{ scrollMarginTop: '100px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-medium)',
        paddingBottom: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
            Request Account & Data Deletion
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Complete the form below to initiate account removal. All requests are processed securely.
          </p>
        </div>
      </div>

      {errorMessage && (
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
          <AlertTriangle size={18} color="#ffffff" />
          <span className="text-sm font-medium text-white">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Section 1: Identity Information */}
        <div style={{ marginBottom: '28px' }}>
          <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-white mb-4">
            1. Account Verification Details
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px'
          }}>
            <div className="form-group">
              <label className="form-label font-mono text-[11px] uppercase tracking-wider font-bold text-neutral-400" htmlFor="fullName">
                Full Legal Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input text-sm text-white"
                placeholder="e.g. Alex Vance"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label font-mono text-[11px] uppercase tracking-wider font-bold text-neutral-400" htmlFor="email">
                Registered Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input text-sm text-white"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500 mt-1 block">
                Must match the email linked to your Wayfer app account.
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Reason */}
        <div style={{ marginBottom: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-white mb-4">
            2. Reason for Leaving
          </h3>

          <div className="form-group">
            <label className="form-label font-mono text-[11px] uppercase tracking-wider font-bold text-neutral-400" htmlFor="reason">
              Reason for Account Deletion
            </label>
            <textarea
              id="reason"
              name="reason"
              className="form-textarea text-sm text-white"
              rows={3}
              placeholder="Please tell us your reason for leaving Wayfer..."
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Section 3: Acknowledgements */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '28px'
        }}>
          <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-white mb-3.5 flex items-center gap-2">
            <ShieldAlert size={16} /> Legal Acknowledgements & Consent
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="form-checkbox"
                required
              />
              <span className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                I understand that deleting my account permanently removes all ride receipts, rewards, saved addresses, and cannot be reversed after completion.
              </span>
            </label>

            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="agreeGracePeriod"
                checked={formData.agreeGracePeriod}
                onChange={handleChange}
                className="form-checkbox"
                required
              />
              <span className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                I acknowledge the mandatory <strong className="text-white font-semibold">14-day hold period</strong>, during which I can cancel this request at any time using my reference code.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', alignItems: 'center' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg text-xs sm:text-sm font-black uppercase tracking-wider"
            style={{ width: '100%', maxWidth: '320px' }}
          >
            {isSubmitting ? 'Processing Submission...' : 'Submit Deletion Request'}
          </button>
        </div>
      </form>
    </div>
  </>
  );
}
