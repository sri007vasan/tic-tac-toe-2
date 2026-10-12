# Tic Tac Toe

A simple, responsive, and accessible Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript. The game persists state in `localStorage` so you can resume where you left off.

## Features

- Responsive layout that works on mobile and desktop
- Accessible controls with proper ARIA labels and keyboard focus
- Persistent game state via `localStorage`
- Clear win/draw detection and reset functionality

## Run locally

```bash
npx http-server .
```

## Run tests

```bash
npm install
npx playwright install chromium
npm test
```

The tests are written with Playwright and cover gameplay, win/draw detection, reset, and console error checks.
