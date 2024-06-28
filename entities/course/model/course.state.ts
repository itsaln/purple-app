import { atom } from 'jotai'
import axios, { AxiosError } from 'axios'

import { authAtom } from '@/entities/auth/model/auth.state'

import { API } from '../api/api'
import { ICourseResponse, StudentCourseDescription } from './course.model'

export interface ICourseState {
	courses: StudentCourseDescription[]
	isLoading: boolean
	error: string | null
}

export const courseAtom = atom<ICourseState>({
	courses: [],
	isLoading: false,
	error: null
})

export const loadCourseAtom = atom(
	async (get) => {
		return get(courseAtom)
	},
	async (get, set) => {
		try {
			const { access_token } = await get(authAtom)

			set(courseAtom, {
				isLoading: true,
				courses: [],
				error: null
			})

			const { data } = await axios.get<ICourseResponse>(API.my, {
				// params: {
				// 	studentCourse: 'my'
				// },
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})

			set(courseAtom, {
				isLoading: false,
				courses: data.my,
				error: null
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				set(courseAtom, {
					isLoading: false,
					courses: [],
					error: error.response?.data.message
				})
			}
		}
	}
)
