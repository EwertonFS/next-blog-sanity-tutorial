// src/sanity/client.ts

import ImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "5qzr5jzu",
  dataset: "production",
  apiVersion: "2024-12-01",
  useCdn: false,
});

// agora para poder receber a imagem

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
