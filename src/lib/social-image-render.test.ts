import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement, type ComponentType } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";
import ts from "typescript";
import {
  createSocialImageModel,
  SOCIAL_IMAGE_SIZE,
  type SocialImageModel,
} from "./social-image.ts";

function loadSocialImage(): ComponentType<{ model: SocialImageModel }> {
  const filename = new URL("../components/social-image.tsx", import.meta.url);
  const source = readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    fileName: filename.pathname,
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const loadedModule: { exports: { default?: ComponentType<{ model: SocialImageModel }> } } = {
    exports: {},
  };
  const require = createRequire(import.meta.url);

  new Function("require", "module", "exports", output)(
    require,
    loadedModule,
    loadedModule.exports,
  );

  assert.ok(loadedModule.exports.default);
  return loadedModule.exports.default;
}

test("keeps a long unbroken title inside the card's right margin", async () => {
  const SocialImage = loadSocialImage();
  const model = createSocialImageModel({
    id: "post-id",
    title: "W".repeat(121),
    publishDate: "2026-10-04",
    slug: "wide-title",
  });
  const response = new ImageResponse(
    createElement(SocialImage, { model }),
    SOCIAL_IMAGE_SIZE,
  );
  const png = Buffer.from(await response.arrayBuffer());
  const { data, info } = await sharp(png)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let darkPixelsInRightMargin = 0;

  for (let y = 130; y < 470; y += 1) {
    for (let x = 1120; x < SOCIAL_IMAGE_SIZE.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      if (
        data[offset] < 100 &&
        data[offset + 1] < 100 &&
        data[offset + 2] < 100
      ) {
        darkPixelsInRightMargin += 1;
      }
    }
  }

  assert.equal(darkPixelsInRightMargin, 0);
});
