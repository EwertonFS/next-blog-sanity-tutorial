# Instalação

## Passo 1 Insatalação Nextjs

Após instalação do Nextjs

[link](https://www.sanity.io/learn/course/day-one-with-sanity-studio/prerequisites)

`npm create sanity@latest -- --template clean --create-project "Day one with Sanity" --dataset production --typescript --output-path day-one-with-sanity`

-utilize na raiz do projeto

## Passo 2

ciar arquivo e e criar schema no sanity aqui sera estrutura do blog

obs: `option source é oara criar generate do shecma`

## Passo 3

importar arquivo criado :

`import blog from './blog'
export const schemaTypes = [blog]`

## Passo 4 se Conectar com Sanity

- cd sanity => `npm run dev`

## Passo 5

- Criar artigos

## Passo 6 - Ir a Pagina de Vision no Sanity

- Criar query e testar a query no sanity

`*[_type == 'blog'] | order(_createdAt desc) {
  title,
  smallDescription,
  'currentSlug': slug.current,
  titleImage
}
  `

## Passo 7 - Antes de fazer Fetch adcionar no nextjs na pasta lib

`npm i sanity`

criar arquivo sanity.ts

npm instalar @sanity/client

- Para query sem imagem o codgo abaixo server

`import { createClient } from "next-sanity";

export const client = createClient({
projectId: "5qzr5jzu",
dataset: "production",
apiVersion: "2024-12-01",
useCdn: false,
}); `

## Passo 8

Fazer a chamada da api

## Paao 9 Quando precisar chamar as imagens na api instalar

Image
`npm i @sanity/image-url`
ou
`npm install --save @sanity/image-url`

inserir essa instalação no client

import { createClient } from "next-sanity";

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

obs: Nexts Confing

## Passo 10 - Criar Rota dinamica se nessário for

const query = `*[_type == 'blog' && slug.current == '${slug}'] {
    'currentSlug': slug.current,
    title,
    content,
    titleImage
  }[0]`;

}zero foi utilizado para receber objeto ao inves de um array

Obs: apos concluir todo conteudo utilizar

rederização da imagem ` <Image src={urlFor(data.titleImage).url()}/>`

## Passo 11 Para renderizar o conteudo Conteudo

instale : npm i @portabletext/react

instale também : npm install -D @tailwindcss/typography

adcione no tailwind config : require("@tailwindcss/typography")

ex:

`  <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
     </div>`

### Para Deploy

- Crie arquivo com o nome .vercelIgnore com o nome => sanity

- Adcionar o revalidate
