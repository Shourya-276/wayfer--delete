import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Database, FileText, HelpCircle, Mail } from 'lucide-react';

export default function PolicyFaq() {
  const [openItem, setOpenItem] = useState(0);

  const faqs = [
    {
      q: 'What specific data will be permanently wiped?',
      a: 'Upon completion of the 14-day grace period, Wayfer permanently wipes: your user profile (name, avatar, phone, email, bio), GPS tracking coordinates and route telemetry, saved addresses (Home, Work, Favorites), payment tokens, device identifiers, and in-app messaging history.'
    },
    {
      q: 'Why is there a mandatory 14-day hold period?',
      a: 'The 14-day grace period prevents accidental or fraudulent account deletion and allows users to restore access if their account was compromised. During these 14 days, your account remains deactivated and inaccessible to other users.'
    },
    {
      q: 'What data must Wayfer retain by law?',
      a: 'In accordance with statutory financial, corporate tax, and transportation regulatory laws, Wayfer may retain sanitized copies of completed trip receipts, payment transaction hashes, and VAT/tax records for up to 7 years. These records are isolated from active databases and stripped of marketing identifiers.'
    },
    {
      q: 'What if I registered through Apple ID, Google, or phone OTP?',
      a: 'Regardless of your authentication provider, our system identifies your account by your registered email and phone number. Deleting your account will sever all linked third-party Single Sign-On (SSO) tokens with Wayfer.'
    },
    {
      q: 'Can I cancel my deletion request after submitting?',
      a: 'Yes. You can cancel your deletion request at any time during the 14-day grace period directly through this portal using the "Track Request" feature or by contacting privacy@wayfer.com.'
    },
    {
      q: 'How does this comply with Apple App Store and Google Play Store policies?',
      a: 'This portal directly fulfills the requirement specified in Section 5.1.1(v) of Apple’s App Store Review Guidelines and Google Play’s Account Deletion Policy, ensuring that all mobile app users have clear, accessible web-based account deletion mechanisms.'
    }
  ];

  return (
    <div style={{
      maxWidth: '920px',
      margin: '20px auto 60px auto',
      padding: '0 24px'
    }}>
      {/* Policy Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div className="card" style={{ padding: '24px' }}>
          <Database size={24} color="#ffffff" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px' }}>
            Data Purge Standards
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            All telematics, active sessions, and profile records are sanitized across distributed clusters using cryptographic shredding.
          </p>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <ShieldCheck size={24} color="#ffffff" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px' }}>
            GDPR & CCPA Rights
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Fully satisfies the Right to Erasure (Article 17 GDPR) and the California Consumer Privacy Act (CCPA) erasure requirements.
          </p>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <FileText size={24} color="#ffffff" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px' }}>
            Audit Log Certification
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            A permanent pseudonymized deletion certificate is recorded in compliance ledger files for verification purposes.
          </p>
        </div>
      </div>

      {/* Accordion FAQs */}
      <div className="card" style={{ padding: '32px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-medium)',
          paddingBottom: '16px'
        }}>
          <HelpCircle size={22} color="#ffffff" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openItem === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isOpen ? '#141414' : '#0a0a0a',
                  overflow: 'hidden',
                  transition: 'background-color 0.2s'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.96rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 20px 18px 20px',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: '4px',
                    paddingTop: '14px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact DPO box */}
        <div style={{
          marginTop: '32px',
          padding: '20px',
          backgroundColor: '#050505',
          border: '1px dashed var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#ffffff', marginBottom: '2px' }}>
              Direct Data Protection Officer Inquiry
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Have specific regulatory or compliance queries? Contact our privacy team.
            </p>
          </div>
          <a
            href="mailto:privacy@wayfer.com"
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Mail size={14} /> privacy@wayfer.com
          </a>
        </div>
      </div>
    </div>
  );
}
