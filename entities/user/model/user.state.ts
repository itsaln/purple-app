import { IUser } from './user.model'
import { atom } from 'jotai'

export const profileAtom = atom<IUserState>({
	profile: {
		id: 1,
		name: 'Aladdin'
	},
	isLoading: false,
	error: null
})

export interface IUserState {
	profile: IUser | null
	isLoading: boolean
	error: string | null
}
