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
	const cookies = new Cookies(req, res)
	cookies.set('access_token')

    res.status(200).json({ message: 'logout successful'})
}
