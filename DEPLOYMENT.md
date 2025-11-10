# Deployment Guide

This guide walks you through deploying the Productivity App to production.

## Prerequisites

- [ ] Supabase account and project created
- [ ] Railway account
- [ ] RevenueCat account and configured products
- [ ] Claude API key from Anthropic
- [ ] Vercel account (for web deployment)
- [ ] Apple Developer account (for iOS)
- [ ] Google Play Developer account (for Android)

## 1. Database Setup (Supabase)

### Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note your project URL and API keys
3. Run the database migration:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `database/migrations/001_initial_schema.sql`
   - Execute the SQL
4. Verify all tables are created with RLS enabled

### Configure Authentication

1. In Supabase dashboard, go to Authentication > Providers
2. Enable Email authentication
3. Configure OAuth providers (Google, Apple) if desired
4. Set up email templates

## 2. Hasura Setup (Railway)

### Deploy Hasura

1. Go to [Railway](https://railway.app)
2. Create new project
3. Add service: "Hasura GraphQL Engine"
4. Connect to your Supabase PostgreSQL database
5. Set environment variables:
   ```
   HASURA_GRAPHQL_DATABASE_URL=postgresql://...
   HASURA_GRAPHQL_ADMIN_SECRET=your-admin-secret
   HASURA_GRAPHQL_JWT_SECRET={"type":"HS256","key":"your-supabase-jwt-secret"}
   HASURA_GRAPHQL_ENABLE_CONSOLE=true
   HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous
   ```

### Configure Hasura

1. Open Hasura console
2. Track all tables from your database
3. Configure permissions for each table:
   - `user` role has access based on RLS policies
   - `anonymous` role has limited/no access
4. Set up GraphQL relationships between tables

## 3. Backend Deployment (Railway)

### Deploy Backend API

1. In Railway, add a new service from GitHub
2. Select your repository
3. Choose `apps/backend` as the root directory
4. Set environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-web-domain.com
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   CLAUDE_API_KEY=your-claude-api-key
   REVENUECAT_WEBHOOK_SECRET=your-revenuecat-webhook-secret
   HASURA_GRAPHQL_ENDPOINT=your-hasura-endpoint
   HASURA_ADMIN_SECRET=your-hasura-admin-secret
   HASURA_WEBHOOK_SECRET=your-hasura-webhook-secret
   ```
5. Deploy and note the generated URL

## 4. RevenueCat Setup

### Configure Products

1. Go to [RevenueCat](https://www.revenuecat.com/)
2. Create a new project
3. Add products for iOS and Android:
   - `pro_monthly` - Pro Monthly Subscription
   - `pro_yearly` - Pro Yearly Subscription
   - `enterprise_monthly` - Enterprise Monthly Subscription
4. Configure entitlements

### Set Up Webhooks

1. In RevenueCat dashboard, go to Integrations > Webhooks
2. Add webhook URL: `https://your-backend-url.railway.app/api/webhooks/revenuecat`
3. Set authorization: `Bearer your-webhook-secret`
4. Enable all subscription events

## 5. Web Deployment (Vercel)

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to web app: `cd apps/web`
3. Deploy: `vercel --prod`
4. Set environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_HASURA_ENDPOINT=your-hasura-endpoint
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
5. Configure custom domain if desired

## 6. Mobile Deployment

### Prerequisites

1. Install EAS CLI: `npm i -g eas-cli`
2. Login: `eas login`
3. Configure `apps/mobile/eas.json`:
   ```json
   {
     "build": {
       "production": {
         "env": {
           "EXPO_PUBLIC_SUPABASE_URL": "your-supabase-url",
           "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-supabase-anon-key",
           "EXPO_PUBLIC_HASURA_ENDPOINT": "your-hasura-endpoint",
           "EXPO_PUBLIC_API_URL": "https://your-backend-url.railway.app",
           "EXPO_PUBLIC_REVENUECAT_API_KEY": "your-revenuecat-key"
         }
       }
     }
   }
   ```

### iOS Deployment

1. Configure signing in `app.json`
2. Build: `eas build --platform ios --profile production`
3. Submit to App Store: `eas submit --platform ios`
4. Configure App Store listing
5. Submit for review

### Android Deployment

1. Configure signing credentials
2. Build: `eas build --platform android --profile production`
3. Submit to Play Store: `eas submit --platform android`
4. Configure Play Store listing
5. Submit for review

## 7. Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Verify task creation and updates
- [ ] Test real-time synchronization
- [ ] Check reverse calendar AI feature
- [ ] Test subscription purchase flow
- [ ] Verify webhook events from RevenueCat
- [ ] Test on multiple devices
- [ ] Set up monitoring and error tracking (Sentry)
- [ ] Configure analytics (PostHog, Mixpanel)
- [ ] Set up backup strategy for database
- [ ] Create admin dashboard access
- [ ] Document API endpoints
- [ ] Set up CI/CD pipeline

## 8. Monitoring & Maintenance

### Set Up Monitoring

1. **Sentry** for error tracking
2. **Railway metrics** for backend performance
3. **Vercel Analytics** for web performance
4. **Supabase dashboard** for database metrics
5. **RevenueCat dashboard** for subscription metrics

### Regular Maintenance

- Monitor error logs daily
- Review subscription metrics weekly
- Check database performance monthly
- Update dependencies quarterly
- Review and optimize costs monthly

## 9. Scaling Considerations

### Database
- Enable connection pooling in Supabase
- Add read replicas for heavy read operations
- Implement caching with Redis

### Backend
- Scale Railway instances based on traffic
- Implement rate limiting per user
- Add CDN for static assets

### Real-time
- Monitor WebSocket connections
- Implement connection pooling
- Add fallback to polling if needed

## Troubleshooting

### Database Connection Issues
- Check Supabase connection limits
- Verify connection string format
- Check RLS policies

### Authentication Issues
- Verify JWT secret configuration
- Check token expiration settings
- Verify CORS settings

### Subscription Issues
- Check RevenueCat webhook logs
- Verify product IDs match
- Check subscription status in database

## Support

For deployment support:
- Email: devops@yourapp.com
- Discord: [Your Discord Server]
- Documentation: https://docs.yourapp.com
