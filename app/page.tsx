import Image from "next/image";
import Navbar from "./_components/Navbar";
import { Card, CardContent } from "./_components/ui/card";
import { simpleBlogCard } from "./_lib/interface";
import { client, urlFor } from "./_lib/sanity";
import { Button } from "./_components/ui/button";
import Link from "next/link";

const getData = async () => {
  const query = `
*[_type == 'blog'] | order(_createdAt desc) {
  title,
  smallDescription,
  'currentSlug': slug.current,
  titleImage
}
  `;

  const data = await client.fetch(query);
  // console.log(data);
  return data;
};

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  // console.log(data);

  return (
    <div className="mx-auto px-4 max-w-2xl py-5">
      <header>
        <Navbar />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
        {data.map((post, idx) => (
          <Card key={idx}>
            <Image
              src={urlFor(post.titleImage).url()}
              width={500}
              height={500}
              alt="posts-images"
              className="rounded-t-lg h-[200] object-cover"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
