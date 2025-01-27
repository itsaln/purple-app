import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { API } from '../api/api'
import { IAuthResponse, ILoginRequest } from './auth.interface'

export interface IAuthState {
	accessToken: string | null
	isLoading: boolean
	error: string | null
}

const storage = createJSONStorage<IAuthState>(() => AsyncStorage)

const INITIAL_STATE = {
	accessToken: null,
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
			accessToken: null,
			error: null
		})

		try {
			const { data } = await axios.post<IAuthResponse>(API.login, {
				email,
				password
			})

			set(authAtom, {
				isLoading: false,
				accessToken: data.accessToken,
				error: null
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					accessToken: null,
					error: error.response?.data.message
				})
			}
		}
	}
)
