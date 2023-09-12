import { AppPropsWithLayout } from '@/models'
import '../styles/globals.css'
import { EmptyLayout } from '@/layout'
import { SWRConfig } from 'swr'
import axiosClient from '@/api-client/axios-client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout

	return (
		<SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	)
}
export default MyApp
