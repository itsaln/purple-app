import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { API } from '../api/api'
import { IAuthResponse, ILoginRequest } from './auth.interface'

const storage = createJSONStorage<IAuthState>(() => AsyncStorage)

const INITIAL_STATE = {
	access_token: null,
	isLoading: false,
	error: null
}

export const authAtom = atomWithStorage<IAuthState>(
	'auth',
	INITIAL_STATE,
	storage
)

export const logoutAtom = atom(null, (_get, set) => {
	set(authAtom, INITIAL_STATE)
})

export const loginAtom = atom(
	(get) => get(authAtom),
	async (_get, set, { email, password }: ILoginRequest) => {
		set(authAtom, {
			isLoading: true,
			access_token: null,
			error: null
		})

		try {
			await new Promise<void>(resolve => setTimeout(() => resolve(), 2000))
			const { data } = await axios.post<IAuthResponse>(API.login, {
				email,
				password
			})

			set(authAtom, {
				isLoading: false,
				access_token: data.access_token,
				error: null
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					access_token: null,
					error: error.response?.data.message
				})
			}
		}
	}
)

export interface IAuthState {
	access_token: string | null
	isLoading: boolean
	error: string | null
}
