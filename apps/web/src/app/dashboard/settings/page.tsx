'use client';

import { useState } from 'react';
import { User, CreditCard, Bell, Shield, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PricingCard } from '@/components/subscription/pricing-card';
import { useAuth } from '@/hooks/useAuth';

type SettingsTab = 'profile' | 'subscription' | 'notifications' | 'appearance';

const PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 projects',
      'Up to 50 tasks',
      'Up to 20 pages',
      'Basic task management',
      'Basic page editor',
      'Community support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'month',
    description: 'For individuals who need more',
    features: [
      'Unlimited projects',
      'Unlimited tasks',
      'Unlimited pages',
      'Advanced task management',
      'Rich text editor with all features',
      'AI Reverse Calendar (10 plans/month)',
      'Custom databases',
      'Priority support',
      'Export to PDF',
    ],
    popular: true,
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Enterprise',
    price: '$29',
    period: 'month',
    description: 'For teams and power users',
    features: [
      'Everything in Pro',
      'Unlimited AI Reverse Calendar',
      'Team collaboration',
      'Advanced permissions',
      'Custom integrations',
      'Dedicated support',
      'Custom onboarding',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user } = useAuth();
  const [name, setName] = useState(user?.email?.split('@')[0] || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubscriptionSelect = (tier: string) => {
    // In real app, this would open RevenueCat paywall or redirect to payment
    alert(`Upgrading to ${tier}... (RevenueCat integration pending)`);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed after registration
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>You are currently on the Free plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-semibold">Free Plan</p>
                      <p className="text-sm text-muted-foreground">
                        Limited projects, tasks, and pages
                      </p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
                <div className="grid grid-cols-3 gap-6">
                  {PRICING_TIERS.map((tier) => (
                    <PricingCard
                      key={tier.name}
                      tier={tier}
                      currentTier="free"
                      onSelect={handleSubscriptionSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your tasks and pages
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Task Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming due dates
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Summary</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your progress
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border rounded-lg hover:bg-secondary transition-colors">
                      <div className="w-full h-20 bg-white border rounded mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button className="p-4 border-2 border-primary rounded-lg hover:bg-secondary transition-colors">
                      <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button className="p-4 border rounded-lg hover:bg-secondary transition-colors">
                      <div className="w-full h-20 bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
                      <p className="text-sm font-medium">Auto</p>
                    </button>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
