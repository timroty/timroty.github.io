import assert from "node:assert/strict";
import test from "node:test";
import { createPostMetadata } from "./post-metadata.ts";

test("creates absolute article metadata for a published post", () => {
  const metadata = createPostMetadata(
    {
      id: "post-id",
      title: "A useful article",
      publishDate: "2026-10-04",
      slug: "a useful/article",
    },
    "a useful/article",
  );

  assert.deepEqual(metadata, {
    title: "A useful article | Tim Roty",
    description: "Writing from Tim Roty, a Senior Software Engineer at Hudl.",
    alternates: {
      canonical:
        "https://timroty.github.io/posts/a%20useful%2Farticle",
    },
    openGraph: {
      type: "article",
      title: "A useful article | Tim Roty",
      description:
        "Writing from Tim Roty, a Senior Software Engineer at Hudl.",
      url: "https://timroty.github.io/posts/a%20useful%2Farticle",
      siteName: "Tim Roty",
      publishedTime: "2026-10-04",
    },
    twitter: {
      card: "summary_large_image",
      title: "A useful article | Tim Roty",
      description:
        "Writing from Tim Roty, a Senior Software Engineer at Hudl.",
    },
  });
});

test("omits published time when the post has no publish date", () => {
  const metadata = createPostMetadata(
    {
      id: "post-id",
      title: "Undated article",
      publishDate: null,
      slug: "undated-article",
    },
    "undated-article",
  );

  assert.deepEqual(metadata.openGraph, {
    type: "article",
    title: "Undated article | Tim Roty",
    description: "Writing from Tim Roty, a Senior Software Engineer at Hudl.",
    url: "https://timroty.github.io/posts/undated-article",
    siteName: "Tim Roty",
  });
});

test("returns safe non-indexed metadata when post normalization fails", () => {
  assert.deepEqual(createPostMetadata(null, "missing-post"), {
    title: "Writing | Tim Roty",
    description: "Writing from Tim Roty, a Senior Software Engineer at Hudl.",
    robots: {
      index: false,
      follow: false,
    },
  });
});
