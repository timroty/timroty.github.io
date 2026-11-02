import { ImageResponse } from "next/og";
import SocialImage from "@/components/social-image";
import { getPostFromSlug, getPostSummaries } from "@/lib/notion";
import { normalizePost } from "@/lib/notion-normalizers";
import {
  createSocialImageModel,
  SOCIAL_IMAGE_SIZE,
} from "@/lib/social-image";

interface Props {
  params: Promise<{ slug: string }>;
}

export const alt = "Article by Tim Roty";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const page = await getPostFromSlug(slug);
  const model = createSocialImageModel(normalizePost(page));

  return new ImageResponse(<SocialImage model={model} />, size);
}
