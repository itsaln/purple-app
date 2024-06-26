import { atom } from 'jotai'
import axios, { AxiosError } from 'axios'

import { authAtom } from '@/entities/auth/model/auth.state'
import { API } from '@/entities/user/api/api'

import { IUser, IUserResponse } from './user.model'

export interface IUserState {
	profile: IUser | null
	isLoading: boolean
	error: string | null
}

export const profileAtom = atom<IUserState>({
	profile: null,
	isLoading: false,
	error: null
})

export const loadProfileAtom = atom(
	async (get) => {
		return get(profileAtom)
	},
	async (get, set) => {
		const { access_token } = await get(authAtom)
		set(profileAtom, {
			isLoading: true,
			profile: null,
			error: null
		})

		try {
			const { data } = await axios.get<IUserResponse>(API.profile, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			set(profileAtom, {
				isLoading: false,
				profile: data.profile,
				error: null
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: error.response?.data.message
				})
			}
		}
	}
)
