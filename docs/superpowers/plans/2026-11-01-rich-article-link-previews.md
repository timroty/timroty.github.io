# Rich Article Link Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every published article a rich iMessage and social preview with article metadata and a branded title card.

**Architecture:** Keep the site fully statically exported. Build metadata from normalized Notion post data and render Open Graph/Twitter images with `next/og` during `next build`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Node.js test runner, Notion API

**Spec:** Approved conversation design from 2026-11-01; no separate tracked design document exists because the design was completed in Plan mode.

## Global Constraints

- Production URL is `https://timroty.github.io`.
- Description is `Writing from Tim Roty, a Senior Software Engineer at Hudl.`.
- Preview images are 1200×630 PNG files generated only for published posts.
- Preserve the current Notion schema, GitHub Pages static export, and dependency set.
- Use the existing cream, dark-ink, and muted-green visual palette.

## Review Focus

- Missing or malformed posts must return safe non-indexed metadata rather than throw.
- Canonical and social URLs must be absolute and use the encoded article slug.
- Missing publish dates must be omitted from metadata and the image.
- Very long titles must be truncated predictably without overflowing the card.
- Both Open Graph and Twitter image conventions must resolve in static export mode.

---

### Task 1: Article metadata

**Files:**
- Create: `src/lib/post-metadata.ts`
- Create: `src/lib/post-metadata.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/posts/[slug]/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `createPostMetadata(post: PostSummary | null, slug: string): Metadata`
- Produces: shared `SITE_URL`, `SITE_NAME`, and `SITE_DESCRIPTION` constants.

- [ ] Add failing tests for valid post metadata, missing publish dates, and the missing-post fallback.
- [ ] Run the tests and confirm they fail because the module does not exist.
- [ ] Implement the metadata builder, root metadata base, and article `generateMetadata`.
- [ ] Run the metadata tests, complete test suite, and lint.

### Task 2: Generated social cards

**Files:**
- Create: `src/lib/social-image.ts`
- Create: `src/lib/social-image.test.ts`
- Create: `src/components/social-image.tsx`
- Create: `src/app/posts/[slug]/opengraph-image.tsx`
- Create: `src/app/posts/[slug]/twitter-image.tsx`

**Interfaces:**
- Produces: `createSocialImageModel(post: PostSummary | null): SocialImageModel`.
- Produces: `SOCIAL_IMAGE_SIZE`, shared by both metadata image routes.

- [ ] Add failing tests for short, long, over-120-character, and missing-date titles.
- [ ] Run the tests and confirm they fail because the module does not exist.
- [ ] Implement the social-card model, JSX renderer, and Open Graph/Twitter routes.
- [ ] Run tests, lint, type checking, and a production build when Notion credentials are available.
