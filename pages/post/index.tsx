import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import dynamic from 'next/dynamic'
import { AdminLayout, MainLayout } from '@/layout'
import { NextPageWithLayout } from '@/models'

const Header = dynamic(() => import('@/components/header'), {
	ssr: false,
})

type Props = {
	posts: any[]
}

const Post: NextPageWithLayout<Props> = ({ posts }: Props) => {
	const router = useRouter()
	return (
		<>
			<Header></Header>
			<div>Post</div>
			<ul>
				{posts.map((post: any) => (
					<li key={post.id}>
						<span style={{ marginRight: '20px' }}>{post.title}</span>
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
		</>
	)
}

Post.Layout = MainLayout

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
	const response = await fetch('https://dummyjson.com/products')
	const data = await response.json()
	return {
		props: {
			posts: data.products.slice(0, 10),
		},
	}
}

export default Post