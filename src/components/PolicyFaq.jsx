import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle, Mail } from 'lucide-react';

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
      <div style={{ marginBottom: '28px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <ShieldCheck size={24} color="#ffffff" style={{ marginBottom: '14px' }} />
          <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight mb-2">
            GDPR & CCPA Rights
          </h3>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Fully satisfies the Right to Erasure (<strong className="text-white font-semibold">Article 17 GDPR</strong>) and the California Consumer Privacy Act (<strong className="text-white font-semibold">CCPA</strong>) erasure requirements.
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
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
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
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="text-sm sm:text-base font-bold text-white tracking-tight"
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
                  <div
                    className="text-sm text-neutral-300 font-normal leading-relaxed border-t border-[var(--border-subtle)]"
                    style={{
                      padding: '14px 20px 18px 20px'
                    }}
                  >
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
            <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white mb-1">
              Direct Data Protection Officer Inquiry
            </h4>
            <p className="font-mono text-[10px] sm:text-[11px] text-neutral-400">
              Have specific regulatory or compliance queries? Contact our privacy team.
            </p>
          </div>
          <a
            href="mailto:privacy@wayfer.com"
            className="btn btn-secondary btn-sm text-xs sm:text-sm font-black uppercase tracking-wider"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Mail size={14} /> privacy@wayfer.com
          </a>
        </div>
      </div>
    </div>
  );
}
