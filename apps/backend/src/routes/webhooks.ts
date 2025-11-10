import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * POST /api/webhooks/revenuecat
 * Handle RevenueCat webhook events for subscription updates
 */
router.post('/revenuecat', async (req: Request, res: Response) => {
  try {
    const event = req.body;

    console.log('RevenueCat webhook event:', event.type);

    // Verify webhook signature (implement based on RevenueCat docs)
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.REVENUECAT_WEBHOOK_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const eventType = event.type;
    const customerInfo = event.event?.customer_info;
    const productId = event.event?.product_id;

    if (!customerInfo) {
      return res.status(400).json({ error: 'Missing customer info' });
    }

    // Map RevenueCat customer ID to our user ID
    const userId = customerInfo.app_user_id;

    switch (eventType) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCELLATION':
        // Update subscription to active
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            tier: getTierFromProductId(productId),
            status: 'active',
            revenue_cat_customer_id: customerInfo.subscriber_id,
            current_period_start: new Date(customerInfo.original_purchase_date).toISOString(),
            current_period_end: new Date(customerInfo.expires_date).toISOString(),
            cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
          });
        break;

      case 'CANCELLATION':
        // Mark subscription as cancelled but keep active until period end
        await supabase
          .from('subscriptions')
          .update({
            cancel_at_period_end: true,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);
        break;

      case 'EXPIRATION':
        // Subscription expired, downgrade to free
        await supabase
          .from('subscriptions')
          .update({
            status: 'expired',
            tier: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        // Update user subscription tier
        await supabase
          .from('users')
          .update({ subscription_tier: 'free' })
          .eq('id', userId);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing RevenueCat webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * POST /api/webhooks/hasura
 * Handle Hasura event triggers if needed
 */
router.post('/hasura', async (req: Request, res: Response) => {
  try {
    const event = req.body;

    console.log('Hasura event:', event.trigger.name);

    // Verify Hasura webhook secret
    const hasuraSecret = req.headers['hasura-webhook-secret'];
    if (hasuraSecret !== process.env.HASURA_WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Handle different event types
    // This is where you can add custom business logic triggered by database changes

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing Hasura webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Helper function to map product IDs to subscription tiers
function getTierFromProductId(productId: string): 'free' | 'pro' | 'enterprise' {
  if (productId.includes('pro')) return 'pro';
  if (productId.includes('enterprise')) return 'enterprise';
  return 'free';
}

export { router as webhookRouter };
