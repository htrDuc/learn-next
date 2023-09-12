import { LoginPayload } from '@/models/index'
import axiosClient from './axios-client'

export const authApi = {
	login(payload: LoginPayload) {
        console.log('2')
		return axiosClient.post('/login', payload)
	},

	logout() {
		return axiosClient.post('/logout')
	},

	getProfile() {
		return axiosClient.get('/profile')
	},
}