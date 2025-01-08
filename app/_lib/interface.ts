export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: unknown;
}

import { TypedObject } from "@portabletext/types";

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: TypedObject[]; // Aqui é importante
  titleImage: string;
}