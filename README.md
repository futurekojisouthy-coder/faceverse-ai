# FaceVerse AI — Prototype v0.1

A mobile-responsive React/Vite frontend for an AI avatar studio.

## What works in this prototype
- Responsive dashboard and navigation
- Four selectable illustrative avatar concepts
- Browser camera preview with permission handling
- Microphone permission check
- Clear status messages describing what is and is not connected

## What is not implemented yet
- No AI face animation or real-time avatar transformation engine
- No virtual-camera output to WhatsApp, Meet, or other call applications
- No user authentication or database connection
- No subscription/payment processing

The camera preview deliberately displays the original camera feed; it does not claim to transform it.

## Run locally
Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

Camera and microphone permissions generally require HTTPS or localhost.

## Suggested next milestones
1. Add authentication and saved avatar preferences.
2. Select and integrate a licensed/consent-based real-time avatar animation model.
3. Add a backend service for secure model execution and usage limits.
4. Build a Windows virtual-camera integration.
5. Investigate Android-specific support for each target calling app.

## Safety and privacy
Use original or properly licensed avatar assets, obtain consent for any likeness used, disclose AI-generated avatars where appropriate, and do not use the product to impersonate people or mislead callers.
