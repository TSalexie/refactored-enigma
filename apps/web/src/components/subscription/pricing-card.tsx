'use client';

import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

interface PricingCardProps {
  tier: PricingTier;
  currentTier?: string;
  onSelect: (tier: string) => void;
}

export function PricingCard({ tier, currentTier, onSelect }: PricingCardProps) {
  const isCurrent = currentTier === tier.name.toLowerCase();

  return (
    <Card className={tier.popular ? 'border-primary shadow-lg' : ''}>
      {tier.popular && (
        <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-2 rounded-t-lg">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-2xl">{tier.name}</CardTitle>
          {tier.popular && <Sparkles className="w-5 h-5 text-primary" />}
        </div>
        <CardDescription>{tier.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{tier.price}</span>
          <span className="text-muted-foreground">/{tier.period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={tier.popular ? 'default' : 'outline'}
          disabled={isCurrent}
          onClick={() => onSelect(tier.name.toLowerCase())}
        >
          {isCurrent ? 'Current Plan' : tier.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
