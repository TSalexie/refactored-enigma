'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { SignupForm } from '@/components/auth/signup-form';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

type AuthView = 'login' | 'signup' | 'forgot-password';

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="w-full max-w-md">
        {view === 'login' && (
          <LoginForm
            onSwitchToSignup={() => setView('signup')}
            onSwitchToForgotPassword={() => setView('forgot-password')}
          />
        )}
        {view === 'signup' && (
          <SignupForm onSwitchToLogin={() => setView('login')} />
        )}
        {view === 'forgot-password' && (
          <ForgotPasswordForm onBack={() => setView('login')} />
        )}
      </div>
    </div>
  );
}
