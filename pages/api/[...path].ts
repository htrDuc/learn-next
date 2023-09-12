// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

const proxy = httpProxy.createProxyServer()

const API_URL = process.env.API_URL

export const config = {
	api: {
		bodyParser: false,
	},
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise((resolve, reject) => {
    console.log('path 4')
    // convert cookies to header Authorization
    const cookies = new Cookies(req,res)
    const accessToken = cookies.get('access_token')

    if(accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`
    }

		// don't send cookies to API server
		req.headers.cookie = ''

		proxy.web(req, res, {
			target: API_URL,
			changeOrigin: true,
			selfHandleResponse: false,
		})

    // Don't forget to handle errors:
		proxy.once('error', reject)

    proxy.once('proxyRes', resolve)
	})
}
