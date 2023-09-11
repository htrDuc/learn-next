import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { Router, useRouter } from 'next/dist/client/router'
import React from 'react'

type Props = {
  post: any
}

const PostId = ({ post }: Props) => {
  if(!post) return null
	return <div>
    <h1>{post.title}</h1>
    <p>{post.description}</p>
    <p>{post.brand}</p>
    <p><span>{post.price}</span></p>
  </div>
}
export default PostId

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch('https://dummyjson.com/products')
	const data = await response.json()
	return {
		paths: data.products.map((product: any) => ({ params: { id: `${product.id}` } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
	if (!context.params?.id) {
    return {
			notFound: true,
		}
  }
	const response = await fetch(`https://dummyjson.com/products/${context.params?.id}`)
	const data = await response.json()
  console.log('Props', context.params?.id);
  
	return {
		props: {
			post: data,
		},
	}
}
