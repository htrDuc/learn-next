// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'

const proxy = httpProxy.createProxyServer()
const API_URL = process.env.API_URL
const NODE_ENV = process.env.NODE_ENV

export const config = {
	api: {
		bodyParser: false,
	},
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method not supported' })
	}
	return new Promise((resolve, reject) => {
		// don't send cookies to API server
		req.headers.cookie = ''

		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			// Read the API's response body from
			// the stream:
			let apiResponseBody = ''
			proxyRes.on('data', (chunk) => {
				apiResponseBody += chunk
			})

			// Once we've read the entire API
			// response body, we're ready to
			// handle it:
			proxyRes.on('end', () => {
				try {
					// Extract the authToken from API's response:
					const { accessToken, expiredAt } = JSON.parse(apiResponseBody)

					// Set the authToken as an HTTP-only cookie.
					// We'll also set the SameSite attribute to
					// 'lax' for some additional CSRF protection.
					const cookies = new Cookies(req, res, {
						secure: NODE_ENV !== 'development',
					})
					cookies.set('access_token', accessToken, {
						httpOnly: true,
						sameSite: 'lax',
						expires: new Date(expiredAt),
					})
					;(res as NextApiResponse).status(200).json({ message: 'login successful' })
				} catch (err) {
					;(res as NextApiResponse).status(500).json({ message: 'something went wrong' })
				}
				resolve(true)
			})
		}

		proxy.web(req, res, {
			target: API_URL,
			changeOrigin: true,
			selfHandleResponse: true,
		})

		// Don't forget to handle errors:
		proxy.once('error', reject)

		proxy.once('proxyRes', handleLoginResponse)
	})
}
