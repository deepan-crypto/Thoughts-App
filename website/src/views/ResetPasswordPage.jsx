import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (newPassword.length < 6) {
      setStatus('error');
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to reset password. The link might be expired.');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1f2d 100%)',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        position: 'relative',
        marginBottom: '28px'
      }}>
        <div style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(69,191,208,0.25) 0%, transparent 70%)',
          filter: 'blur(12px)'
        }} />
        <img
          src="/ican.png"
          alt="Thoughts Logo"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(69,191,208,0.3)',
            position: 'relative',
            zIndex: 1
          }}
        />
      </div>

      <div style={{
        background: '#ffffff',
        padding: '32px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Reset Password
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Create a new password for your Thoughts account.
        </p>

        {status === 'success' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: '#e6f4ea',
              color: '#1e8e3e',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontWeight: '500'
            }}>
              Password reset successfully!
            </div>
            <p style={{ fontSize: '15px', color: '#666' }}>
              You can now close this window and log in to the Thoughts app with your new password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {status === 'error' && (
              <div style={{
                background: '#fce8e6',
                color: '#d93025',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {errorMessage}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={status === 'loading' || !token}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#45BFD0'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={status === 'loading' || !token}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#45BFD0'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !token}
              style={{
                background: 'linear-gradient(135deg, #07F2DF, #45BFD0)',
                color: '#0a0f1a',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '700',
                fontSize: '16px',
                cursor: (status === 'loading' || !token) ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                opacity: (status === 'loading' || !token) ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(7,242,223,0.2)',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => { if (status !== 'loading' && token) e.currentTarget.style.transform = 'scale(0.98)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
            Prefer to reset in the app?
          </p>
          <a
            href={`intent://thoughts.co.in/reset-password?token=${token}#Intent;scheme=https;package=com.deepangokul.thoughts;S.browser_fallback_url=${encodeURIComponent('https://play.google.com/store/apps/details?id=com.deepangokul.thoughts')};end`}
            style={{
              color: '#45BFD0',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Open Thoughts App
          </a>
        </div>
      </div>

      <p style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.4)',
        marginTop: '32px'
      }}>
        thoughts.co.in
      </p>
    </div>
  );
};

export default ResetPasswordPage;
