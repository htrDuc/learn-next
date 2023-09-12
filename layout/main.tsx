import { LayoutProps } from '@/models'
import Link from 'next/link'
import * as React from 'react'

export function MainLayout({ children }: LayoutProps) {
	React.useEffect(() => {
		console.log('MainLayout mounting')
		return () => console.log('MainLayout unmounting')
	}, [])
	return (
		<div>
			<header>Header Main</header>
			<main>
				<nav>
					<Link href="/post">
						<a href="">Post</a>
					</Link>
					<Link href="/about">About</Link>
				</nav>
				<h1>Main title</h1>
				<div>{children}</div>
				<footer>Footer Main</footer>
			</main>
		</div>
	)
}
