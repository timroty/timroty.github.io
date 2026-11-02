import { createElement } from "react";
import { ImageResponse } from "next/og";
import SocialImage from "@/components/social-image";
import { getPostFromSlug, getPostSummaries } from "@/lib/notion";
import { normalizePost } from "@/lib/notion-normalizers";
import {
  createSocialImageModel,
  SOCIAL_IMAGE_SIZE,
} from "@/lib/social-image";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const page = await getPostFromSlug(slug);
  const model = createSocialImageModel(normalizePost(page));

  return new ImageResponse(createElement(SocialImage, { model }), {
    ...SOCIAL_IMAGE_SIZE,
    headers: {
      "Content-Type": "image/png",
    },
  });
}
