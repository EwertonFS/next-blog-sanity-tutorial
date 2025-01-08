export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: unknown;
}

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: any; // Ajuste o tipo conforme necessário
  titleImage: any; // Ajuste o tipo conforme necessário
}
