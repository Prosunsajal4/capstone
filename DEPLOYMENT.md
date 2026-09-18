# Deployment Checklist

## Pre-Deployment

- [x] All tests pass (`npm test`)
- [x] TypeScript compiles without errors (`npx tsc --noEmit`)
- [x] No `console.log` statements in production code
- [x] Environment variables documented (`.env.example`)
- [x] No secrets committed to repository
- [x] `.gitignore` covers `node_modules`, `.env*`, `.next`

## Deployment

- [x] Deployed to Vercel via CLI
- [x] Preview deployment verified before production
- [x] Custom domain configured (if applicable)
- [x] SSL/HTTPS enabled

## Post-Deployment

- [x] All routes load without errors
- [x] AI API endpoint functional
- [x] Health check endpoint returns data
- [x] Error boundaries catch and display errors
- [x] 404 page displays for unknown routes

## Monitoring

- [x] Vercel deployment logs reviewed
- [x] No build warnings or errors
- [x] Performance metrics acceptable

## Rollback Plan

1. Go to Vercel dashboard → Deployments
2. Find the last working deployment
3. Click "Promote to Production"
4. Alternatively: `git revert` and push to trigger new deployment

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key for AI auditor |
| `NEXT_PUBLIC_APP_URL` | No | Base URL for the app |

## Sign-Off

- [ ] Code reviewed
- [ ] Tests verified
- [ ] Deployment confirmed
- [ ] Documentation updated

Date: _______________
Reviewed by: _______________
