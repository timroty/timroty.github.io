# Compact Homepage Design

## Goal

Make the refactored site feel simpler and denser while preserving its warm editorial styling.

## Header

- Keep only the `Tim Roty` site title in the brand area.
- Remove the `Software Engineer · Chicago` subtitle.
- Remove the About navigation item.
- Reduce vertical header padding to match the tighter page rhythm.

## Homepage

- Replace the introductory kicker and oversized headline with one normal-sized sentence: `Software engineer currently living in Chicago.`
- Remove the About section entirely.
- Keep featured work, writing, favorites, and contact in their current order.

## About Removal

- Delete the standalone `/about` route.
- Delete the shared About content component once it has no remaining consumers.

## Spacing

- Use a compact shared section rhythm of 32px on small screens and 40px on larger screens.
- Tighten local gaps between headings, lists, rows, and footer content so they match the shared rhythm.
- Preserve enough separation and borders to keep each section distinct.

## Verification

- Confirm there are no remaining About links or imports.
- Run automated tests, linting, and a production build.
