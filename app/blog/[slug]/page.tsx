// Importa componentes e utilitários necessários
import Navbar from "@/app/_components/Navbar";
import { fullBlog } from "@/app/_lib/interface";
import { client, urlFor } from "@/app/_lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}'] {
    'currentSlug': slug.current,
    title,
    content,
    titleImage
  }[0]`; // Query no Sanity para obter o conteúdo do blog com base no slug

  const data = await client.fetch(query);
  return data;
}

// Função para gerar parâmetros estáticos para as rotas dinâmicas (Next.js)
export async function generateStaticParams() {
  const query = `*[_type == 'blog'] { 'slug': slug.current }`; // Busca todos os slugs dos blogs
  const slugs = await client.fetch<{ slug: string }[]>(query); // Obtém a lista de slugs

  return slugs.map((slug) => ({
    params: { slug: slug.slug }, // Retorna os parâmetros estáticos para cada slug
  }));
}

// Componente do artigo do blog, que recebe os parâmetros da rota
const BlogArticle = async ({ params }: { params: { slug: string } }) => {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8 mx-auto px-4 max-w-2xl py-5">
      <h1>
        <Navbar />
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase mt-8">
          Ewerton Francis-Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-semibold tracking-tighter sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()} // Gera a URL da imagem do título
        width={800}
        height={400}
        alt="title-image"
        priority
        className="rounded-lg mt-8"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} /> {/* Conteúdo do artigo */}
      </div>
    </div>
  );
};

export default BlogArticle;
