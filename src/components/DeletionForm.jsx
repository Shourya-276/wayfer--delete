import React, { useState } from 'react';
import { addRequest } from '../utils/storage';
import { CheckCircle2, AlertTriangle, Copy, Check, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function DeletionForm({ onSubmissionSuccess, onNavigateToTrack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userId: '',
    scope: 'all',
    reasonCategory: 'No longer using the service',
    reasonDetails: '',
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
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide your registered phone number.');
      return;
    }
    if (!formData.agreeTerms || !formData.agreeGracePeriod) {
      setErrorMessage('Please confirm both acknowledgements to proceed with deletion.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const combinedReason = formData.reasonDetails.trim() 
        ? `${formData.reasonCategory}: ${formData.reasonDetails.trim()}`
        : formData.reasonCategory;

      const created = addRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        userId: formData.userId,
        scope: formData.scope,
        reason: combinedReason
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

  if (submittedRequest) {
    return (
      <div className="card animate-fade-in" style={{
        maxWidth: '720px',
        margin: '20px auto 60px auto',
        padding: '36px 32px',
        textAlign: 'center',
        border: '1px solid #ffffff',
        boxShadow: 'var(--shadow-glow)'
      }}>
        <div style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <CheckCircle2 size={32} />
        </div>

        <span className="badge badge-solid" style={{ marginBottom: '14px' }}>
          REQUEST LOGGED SUCCESSFULLY
        </span>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', fontWeight: '800' }}>
          Deletion Request Queued
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 24px auto' }}>
          Your request has been officially logged in the Wayfer Data Erasure queue. A verification link has been recorded for <strong style={{ color: '#ffffff' }}>{submittedRequest.email}</strong>.
        </p>

        {/* Reference Box */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          maxWidth: '440px',
          margin: '0 auto 28px auto',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '6px'
          }}>
            Your Audit Reference Code
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              color: '#ffffff'
            }}>
              {submittedRequest.id}
            </span>
            <button
              onClick={handleCopyCode}
              className="btn btn-secondary btn-sm"
              title="Copy to clipboard"
              style={{ padding: '6px 10px' }}
            >
              {copied ? <Check size={14} color="#ffffff" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          textAlign: 'left',
          backgroundColor: '#121212',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '28px',
          fontSize: '0.85rem',
          border: '1px solid var(--border-medium)'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Full Name</span>
            <strong style={{ color: '#ffffff' }}>{submittedRequest.fullName}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Scope</span>
            <strong style={{ color: '#ffffff' }}>{submittedRequest.scopeLabel}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Status</span>
            <span className="badge badge-outline" style={{ fontSize: '0.7rem' }}>{submittedRequest.status}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>14-Day Hold Until</span>
            <strong style={{ color: '#ffffff' }}>{new Date(submittedRequest.gracePeriodEndsAt).toLocaleDateString()}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigateToTrack(submittedRequest.id)}
            className="btn btn-primary"
          >
            Track Status Now <ArrowRight size={16} />
          </button>
          <button
            onClick={() => {
              setSubmittedRequest(null);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                userId: '',
                scope: 'all',
                reasonCategory: 'No longer using the service',
                reasonDetails: '',
                agreeTerms: false,
                agreeGracePeriod: false
              });
            }}
            className="btn btn-secondary"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{
      maxWidth: '780px',
      margin: '20px auto 60px auto',
      padding: '36px 32px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-medium)',
        paddingBottom: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '4px' }}>
            Request Account & Data Deletion
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Complete the form below to initiate account removal. All requests are processed securely.
          </p>
        </div>
        <span className="badge badge-outline">
          SECURE 256-BIT SSL
        </span>
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
          <span style={{ fontSize: '0.88rem', color: '#ffffff' }}>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Section 1: Identity Information */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            1. Account Verification Details
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px'
          }}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Legal Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Vance"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Registered Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
                Must match the email linked to your Wayfer app account.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number Linked to Account *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="userId">Wayfer Account / User ID (Optional)</label>
              <input
                id="userId"
                name="userId"
                type="text"
                className="form-input"
                placeholder="e.g. WF-US-8924 (Found in app settings)"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Deletion Scope */}
        <div style={{ marginBottom: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h3 style={{
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            2. Scope of Erasure
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: formData.scope === 'all' ? '1px solid #ffffff' : '1px solid var(--border-medium)',
              backgroundColor: formData.scope === 'all' ? '#181818' : '#0c0c0c',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <input
                type="radio"
                name="scope"
                value="all"
                checked={formData.scope === 'all'}
                onChange={handleChange}
                style={{ marginTop: '3px', accentColor: '#ffffff' }}
              />
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>
                  Complete Account & All Data Erasure (Recommended for full exit)
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Permanently revokes app login, deletes personal profile, vehicle/rider credentials, saved payment cards, and trip history.
                </p>
              </div>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: formData.scope === 'location' ? '1px solid #ffffff' : '1px solid var(--border-medium)',
              backgroundColor: formData.scope === 'location' ? '#181818' : '#0c0c0c',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <input
                type="radio"
                name="scope"
                value="location"
                checked={formData.scope === 'location'}
                onChange={handleChange}
                style={{ marginTop: '3px', accentColor: '#ffffff' }}
              />
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>
                  Location Telemetry & Route History Only
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Keeps your account active but purges all recorded GPS trajectories, route histories, and favorite pinned locations.
                </p>
              </div>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: formData.scope === 'marketing' ? '1px solid #ffffff' : '1px solid var(--border-medium)',
              backgroundColor: formData.scope === 'marketing' ? '#181818' : '#0c0c0c',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <input
                type="radio"
                name="scope"
                value="marketing"
                checked={formData.scope === 'marketing'}
                onChange={handleChange}
                style={{ marginTop: '3px', accentColor: '#ffffff' }}
              />
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>
                  Marketing & Analytics Data Only
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Revokes marketing communication consent and purges third-party analytic identifiers while keeping your service functional.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Reason */}
        <div style={{ marginBottom: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h3 style={{
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            3. Reason for Leaving
          </h3>

          <div className="form-group">
            <label className="form-label" htmlFor="reasonCategory">Primary Reason</label>
            <select
              id="reasonCategory"
              name="reasonCategory"
              className="form-select"
              value={formData.reasonCategory}
              onChange={handleChange}
            >
              <option value="No longer using the service">No longer using Wayfer</option>
              <option value="Privacy and location tracking concerns">Privacy & GPS tracking concerns</option>
              <option value="Switching to another platform">Switching to an alternative platform</option>
              <option value="Too many notifications or emails">Too many notifications/marketing</option>
              <option value="Created duplicate account">Duplicate account cleanup</option>
              <option value="Dissatisfied with application experience">Dissatisfied with app experience</option>
              <option value="Other reason">Other reason</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reasonDetails">Additional Feedback (Optional)</label>
            <textarea
              id="reasonDetails"
              name="reasonDetails"
              className="form-textarea"
              rows={3}
              placeholder="Tell us what we could have done better or specific concerns..."
              value={formData.reasonDetails}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Section 4: Acknowledgements */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '28px'
        }}>
          <h3 style={{
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
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
              <span>
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
              <span>
                I acknowledge the mandatory <strong>14-day hold period</strong>, during which I can cancel this request at any time using my reference code.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', alignItems: 'center' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', maxWidth: '320px' }}
          >
            {isSubmitting ? 'Processing Submission...' : 'Submit Deletion Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
