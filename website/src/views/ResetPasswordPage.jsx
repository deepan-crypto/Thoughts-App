import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Keep the token requirement for logic, but we still render the UI so it looks right for design purposes
  useEffect(() => {
    // If we wanted to block rendering without token, we'd do it here, 
    // but the user wants the webpage to look EXACTLY like the image.
    // So we just show the form anyway, and validate token on submit.
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage('Invalid or missing reset token.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
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
      background: 'linear-gradient(180deg, #1ce3d3 0%, #308fdb 100%)',
      fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        background: '#ffffff',
        padding: '40px 32px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '800',
          color: '#13151c',
          marginBottom: '32px',
          textAlign: 'center',
          letterSpacing: '-0.5px'
        }}>
          Reset Account Password
        </h1>
        
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {errorMessage && (
              <div style={{
                color: '#d93025',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {errorMessage}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#6e7278', marginBottom: '8px', fontWeight: '500' }}>
                Create New Password
              </label>
              <input
                type="text" // To match image exactly where LOISBECKET is visible, although normally password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="LOISBECKET"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e0e5eb',
                  fontSize: '15px',
                  color: '#333',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#308fdb'}
                onBlur={(e) => e.target.style.borderColor = '#e0e5eb'}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#6e7278', marginBottom: '8px', fontWeight: '500' }}>
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e0e5eb',
                  fontSize: '15px',
                  color: '#333',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#308fdb'}
                onBlur={(e) => e.target.style.borderColor = '#e0e5eb'}
              />
              
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '38px',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b0b5bd'
                }}
              >
                {/* Eye slash icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
                </svg>
              </button>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: '#539cdc',
                color: '#ffffff',
                padding: '16px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: '600',
                fontSize: '16px',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                marginTop: '12px',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a8dc7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#539cdc'}
            >
              {status === 'loading' ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
