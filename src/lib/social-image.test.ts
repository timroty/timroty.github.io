import assert from "node:assert/strict";
import test from "node:test";
import { createSocialImageModel } from "./social-image.ts";

test("uses large type and formats the date for a short title", () => {
  assert.deepEqual(
    createSocialImageModel({
      id: "post-id",
      title: "A concise title",
      publishDate: "2026-10-04",
      slug: "a-concise-title",
    }),
    {
      title: "A concise title",
      fontSize: 72,
      publishDate: "October 4, 2026",
    },
  );
});

test("reduces type size for a title longer than 42 characters", () => {
  const model = createSocialImageModel({
    id: "post-id",
    title: "A title that is deliberately longer than forty-two characters",
    publishDate: "2026-10-04",
    slug: "long-title",
  });

  assert.equal(model.fontSize, 60);
});

test("truncates titles over 120 characters and uses the smallest type", () => {
  const model = createSocialImageModel({
    id: "post-id",
    title: "x".repeat(121),
    publishDate: "2026-10-04",
    slug: "very-long-title",
  });

  assert.equal(model.title, `${"x".repeat(119)}…`);
  assert.equal(model.title.length, 120);
  assert.equal(model.fontSize, 48);
});

test("omits the date when a post is undated", () => {
  const model = createSocialImageModel({
    id: "post-id",
    title: "Undated article",
    publishDate: null,
    slug: "undated-article",
  });

  assert.equal(model.publishDate, null);
});

test("returns a safe card model when post normalization fails", () => {
  assert.deepEqual(createSocialImageModel(null), {
    title: "Writing by Tim Roty",
    fontSize: 72,
    publishDate: null,
  });
});
