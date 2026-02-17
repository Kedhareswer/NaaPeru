import { useEffect } from "react";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  jsonLd?: JsonLd;
};

const SITE_URL = "https://kedhar.vercel.app";
const DEFAULT_IMAGE = "/og-image.png";

const upsertMetaByName = (name: string, content: string) => {
  let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let tag = document.head.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let tag = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const upsertJsonLd = (jsonLd?: JsonLd) => {
  const existing = document.head.querySelector("#seo-json-ld");
  if (existing) {
    existing.remove();
  }

  if (!jsonLd) {
    return;
  }

  const script = document.createElement("script");
  script.id = "seo-json-ld";
  script.type = "application/ld+json";
  script.text = JSON.stringify(jsonLd);
  document.head.appendChild(script);
};

export const Seo = ({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  imageAlt = title,
  noindex = false,
  jsonLd,
}: SeoProps) => {
  useEffect(() => {
    const absoluteUrl = new URL(path, SITE_URL).toString();
    const absoluteImage = new URL(image, SITE_URL).toString();

    document.title = title;
    upsertMetaByName("description", description);
    upsertMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:type", type);
    upsertMetaByProperty("og:url", absoluteUrl);
    upsertMetaByProperty("og:image", absoluteImage);
    upsertMetaByProperty("og:image:alt", imageAlt);
    upsertMetaByProperty("og:site_name", "Kedhar Portfolio");

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", absoluteImage);
    upsertMetaByName("twitter:image:alt", imageAlt);

    upsertCanonical(absoluteUrl);
    upsertJsonLd(jsonLd);
  }, [description, image, imageAlt, jsonLd, noindex, path, title, type]);

  return null;
};
