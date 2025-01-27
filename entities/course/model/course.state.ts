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
	async (get, set, select: 'my' | 'other') => {
		try {
			const { accessToken } = await get(authAtom)

			set(courseAtom, {
				isLoading: true,
				courses: [],
				error: null
			})

			const { data } = await axios.get<ICourseResponse>(API.course, {
				// params: {
				// 	studentCourse: 'my'
				// },
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})

			set(courseAtom, {
				isLoading: false,
				courses: select === 'my' ? data.my : data.other,
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
