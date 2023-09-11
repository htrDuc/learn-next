import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/header'), {
	ssr: false
})

type Props = {
	posts: {
    products: any
  }
}

export default function Post({ posts }: Props) {
  const router = useRouter()
	return (
		<div>
			<Header></Header>
			<div>Post</div>
			<ul>
				{posts.products.map((post: any) => (
					<li key={post.id}>
						<span style={{marginRight: '20px'}}>{post.title}</span>
						<button
							onClick={() => {
								router.push({
									pathname: '/post/[id]',
									query: {
										id: post.id,
									},
								})
							}}
						>
							Go to post
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
	const response = await fetch('https://dummyjson.com/products')
	const data = await response.json()
	return {
		props: {
			posts: data,
		},
	}
}
