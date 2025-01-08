import Navbar from "@/app/_components/Navbar";
import { fullBlog } from "@/app/_lib/interface";
import { client, urlFor } from "@/app/_lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}'] {
  'currentSlug':slug.current,
  title,
  content,
  titleImage
}[0]
`;

  const data = await client.fetch(query);
  return data;
}

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
  const data: fullBlog = await getData(params.slug);
  console.log(data);

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
        src={urlFor(data.titleImage).url()}
        width={800}
        height={400}
        alt="title-iamge"
        priority
        className="rounded-lg mt-8 "
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />
      </div>
    </div>
  );
};

export default BlogArticle;
