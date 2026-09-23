import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import brandLogo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const resp = await api.forgotPassword({ email });
      if (resp?.token) setToken(resp.token);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[26rem] rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(16,32,48,0.08)]">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-block">
            <img src={brandLogo} alt="Shopzen" className="mx-auto mb-4 h-9 w-auto object-contain" />
          </Link>
          <p className="section-kicker mb-2">Account</p>
          <h1 className="font-display text-[1.75rem] font-medium tracking-[-0.03em] text-ink">
            {isSubmitted ? 'Check your email' : 'Forgot password'}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            {isSubmitted
              ? `We sent a reset link to ${email}`
              : 'Enter your email and we will send a reset link'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center">
            {token && (
              <p className="mb-4 break-all text-xs text-muted">
                Temporary token (for testing): <span className="font-mono text-ink">{token}</span>
              </p>
            )}
            <Link to="/signin" className="btn-primary w-full">
              Back to sign in
            </Link>
            <p className="mt-4 text-sm text-muted">
              Did not receive it?{' '}
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-gold hover:text-ink"
              >
                Try again
              </button>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-ink/10"
                placeholder="name@example.com"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
            <p className="pt-2 text-center text-sm text-muted">
              Remember your password?{' '}
              <Link to="/signin" className="font-medium text-gold hover:text-ink hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
