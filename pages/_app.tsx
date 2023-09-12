import { AppPropsWithLayout } from '@/models'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EmptyLayout } from '@/layout'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  console.log('App re-render')
	const Layout = Component.Layout ?? EmptyLayout
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
export default MyApp
